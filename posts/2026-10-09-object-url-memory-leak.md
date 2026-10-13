---
title: "Object URL 메모리 누수와 useRef 클로저 함정"
date: "2025-11-26"
desc: "이미지 업로드 미리보기에서 URL.createObjectURL이 생성한 Blob URL을 해제하지 않아 메모리가 누적되는 문제를, 단일 이미지는 useEffect cleanup으로, 배열 이미지는 useRef로 최신값을 유지하며 일괄 revoke했다."
tags: ["성능최적화", "메모리 누수"]
---

Roome의 레퍼런스 업로드 페이지에서 이미지 미리보기를 구현할 때 [`URL.createObjectURL()`](https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL_static)을 사용했습니다. 파일 선택 → 미리보기 → 다른 파일로 교체를 반복하면서 메모리가 계속 증가하는 것을 Chrome DevTools Memory 탭에서 확인했습니다.

## Object URL을 revoke하지 않으면 GC가 회수하지 못한다

`URL.createObjectURL(file)`은 브라우저 메모리에 Blob 객체를 참조하는 URL을 생성합니다. 이 URL을 [`URL.revokeObjectURL()`](https://developer.mozilla.org/ko/docs/Web/API/URL/revokeObjectURL_static)로 명시적으로 해제하지 않으면 브라우저는 URL이 아직 유효하다고 인식해 GC가 회수하지 못합니다.

이미지를 교체할 때마다 새 URL이 생성되는데, 이전 URL을 revoke하지 않으면 사용하지 않는 Blob이 메모리에 계속 쌓입니다. 레퍼런스 업로드 페이지는 메인 이미지 1개 + 연관 제품 이미지 배열(N개)을 다루므로 누수 규모가 더 컸습니다.

## 단일 이미지 — useEffect cleanup

단일 이미지는 `useEffect`의 cleanup 함수가 자연스럽게 revoke 타이밍을 처리합니다. `mainImage`가 변경될 때마다 이전 effect의 cleanup이 실행됩니다.

```ts
useEffect(() => {
  if (!mainImage) { setMainImageUrl(undefined); return; }

  const url = URL.createObjectURL(mainImage);
  setMainImageUrl(url);

  // cleanup: mainImage가 바뀌거나 언마운트 시 이전 URL revoke
  return () => URL.revokeObjectURL(url);
}, [mainImage]);
```

`mainImage`가 새 파일로 바뀌면 이전 effect의 cleanup이 먼저 실행되어 이전 URL이 revoke됩니다. 그 다음 새 effect가 실행되어 새 URL을 생성합니다. 언마운트 시에도 cleanup이 실행됩니다.

## 배열 이미지 — useRef로 클로저 함정 우회

배열 이미지는 단순하게 처리하면 함정이 있습니다. cleanup 함수는 deps 배열 기준 시점의 값을 클로저로 캡처합니다.

```ts
// ❌ 작동하지 않는 방식
useEffect(() => {
  return () => {
    products.forEach((p) => URL.revokeObjectURL(p.imageUrl));
  };
}, []); // deps 비움 → 초기 빈 배열이 클로저에 고정
// → 언마운트 시 항상 빈 배열 순회 → revoke 없음
```

deps에 `products`를 추가하면 제품이 추가될 때마다 cleanup이 실행되어 살아있는 URL까지 revoke됩니다.

`useRef`는 렌더와 무관하게 항상 최신값을 참조합니다. 매 렌더마다 `productsRef.current = products`로 동기화하면, 클로저가 ref 객체를 캡처하므로 실행 시점에 최신 products를 읽어 정상 revoke됩니다.

```ts
const productsRef = useRef<RegisteredProduct[]>([]);
productsRef.current = products; // 매 렌더마다 최신값으로 동기화

useEffect(() => {
  return () => {
    // 언마운트 시 모든 제품 이미지 일괄 revoke
    productsRef.current.forEach((p) => {
      if (p.imageUrl) URL.revokeObjectURL(p.imageUrl);
    });
  };
}, []); // deps 비움: 언마운트 시 1회만 실행
```

| | `useState products` (deps 전달) | `useRef productsRef.current` |
|---|---|---|
| cleanup에서 읽는 값 | deps 설정 시점 스냅샷 | 실행 시점 최신값 |
| deps `[]`일 때 | 초기 빈 배열 고정 | 최신 products |

## 트레이드오프

배열 이미지를 개별 교체할 때 이전 URL을 즉시 revoke하지 않고 언마운트 시 일괄 처리합니다. 이미지가 매우 많은 경우 교체마다 즉시 revoke하는 방식이 더 효율적이지만, Roome의 레퍼런스 업로드 이미지 수는 제한되어 있어 일괄 처리로 충분했습니다.

`productsRef.current = products` 동기화 라인을 모르는 팀원이 제거하면 이전과 같은 클로저 함정이 재현됩니다. 패턴의 이유를 팀 내에서 공유하는 것이 중요합니다.

## 정리

`URL.createObjectURL`을 쓸 때는 항상 revoke 타이밍을 고려해야 합니다. 단일 값은 `useEffect` cleanup이 자연스럽게 처리하고, 배열처럼 deps 처리가 복잡해지는 경우에는 `useRef`로 최신값을 유지하고 언마운트 시 일괄 revoke하는 패턴이 안전합니다.
