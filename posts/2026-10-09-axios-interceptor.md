---
title: "axios 인터셉터 성공 처리 통일과 FormData 자동화"
date: "2025-11-24"
desc: "서버 응답 키가 success와 isSuccess로 혼재하는 환경에서 양쪽을 동시에 처리하고, FormData 자동 감지로 Content-Type을 삭제하며 AUTH_FREE_PATHS 화이트리스트로 토큰 주입을 제어하는 인터셉터를 설계했다."
tags: ["axios", "TypeScript"]
project: "Roome"
---

Roome 개발 초반에 일부 API에서 성공 응답인데도 에러로 처리되는 버그가 있었습니다. 원인을 찾고 보니 서버가 성공 여부를 나타내는 키를 `success`와 `isSuccess` 두 가지로 반환하고 있었습니다. 서버 개발 초기에 `isSuccess`로 시작했다가 중간에 `success`로 변경했는데, 두 버전이 혼재된 상태로 배포된 것이었습니다.

## 세 가지 공통 처리를 인터셉터에 집중

API 호출 코드에서 매번 처리하던 세 가지를 인터셉터로 옮겼습니다.

**문제 1 — success/isSuccess 혼재**

클라이언트가 `success`만 체크하면 `isSuccess`를 반환하는 API에서 성공이 에러로 처리됩니다. 반대도 마찬가지입니다. API마다 어느 키를 쓰는지 확인하며 개발하는 것은 너무 번거롭습니다.

**문제 2 — FormData Content-Type**

`apiClient`는 기본 헤더로 `"Content-Type": "application/json"`을 설정하고 있습니다. 이미지 업로드 시 `FormData`를 보내면 axios가 `multipart/form-data`로 전환하려 하는데, 단순히 값을 교체하는 것이 아니라 각 파트를 구분하는 `boundary`를 포함한 헤더를 새로 생성해야 합니다.

```http
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWx
```

그런데 axios는 Content-Type 헤더가 이미 존재하면 "이미 설정됐다"고 판단해 boundary 생성을 건너뜁니다. 결과적으로 `Content-Type: application/json`이 그대로 붙어나가고, 서버는 multipart body를 파싱하지 못합니다. 헤더를 **아예 삭제**해야 axios가 boundary를 포함한 올바른 헤더를 처음부터 만들어 줍니다.

**문제 3 — 인증 불필요 API에 토큰 주입**

인터셉터가 모든 요청에 `Authorization: Bearer token`을 붙이는 구조에서, 로그인·소셜 로그인 콜백 같은 API는 아직 로그인 전이라 토큰이 없거나 서버가 해당 엔드포인트에서 Authorization 헤더를 받으면 오히려 오류를 냅니다. `AUTH_FREE_PATHS`가 없으면 인증 관련 API를 새로 만들 때마다 "이 API는 토큰을 빼야 하나?"를 직접 챙겨야 하고, 누락하면 버그로 이어집니다. 화이트리스트에 한 번 등록해두면 그 이후로는 신경 쓰지 않아도 됩니다.

## 인터셉터 구현

```ts
// src/lib/apiClient.ts

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const AUTH_FREE_PATHS = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/google/authorize-uri",
  "/api/auth/kakao/authorize-uri",
  "/api/auth/google/callback",
  "/api/auth/kakao/callback",
];

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  // FormData 자동 감지 → Content-Type 삭제 (axios가 boundary 포함 자동 설정)
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  // 인증이 필요 없는 경로는 토큰 주입 없이 반환
  if (config.url && AUTH_FREE_PATHS.some((p) => config.url?.includes(p))) {
    return config;
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;

    // 키 존재 여부를 먼저 확인 후 성공 판정 (키가 없는 단순 데이터 응답은 통과)
    if (body && typeof body === "object" && ("success" in body || "isSuccess" in body)) {
      const ok = body.success ?? body.isSuccess ?? false;
      if (!ok) {
        throw new Error(body.message || "요청 처리에 실패했습니다.");
      }
    }

    return response;
  },
  (error) => {
    const message =
      error?.response?.data?.message || error?.message || "서버 오류가 발생했습니다.";
    return Promise.reject(new Error(message));
  }
);
```

## FormData Content-Type을 삭제하는 이유

위에서 설명한 것처럼 axios는 Content-Type 헤더가 이미 있으면 boundary 생성을 건너뜁니다. 인터셉터 코드에서 `config.data instanceof FormData`일 때 헤더를 삭제하는 이유입니다.

```ts
if (config.data instanceof FormData) {
  delete config.headers["Content-Type"];
}
```

`Content-Type`을 `multipart/form-data`로 직접 바꾸는 것이 아니라 **삭제**하는 것이 핵심입니다. 삭제해야만 axios가 boundary를 포함한 올바른 헤더를 처음부터 만들어 줍니다.

## success ?? isSuccess 처리의 의미

응답 인터셉터는 두 단계로 동작합니다.

**1단계 — 키 존재 여부 확인**

`"success" in body || "isSuccess" in body`로 응답 객체에 성공 키가 아예 없는 경우를 먼저 걸러냅니다. 키가 없으면 단순 데이터를 반환하는 API로 보고 조건 전체를 건너뜁니다.

**2단계 — 값 판정**

`body.success ?? body.isSuccess ?? false`는 `success` 값이 있으면 그걸 쓰고, `null`이나 `undefined`이면 `isSuccess`를 확인합니다. 둘 다 없으면 `false`로 처리합니다. `!ok`가 참이면 에러를 던집니다.

`data?.success ?? data?.isSuccess`를 바로 쓰면 키 자체가 없는 응답(`[]`, `{}` 등)에서 `undefined ?? undefined`가 되어 `false`로 귀결됩니다. 성공 키가 없는 API가 전부 에러로 빠지는 문제가 생기기 때문에, 키 존재 여부를 먼저 확인하는 것이 중요합니다.

## 트레이드오프

서버 응답 구조가 정규화된 이후에도 `success ?? isSuccess` 처리가 남아있으면 기술 부채가 됩니다. 서버와 협의해 단일 키로 통일되면 인터셉터를 단순화해야 합니다.

`AUTH_FREE_PATHS`는 `includes`로 URL 부분 문자열을 매칭합니다. `/auth/login`이 경로 어딘가에만 포함되면 참이 되므로, 나중에 `/v1/users/auth/login` 같은 구조가 추가될 경우 토큰 주입이 의도치 않게 제외됩니다. Roome의 경로 구조에서는 이 오탐이 발생하지 않았지만, API 경로가 복잡해진다면 `===` 정확 일치나 `startsWith`로 교체하는 것이 더 안전합니다.

## 정리

인터셉터에서 공통 처리를 집중하면 API 함수를 작성할 때 토큰 처리, FormData 처리, 응답 성공 여부 확인을 신경 쓰지 않아도 됩니다. 팀 개발에서는 각자가 같은 처리를 반복 구현하거나 누락하는 실수를 방지하는 효과가 있습니다.
