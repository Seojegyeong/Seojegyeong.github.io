---
title: "JWT 인증이 필요한 SSE FetchEventSource 도입기"
date: "2026-09-08"
desc: "EventSource의 커스텀 헤더 미지원으로 JWT 인증이 불가능한 문제를 FetchEventSource로 해결하고, useClickStream 훅으로 SSE 연결을 캡슐화한 과정을 정리했다."
tags: ["SSE", "인증"]
---

WhereYouAd 대시보드에서 광고 클릭 스트림을 실시간으로 표시해야 했습니다. 데이터 업데이트 주기는 1초, 서버에서 클라이언트 방향으로만 데이터가 흐르는 구조입니다.

처음에는 `setInterval`로 1초마다 폴링하는 방식을 검토했습니다. 하지만 데이터 변화 여부와 상관없이 반복 요청이 발생해 불필요한 서버 부하가 생깁니다. 서버 → 클라이언트 단방향 스트리밍이 필요한 상황이라 SSE를 선택했습니다.

## Polling, WebSocket, SSE 비교

실시간 데이터를 받아오는 방법은 세 가지입니다.

| | Polling | WebSocket | SSE |
|---|---|---|---|
| 통신 방향 | 클라이언트 → 서버 반복 | 양방향 | 서버 → 클라이언트 |
| 연결 방식 | 요청마다 새 HTTP 연결 | 별도 프로토콜 (ws://) | HTTP 단일 연결 유지 |
| 실시간성 | 주기 간격만큼 지연 | ✅ | ✅ |
| 자동 재연결 | 해당 없음 | 직접 구현 | ✅ (브라우저 기본) |

클릭 스트림은 클라이언트가 서버로 데이터를 보낼 일이 없으므로, 양방향 통신이 가능한 WebSocket은 이 상황에서 불필요합니다. SSE는 기존 HTTP를 그대로 사용해 인프라 변경 없이 적용할 수 있다는 점도 선택 이유였습니다.

## EventSource, EventSourcePolyfill, FetchEventSource

SSE를 구현하는 방법은 세 가지입니다.

### EventSource

[`EventSource`](https://developer.mozilla.org/ko/docs/Web/API/EventSource)는 브라우저 기본 Web API입니다.

```ts
const es = new EventSource(url, { withCredentials: true });
es.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
});
```

연결이 끊기면 자동으로 재연결하고 이벤트 리스너를 쉽게 붙일 수 있습니다. 하지만 **커스텀 헤더를 지원하지 않습니다.** `withCredentials`로 쿠키 전송은 가능하지만, [`Authorization`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Authorization) 헤더를 추가할 방법이 없어 JWT 인증이 필요한 엔드포인트에는 쓸 수 없습니다.

### EventSourcePolyfill

`event-source-polyfill` 라이브러리입니다. `EventSource`와 동일한 API를 유지하면서 커스텀 헤더를 추가할 수 있습니다.

```ts
import { EventSourcePolyfill } from "event-source-polyfill";

const es = new EventSourcePolyfill(url, {
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});
```

GET 메서드 기반에서 JWT 인증 헤더가 필요한 경우에 적합합니다. POST 메서드나 Request Body 전송은 지원하지 않습니다.

### FetchEventSource

Microsoft가 공개한 오픈소스 라이브러리입니다. `fetch` 기반이라 커스텀 헤더, POST Body, 세밀한 에러 핸들링을 모두 지원합니다.

```ts
import { fetchEventSource } from "@microsoft/fetch-event-source";

await fetchEventSource(url, {
  headers: { Authorization: `Bearer ${token}` },
  async onopen(response) {
    if (response.status === 401) { /* 재발급 처리 */ }
  },
  onmessage(event) { /* 데이터 처리 */ },
  onerror(err) { /* 에러 처리 */ },
});
```

`onopen`, `onerror` 훅에서 연결 성공/실패를 직접 제어할 수 있습니다. 자동 재연결은 직접 구현해야 하지만, 인증 처리나 에러 상황에 맞게 다루기 더 좋습니다.

| | EventSource | EventSourcePolyfill | FetchEventSource |
|---|:-----------:|:-------------------:|:----------------:|
| 커스텀 헤더 | ❌ | ✅ | ✅ |
| POST 지원 | ❌ | ❌ | ✅ |
| 자동 재연결 | ✅ | ✅ | 직접 구현 |
| 세밀한 에러 핸들링 | ❌ | ❌ | ✅ |

JWT 인증 헤더가 필요하고 나중에 401 재발급 처리까지 붙여야 했기 때문에 FetchEventSource를 선택했습니다.

## useClickStream으로 SSE 연결 캡슐화

FetchEventSource를 직접 컴포넌트에서 쓰면 연결 생명주기와 상태 관리가 얽힙니다. SSE 연결 전체를 `useClickStream` 훅으로 캡슐화했습니다.

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: "#fbfcfd"
    primaryBorderColor: "#e6e8ea"
    fontFamily: "Pretendard, sans-serif"
---
sequenceDiagram
  participant H as useClickStream
  participant F as fetchEventSource
  participant S as 서버

  H->>F: fetchEventSource(url, { signal })
  F->>S: HTTP GET (SSE 연결)
  S-->>F: org-click-update 이벤트 (1초마다)
  F->>H: onmessage(event)
  Note over H: setData / setSuspectDetail
  H->>F: controller.abort() [cleanup]
  F-->>S: 연결 종료
```

```ts
import { fetchEventSource } from "@microsoft/fetch-event-source";
import useAuthStore from "@/store/useAuthStore";
import useWorkspaceStore from "@/store/useWorkspaceStore";

export function useClickStream(mode: "real" | "dummy" = "real") {
  const orgId = useWorkspaceStore((s) => s.selectedOrgId);
  const accessToken = useAuthStore((s) => s.accessToken);

  const [data, setData] = useState<IClickStreamItem | null>(null);
  const [suspectDetail, setSuspectDetail] =
    useState<IClickStreamItem["suspectDetail"]>(null);

  useEffect(() => {
    if (!orgId || !accessToken) return;

    const controller = new AbortController();

    fetchEventSource(`/api/dashboard/${orgId}/clicks/stream?mode=${mode}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: controller.signal,
      onmessage(event) {
        if (event.event === "org-click-update") {
          const parsed: IClickStreamItem = JSON.parse(event.data)?.data;
          setData(parsed);
          if (parsed.suspectDetail) {
            setSuspectDetail(parsed.suspectDetail);
          }
        }
      },
    });

    return () => controller.abort();
  }, [orgId, accessToken, mode]);

  return { data, suspectDetail };
}
```

### SSE 생명주기와 AbortController

`fetchEventSource`는 `await` 없이 호출합니다. Promise를 기다리지 않아도 `signal: controller.signal`을 통해 외부에서 연결을 제어할 수 있기 때문입니다. `useEffect` cleanup에서 `controller.abort()`를 호출하면 진행 중인 SSE 연결이 즉시 종료됩니다. 컴포넌트가 unmount되거나 effect가 재실행될 때 이전 연결이 남지 않아 메모리 누수가 없습니다.

![useClickStream 훅 내부 실행 흐름 — Guard 조건 확인, fetchEventSource 호출, onmessage 처리, cleanup 경로](/blog/sse-fetch-event-source/sse-fetch-event-source-01.png)

훅의 실행은 두 경로로 나뉩니다. 왼쪽은 이벤트를 수신해 state를 업데이트하는 경로이고, 오른쪽은 unmount 시 연결을 끊는 cleanup 경로입니다.

### State 분리 전략

`data`는 매 tick(1초)마다 완전히 교체되지만, `suspectDetail`은 **별도 state로 분리**해 보존합니다. 이상 징후는 한 번 감지된 뒤 사용자가 확인할 때까지 계속 표시해야 하므로, 새 데이터가 와도 초기화되지 않아야 합니다.

### Zustand 연동과 자동 재연결

`useAuthStore`에서 꺼낸 `accessToken`과 `useWorkspaceStore`에서 꺼낸 `orgId`를 모두 `useEffect` 의존성 배열에 포함합니다. Zustand 스토어의 `accessToken`이 바뀌면 React가 이전 effect를 cleanup하고(기존 연결 abort) 새 effect를 실행해 새 토큰으로 SSE를 재연결합니다. 401 재발급 이후 `setAccessToken(newToken)`을 호출하는 것만으로 자동 재연결이 이어지는 이유입니다. `orgId`도 같은 방식으로 동작해, 워크스페이스를 전환하면 이전 연결이 abort되고 새 org의 스트림으로 자동 전환됩니다.

## 개발 환경에서 연결이 두 번 되는 이유

React 18 `StrictMode`가 개발 환경에서 effect를 의도적으로 두 번 실행하기 때문입니다(mount → unmount → mount). DevTools Network 탭에서 SSE 연결이 두 번 맺어지는 것을 확인할 수 있습니다.

![DevTools Network 탭에서 첫 번째 SSE 연결이 빨간색(abort)으로 표시되고 두 번째 연결이 유지되는 모습](/blog/sse-fetch-event-source/sse-fetch-event-source-02.png)

첫 번째 연결은 unmount 시 [`AbortController`](https://developer.mozilla.org/ko/docs/Web/API/AbortController)의 `abort()`로 취소됩니다. Network 탭에서 빨간색으로 표시되는 건 이 abort로 인한 정상 종료이며, 프로덕션 빌드에서는 effect가 한 번만 실행됩니다.

## JWT 만료와 Single-Flight 재발급 처리

FetchEventSource를 선택한 이유 중 하나가 `onopen`에서 `response.status === 401`을 직접 처리할 수 있다는 점이었습니다. 그런데 실제 적용하고 나서 새로운 문제가 드러났습니다.

대시보드에는 채널별로 3개의 SSE 연결이 열려 있었습니다. 세 연결이 동시에 401을 받으면 각자가 독립적으로 재발급을 시도합니다. 서버는 refreshToken을 1회 사용 후 무효화하므로 첫 번째 재발급만 성공하고, 나머지 두 번은 실패해 강제 로그아웃이 발생했습니다.

모듈 레벨에서 Promise를 캐싱해 재발급이 진행 중이면 같은 Promise를 공유하도록 만드는 방식으로 해결했습니다. `abort` vs `throw` 선택, `onerror`의 AbortError 분기, axios 레이어와의 락 공유까지 구체적인 구현은 [SSE 401 재발급을 1번으로 보장하는 싱글턴 패턴](/blog/sse-401-refresh-singleton)에서 다룹니다.

## 정리

JWT 인증 헤더가 필요한 SSE에는 `EventSource`를 쓸 수 없습니다. `FetchEventSource`는 `onopen`과 `onerror` 훅으로 인증 처리와 에러 핸들링을 직접 제어할 수 있습니다. `AbortController`로 생명주기를 관리하고, `accessToken`을 `useEffect` 의존성에 두면 Zustand 스토어의 토큰 갱신이 자동으로 SSE 재연결로 이어집니다.

> `FetchEventSource`로 JWT 헤더를 붙이고, `AbortController`로 생명주기를 관리하고, 토큰 변경을 의존성으로 감지해 재연결을 자동화한다.
