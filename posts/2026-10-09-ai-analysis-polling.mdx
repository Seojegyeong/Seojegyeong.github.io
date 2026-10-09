---
title: "AI 분석 요청의 POST + 폴링 복합 패턴"
date: "2026-05-26"
desc: "AI 리포트 생성의 POST(accessToken 발급) → GET 폴링(PENDING→SUCCESS) 2단계 흐름과 조직 공유 리포트 재사용 로직을 단일 훅으로 캡슐화하고, 쿼리 키를 accessToken에서 orgId로 교체해 캐시 파편화 버그를 함께 해결했다."
tags: ["TanStack Query", "성능최적화"]
---

whereYouAd AI 분석 기능을 구현할 때 비동기 흐름이 단순하지 않았습니다.

1. POST로 임시 `accessToken`을 발급받는다
2. 그 토큰으로 GET 폴링을 돌린다 — `status`가 `"PENDING"`이면 1500ms마다 재요청, `"SUCCESS"`면 중단
3. 같은 조직에 공유 리포트가 이미 있으면 POST 없이 재사용한다 (AI API 비용 절감)

컴포넌트에서 이 흐름을 직접 관리하면 3개 비동기 상태 + 폴링 타이머 + 에러 분기가 뒤섞입니다. `useAiAnalysisReport` 단일 훅으로 감쌌습니다.

## 3단계 흐름

```text
0단계: 조직 공유 리포트 우선 조회
  ├─ 있음 → accessToken + createdAt 저장 → 폴링 시작
  └─ 없음 → 1단계로

1단계: POST 요청 (requestAnalysis() 호출 시)
  └─ 성공 → accessToken 저장 → 첫 GET 즉시 발사

2단계: GET 폴링 (accessToken 있을 때)
  ├─ status: "PENDING" + 타임아웃 미초과 → 1500ms 간격으로 계속
  ├─ status: "SUCCESS" → 폴링 중단, 결과 반환
  └─ status: "FAILED" | 타임아웃 초과 → isError = true
```

## refetchInterval 동적 제어

폴링은 `refetchInterval`에 함수를 넘기는 것으로 구현했습니다. 조건에 따라 간격을 반환하거나 `false`로 중단합니다.

```ts
const reportQuery = useCoreQuery(
  QUERY_KEYS.ai.report(provider, orgId),
  () => getAiReportByAccessToken(accessToken!),
  {
    enabled: !!accessToken,
    staleTime: 0,
    gcTime: AI_REPORT_GC_TIME_MS,       // 언마운트 후 5분 캐시 유지
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status !== "PENDING") return false;
      if (pollStartedAt && Date.now() - pollStartedAt > MAX_POLL_MS) return false;
      return POLL_INTERVAL_MS;           // 1500ms
    },
  },
);
```

`status`가 `"PENDING"`이 아니면 폴링을 중단하고, 타임아웃을 초과해도 중단합니다. `refetchInterval: false`를 반환하면 TanStack Query는 자동 재패치를 멈춥니다.

POST 직후 첫 GET을 1500ms 기다리지 않고 즉시 발사하기 위해 `onSuccess`에서 `queryClient.fetchQuery()`를 명시적으로 호출했습니다.

## 컴포넌트에서 사용

```ts
const { reportData, requestAnalysis, isLoading, isError, loadingMessage } =
  useAiAnalysisReport("ALL");

// requestAnalysis() 한 번 호출 → 공유 리포트 조회 → POST → 폴링 모두 처리
```

컴포넌트는 훅의 인터페이스만 알면 됩니다. 3단계 흐름은 훅 내부에 격리됩니다.

## 쿼리 키 설계 실수 — accessToken → orgId

처음에 쿼리 키를 `QUERY_KEYS.ai.report(provider, accessToken)`으로 설정했습니다. 배포 후 캐시가 예상대로 작동하지 않는 것을 발견했습니다.

accessToken은 임시 접근 키라 재발급마다 값이 바뀝니다. 토큰이 바뀔 때마다 새 쿼리 키가 생성되어 기존 캐시를 읽지 못하고 폴링이 새로 시작됐습니다.

```ts
// Before: 토큰 재발급 → 키 변경 → 캐시 파편화
QUERY_KEYS.ai.report = (provider, accessToken) =>
  ["ai", "report", provider, accessToken];

// After: orgId 기준 → 안정적인 캐시 키
QUERY_KEYS.ai.report = (provider, orgId) =>
  ["ai", "report", provider, orgId];
```

캐시의 의미 단위는 "조직의 AI 리포트"입니다. 식별자는 토큰이 아니라 `orgId`가 맞습니다. 쿼리 키를 무엇으로 잡을지는 "이 데이터를 식별하는 기준이 무엇인가"를 먼저 생각해야 합니다.

## gcTime과 staleTime 조합

```ts
gcTime: AI_REPORT_GC_TIME_MS,  // 언마운트 후 5분 캐시 유지
staleTime: 0,                   // 마운트 시 항상 백그라운드 갱신
```

`gcTime`을 5분으로 설정한 이유는 같은 조직 리포트를 짧은 시간 내 재방문하면 API 호출 없이 캐시를 재사용하기 위해서입니다. `staleTime: 0`은 그와 동시에 마운트 시점에 서버 데이터가 달라졌는지 항상 확인합니다.

## 트레이드오프

`refetchInterval`은 컴포넌트 마운트 상태에 의존합니다. 사용자가 다른 탭으로 이동하면 폴링이 멈출 수 있습니다. `visibilitychange` 이벤트로 보완할 수 있지만 구현하지 않았습니다. AI 분석 요청 후 탭을 떠났다가 돌아오면 폴링이 재개되어 결국 완료를 확인할 수 있으므로 현재 요구사항에서는 허용 가능한 트레이드오프로 판단했습니다.
