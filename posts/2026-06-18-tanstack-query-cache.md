---
title: "queryKey 하나로 캐시 이해하기"
date: "2026-06-18"
desc: "invalidate 호출 후 화면이 바뀌지 않는 버그를 queryKey 오타에서 찾고, 키를 상수로 중앙 관리하는 구조로 리팩토링한 과정을 정리했다."
tags: ["TanStack Query"]
---

WhereYouAd 프로젝트에서 워크스페이스 이름을 수정한 뒤 `invalidateQueries`를 호출했는데, 화면의 데이터가 바뀌지 않는 문제가 생겼습니다. B2B 대시보드에서 서버 데이터가 즉시 반영되지 않으면 사용자가 수정 결과를 확인할 방법이 없어집니다. 에러도 없고, 콘솔에도 아무것도 찍히지 않았습니다.

## 문제: 에러 없이 조용히 동작하지 않는 invalidate

```ts
// useQuery
useQuery({ queryKey: ["overview", "metrics", 1], ... });

// invalidate (오타!)
queryClient.invalidateQueries({ queryKey: ["overview", "metric", 1] });
//                                                    ↑ "metrics" → "metric"
// 에러도 안 나고, 캐시가 조용히 무효화되지 않는다
```

TypeScript는 `"metrics"`와 `"metric"`의 차이를 잡아주지 못합니다. TanStack Query의 `queryKey` 타입이 `unknown[]`이기 때문입니다. 어떤 문자열이든 배열에 담을 수 있으므로 `"metric"`도 유효한 값으로 통과합니다. `useQuery`와 `invalidateQueries`가 같은 키를 가리켜야 한다는 제약은 타입 수준에 없습니다.

실제로 이 프로젝트에는 `"my-workspaces"` 하나가 4개 파일에, `"campaigns"`가 2개 파일에 문자열로 흩어져 있었습니다.

## 원인: queryKey 한 글자가 다르면 다른 캐시다

TanStack Query는 `queryKey`를 기준으로 캐시를 저장하고 조회합니다. 키가 같으면 같은 캐시이고, 한 글자라도 다르면 전혀 다른 캐시입니다.

```ts
["overview", "metrics", 1]  // 워크스페이스 1번의 지표 캐시
["overview", "metrics", 2]  // 워크스페이스 2번의 지표 캐시
```

`useQuery`와 `invalidateQueries`는 이 이름표를 통해 같은 캐시를 가리킵니다.

```text
useQuery          → 데이터를 가져와 캐시에 넣음
invalidateQueries → 캐시를 만료시켜 useQuery를 다시 실행시킴
queryKey          → 둘이 같은 캐시를 가리키게 묶어주는 이름표
```

`invalidateQueries`는 해당 키의 캐시에 "신선하지 않음(stale)" 표시를 붙입니다. 그 키를 구독 중인 `useQuery`가 있으면 즉시 refetch가 발생하고, 없으면 다음 마운트 시에 새로 받아옵니다.

![invalidate 호출 후 캐시 만료와 refetch 흐름](/blog/tanstack-query/tanstack-query-02.png)

두 곳의 키가 다르면 `invalidateQueries`가 전혀 다른 캐시를 가리키게 됩니다. **에러 없이 조용히 아무 일도 일어나지 않는** 이유입니다.

## 해결: queryKey를 상수로 중앙 관리하기

문자열을 직접 쓰는 한 오타를 막을 방법이 없습니다. 모든 `queryKey`를 상수로 중앙 관리하기로 했습니다.

![QUERY_KEYS 상수 중앙 관리 코드](/blog/tanstack-query/tanstack-query-03.png)

`QUERY_KEYS` 객체 아래 도메인별로 키 팩토리 함수를 모았습니다. 두 가지 설계 포인트가 있습니다.

1. **함수로 정의한 이유** — `orgId` 같은 파라미터를 받아야 하는 키가 있기 때문입니다. `(orgId) => [...]` 형태로 만들면 파라미터를 타입 안전하게 넘길 수 있습니다.
2. **as const를 붙인 이유** — 반환 타입이 `string[]`이 아니라 `readonly ["my-workspaces"]`처럼 구체적인 튜플로 추론됩니다. 에디터에서 키 자동완성이 동작하고, 잘못된 타입의 인자를 전달하면 컴파일 타임에 에러로 잡힙니다.

```ts
// Before
useCoreQuery(["my-workspaces"], getMyWorkspaces);
queryClient.invalidateQueries({ queryKey: ["my-workspaces"] });

// After
useCoreQuery(QUERY_KEYS.workspace.list(), getMyWorkspaces);
queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workspace.list() });
```

`useQuery`와 `invalidate`가 동일한 함수 호출을 참조하므로, 키가 달라지는 실수 자체가 불가능해집니다.

## 배운 것

가장 찾기 어려운 버그는 에러가 없는 버그입니다. `invalidateQueries`를 호출해도 화면이 바뀌지 않을 때, 콘솔에는 아무것도 찍히지 않습니다. 오타인지, 쿼리가 비활성 상태인지, 다른 원인이 있는지를 직접 추적해야 합니다.

이 경험에서 TanStack Query가 `queryKey`를 순수 관례로 다룬다는 점을 이해했습니다. 프레임워크는 `useQuery`와 `invalidateQueries`가 같은 키를 가리키는지 확인하지 않습니다. 두 곳이 연결되어 있다는 사실은 코드 어디에도 명시되지 않았습니다.

`queryKey`를 상수로 중앙 관리하는 것이 단순한 컨벤션이 아니라는 것도 그때 비로소 보였습니다. 문자열이 여러 파일에 흩어져 있는 한, 일치 여부를 사람이 눈으로 확인해야 합니다. 상수 하나를 공유하면 **두 곳이 같은 캐시를 가리킨다는 사실을 코드가 보장**하게 됩니다.

이 리팩토링 이후 WhereYouAd 프로젝트에서 `queryKey` 불일치 버그가 사라졌습니다. 4개 파일에 흩어져 있던 문자열이 팩토리 함수 하나로 통합되면서, 키 이름을 바꾸거나 파라미터 구조를 수정할 때 한 곳만 고치면 연결된 모든 `useQuery`와 `invalidateQueries`가 자동으로 따라갑니다.

> 문자열을 공유하면 일치 여부를 사람이 판단해야 한다. 상수를 공유하면 코드가 보장한다.
