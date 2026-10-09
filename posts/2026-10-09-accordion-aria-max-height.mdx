---
title: "아코디언 height:auto 트랜지션 우회와 접근성"
date: "2025-07-24"
desc: "height:auto에 CSS transition이 적용되지 않는 문제를 max-height 트랜지션으로 우회하고, aria-expanded·aria-controls·role=region으로 스크린리더 접근성을 확보한 FAQ 아코디언 구현 기록."
tags: ["CSS", "접근성"]
---

withTime FAQ 섹션을 구현하면서 아코디언 애니메이션에서 예상치 못한 문제를 만났습니다. 닫힌 상태(`height: 0`)에서 열린 상태(`height: auto`)로 전환할 때 transition이 작동하지 않았습니다. 즉시 열려버립니다.

## height:auto에 transition이 안 되는 이유

CSS transition은 시작값과 끝값이 모두 계산 가능한 숫자값이어야 합니다. `height: auto`는 렌더링 시점에 콘텐츠 높이를 계산하는 값이라, 브라우저가 transition 시작 전에 끝값을 미리 알 수 없습니다. 중간 프레임을 보간할 수 없어 즉시 전환됩니다.

```css
/* 동작하지 않음 */
.content {
  height: 0;
  overflow: hidden;
  transition: height 0.3s;
}
.content.open {
  height: auto; /* 브라우저가 끝값을 미리 계산할 수 없음 */
}
```

## max-height 트랜지션으로 우회

`max-height`은 숫자값이므로 transition이 동작합니다. 닫힌 상태는 `max-height: 0`, 열린 상태는 콘텐츠가 충분히 들어갈 만한 큰 값(예: `999px`)으로 설정합니다. 실제 콘텐츠 높이가 300px이면 300px까지만 확장됩니다.

```tsx
// FAQItem.tsx
function FAQItem({ question, answer }: IFAQItem) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {question}
        <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
      </button>

      <div
        id={contentId}
        role="region"
        style={{
          maxHeight: isOpen ? "999px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div style={{ padding: "16px" }}>{answer}</div>
      </div>
    </div>
  );
}
```

## aria 속성의 역할

접근성 속성을 추가하지 않으면 스크린리더 사용자는 버튼이 무엇을 제어하는지, 콘텐츠가 열려있는지 닫혀있는지 알 수 없습니다.

| 속성 | 역할 |
|------|------|
| `aria-expanded={isOpen}` | 버튼이 연결된 콘텐츠의 열림/닫힘 상태 전달 ("펼쳐짐"/"접혀짐") |
| `aria-controls={contentId}` | 버튼이 어떤 요소를 제어하는지 ID로 연결 |
| `role="region"` | 콘텐츠 영역이 의미 있는 구역임을 명시 |
| `aria-hidden="true"` | 장식용 아이콘(▲▼)을 스크린리더에서 숨김 |

`useId()`는 컴포넌트 인스턴스마다 고유한 ID를 생성합니다. FAQ 항목이 여러 개일 때 `aria-controls`가 올바른 콘텐츠를 가리키려면 각 항목이 서로 다른 ID를 가져야 합니다.

## max-height 방법의 단점

`max-height: 999px`으로 설정하면 닫힐 때 transition이 0~999px 구간 전체를 duration으로 나눕니다. 실제 콘텐츠가 200px이면 200~0px 구간(전체의 20%)만 사용자가 보게 됩니다. 빠르게 닫히는 것처럼 느껴집니다. `max-height`를 콘텐츠 실제 높이에 가깝게 설정할수록 자연스럽습니다.

더 자연스러운 대안은 CSS Grid를 사용하는 방법입니다.

```css
/* grid-template-rows 방법 */
.content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s;
}
.content.open {
  grid-template-rows: 1fr;
}
.content > div {
  overflow: hidden;
}
```

`0fr → 1fr`은 "사용 가능한 공간의 0% → 100%"이므로 브라우저가 실제 높이를 기준으로 transition을 계산합니다. 콘텐츠 높이와 무관하게 일정한 속도로 열리고 닫힙니다. 다만 이 방법은 Chrome 107+부터 지원되어 구형 브라우저 지원이 필요하다면 확인이 필요합니다.
