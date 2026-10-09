---
title: "TanStack Query 재시도 정책"
date: "2026-06-23"
desc: "기본값 retry: 3은 404 오류에서도 API 4회 호출과 최대 7,000ms 대기를 만든다. 4xx는 즉시 실패, 5xx·네트워크 오류만 1회 재시도하는 retryPolicy로 교체해 불필요한 대기를 제거했다."
tags: ["TanStack Query", "에러 처리"]
---

whereYouAd 개발 중 DevTools Network 탭을 보다가 이상한 것을 발견했습니다. 없는 리소스에 접근했을 때 404 응답이 4번 연속으로 찍혔습니다. TanStack Query 기본값 `retry: 3`이 적용된 결과였습니다. 404는 재시도해도 결과가 같은데, 3번을 더 시도하며 최대 7,000ms(지수 백오프 기준)를 기다리고 있었습니다.

## 4xx는 재시도가 의미 없다

TanStack Query의 기본 재시도 동작은 다음과 같습니다.

```text
retry: 3
retryDelay: Math.min(1000 * 2^attemptIndex, 30000)
→ 1회: 1,000ms 후, 2회: 2,000ms 후, 3회: 4,000ms 후
→ 총 최대 7,000ms 대기
```

5xx 오류는 서버 내부 오류나 일시적 과부하로 잠시 후 복구될 수 있습니다. 재시도가 의미 있습니다. 하지만 4xx는 다릅니다.

- **400 Bad Request**: 파라미터 오류 — 같은 요청을 반복해도 결과가 같음
- **401 Unauthorized**: 인증 만료 — 토큰 갱신 없이 재시도해도 실패 (401 큐 패턴이 별도로 처리)
- **404 Not Found**: 리소스 없음 — 재시도해도 없음

4xx를 3번 재시도하면 사용자는 오류 메시지 없이 최대 7초를 기다린 뒤 결국 같은 실패를 봅니다.

## retryPolicy 함수

`retry` 옵션에 함수를 전달하면 오류 유형에 따라 재시도 여부를 제어할 수 있습니다.

```ts
// src/lib/queryClient.ts

const retryPolicy = (failureCount: number, error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    // 4xx 범위: 즉시 포기
    if (status !== undefined && status >= 400 && status < 500) {
      return false;
    }
  }

  // 5xx 또는 네트워크 오류(status 없음): 1회만 재시도
  return failureCount < 1;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: retryPolicy,
    },
    mutations: {
      retry: retryPolicy,
    },
  },
});
```

| 오류 유형 | 재시도 | 이유 |
|----------|--------|------|
| 4xx | 없음 | 서버 상태가 바뀌지 않는 한 결과 동일 |
| 5xx | 1회 | 서버 일시 오류 — 1회는 합리적 |
| 네트워크 오류 | 1회 | 클라이언트 연결 문제 — 1회 재시도 유효 |

실측으로 404 오류에서 API 호출 4회 → 1회로 감소하고, 최대 7,000ms 대기가 제거됐습니다.

## 기본값을 바꾸는 것이 안전성을 낮추지 않는다

"재시도가 많을수록 안전하다"는 인식이 있습니다. 5xx·네트워크 오류에는 맞는 말이지만 4xx에는 적용되지 않습니다. 오히려 4xx를 즉시 실패로 처리해 에러 UI를 빠르게 표시하는 것이 더 나은 UX입니다.

안정성이 중요한 개별 쿼리는 `retry` 옵션을 직접 오버라이드할 수 있습니다.

```ts
// 특정 쿼리만 재시도 횟수 늘리기
useQuery({
  queryKey: ["critical-data"],
  queryFn: fetchCriticalData,
  retry: 3, // 개별 오버라이드
});
```

전역 기본값을 보수적으로 설정하고, 필요한 경우에만 늘리는 방향이 적절합니다.

## 정리

TanStack Query 기본값은 모든 오류에 동일하게 적용됩니다. 오류 유형마다 재시도의 의미가 다르기 때문에, `retry` 옵션에 함수를 전달해 4xx와 5xx를 다르게 처리했습니다. 사용자 입장에서 404는 7초 기다린 뒤 실패하는 것보다 즉시 에러 메시지를 보는 것이 낫습니다.
