---
title: "CloudFront Functions로 CSP 헤더와 XSS 방어 구성"
date: "2026-07-28"
desc: "accessToken 메모리 저장만으로는 스크립트 실행 자체를 막지 못한다. CloudFront Functions로 CSP 헤더를 추가해 스크립트 실행 차단과 탈취 피해 최소화 두 레이어로 XSS 방어를 완성했다."
tags: ["보안", "CSP"]
project: "WhereYouAd"
---

whereYouAd는 accessToken을 로컬스토리지 대신 Zustand 메모리에만 저장해 XSS 탈취 피해를 최소화했습니다. 하지만 이는 어디까지나 스크립트가 실행된 이후의 2차 방어선에 불과합니다. 진정한 의미의 1차 방어는 악성 스크립트 자체가 실행되지 못하도록 원천 차단하는 것이며, 그 역할을 하는 것이 바로 **Content Security Policy**(CSP)입니다.

XSS(Cross-Site Scripting)는 공격자가 웹 페이지의 취약점을 이용해 악성 스크립트를 삽입하고, 다른 사용자의 브라우저에서 실행시키는 공격 방식입니다. 실행된 스크립트는 `localStorage`를 직접 읽거나 네트워크 요청을 가로채 인증 토큰 같은 민감한 정보를 외부로 유출시킬 수 있습니다.

## CSP 헤더를 추가하는 위치

CSP는 허용된 출처의 리소스만 로드·실행하도록 브라우저에게 지시하는 HTTP 응답 헤더입니다. 서버가 응답에 이 헤더를 포함하면, 브라우저는 헤더에 명시되지 않은 출처의 스크립트나 리소스 요청을 자동으로 차단합니다.

whereYouAd는 프론트엔드가 S3 + CloudFront로 호스팅되는 <TermAnnotation def="최초 한 번만 HTML을 내려받고, 이후 페이지 전환은 JavaScript로 처리하는 웹 앱 구조. 백엔드 API 서버가 별도로 있어도 HTML 자체는 CloudFront에서 브라우저로 직접 전달되므로, 프론트엔드 응답에 헤더를 추가하려면 CloudFront 레이어에서 처리해야 한다.">SPA</TermAnnotation>입니다. 백엔드 API 서버(`api.whereyouad.com`)가 별도로 존재하지만, HTML은 CloudFront에서 브라우저로 직접 전달되어 API 서버를 거치지 않습니다. 백엔드 코드에서는 프론트엔드 HTML 응답에 헤더를 추가할 수 없습니다.

HTML `<meta>` 태그로도 CSP를 선언할 수 있지만 `frame-ancestors` 등 일부 디렉티브를 지원하지 않습니다.

CloudFront Response Headers Policy를 콘솔에서 설정하면 되지만 Business 플랜이 필요했습니다. 대안으로 선택한 것이 **CloudFront Functions**입니다. 엣지 서버에서 실행되는 경량 JavaScript 함수로, 엣지 서버는 전 세계에 분산되어 사용자와 가장 가까운 위치에서 응답을 처리합니다. 오리진까지 요청을 전달하기 전후에 응답 헤더를 추가하거나 수정할 수 있으며, 월 200만 건까지 무료입니다.

## Report-Only → Enforcing 2단계 전환

CSP 헤더는 두 가지 모드로 전달할 수 있습니다. `Content-Security-Policy` 헤더는 정책에 어긋난 리소스 로드를 즉시 차단하는 enforcing 모드이고, `Content-Security-Policy-Report-Only` 헤더는 차단 없이 위반 항목을 브라우저 콘솔에 경고만 표시하는 Report-Only 모드입니다.

> enforcing은 위반 리소스를 즉시 차단하고, Report-Only는 차단 없이 콘솔에 경고만 표시한다.

enforcing 모드를 바로 적용하면 정책에 명시하지 않은 도메인에서 오는 스크립트·폰트·API 요청이 모두 차단됩니다. 초기에는 사이트가 실제로 사용하는 외부 도메인을 전부 파악하지 못한 상태라서, 정상적으로 사용 중인 차트 라이브러리나 폰트가 차단될 수 있습니다.

`Content-Security-Policy-Report-Only` 헤더를 먼저 적용해 위반 항목을 콘솔에 경고만 표시했습니다. 전체 기능을 테스트하면서 필요한 도메인과 패턴을 정책에 추가하고, 위반이 없음을 확인한 뒤 enforcing으로 전환했습니다.

이 과정에서 예상치 못한 지점을 하나 발견했습니다. `connect-src 'self'`만 설정하면 API 호출이 전부 차단됩니다. `VITE_API_BASE_URL`이 `https://api.whereyouad.com`으로 프론트엔드와 다른 서브도메인이었기 때문입니다. `'self'`는 정확히 같은 오리진만 허용하므로 `https://api.whereyouad.com`을 `connect-src`에 명시적으로 추가해야 했습니다.

## 최종 CSP 정책과 선택 이유

CSP 정책은 리소스 유형별로 허용 출처를 선언합니다. 각 줄 앞부분(`script-src`, `img-src` 등)을 **디렉티브**라고 하며, 뒤에 허용할 출처를 나열합니다. `default-src`는 세부 디렉티브로 명시하지 않은 유형의 기본값으로 동작합니다.

> `'self'`는 프로토콜·도메인·포트가 모두 일치하는 출처만 허용하며, 외부 도메인은 명시적으로 추가해야 한다.

```text
default-src 'self';
script-src 'self' 'unsafe-eval';
connect-src 'self' https://api.whereyouad.com https://*.ingest.sentry.io;
img-src 'self' data: blob: https://*.amazonaws.com;
style-src 'self' 'unsafe-inline';
font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
frame-ancestors 'none';
base-uri 'self';
object-src 'none';
```

`'self'`만으로 커버되지 않아 예외를 추가한 항목들입니다. `connect-src`는 `fetch`, `XHR`, `WebSocket` 등 JavaScript 네트워크 요청이 허용되는 도메인을 제어합니다.

| 디렉티브 | 이유 |
|----------|------|
| `script-src 'unsafe-eval'` | ApexCharts 5.x가 차트 렌더링 함수를 `new Function()`으로 동적 생성 |
| `style-src 'unsafe-inline'` | Framer Motion이 애니메이션 값을 `style` 속성으로 주입, Tailwind v4가 런타임에 스타일 생성 |
| `img-src data: blob:` | 차트를 PNG로 다운로드할 때 `data:` URI, PDF 생성 시 `blob:` URL 사용 |
| `img-src *.amazonaws.com` | 워크스페이스 프로필 이미지를 S3 URL로 직접 참조 |
| `connect-src *.ingest.sentry.io` | Sentry SDK가 에러 이벤트를 Sentry 서버로 전송 |
| `frame-ancestors 'none'` | 이 페이지를 `<iframe>`에 삽입하는 것을 차단해 클릭재킹 방지 |
| `base-uri 'self'` | `<base>` 태그 URL을 외부 도메인으로 교체하는 공격 차단 |
| `object-src 'none'` | `<object>`, `<embed>` 플러그인 요소를 전면 차단 |

## CI/CD 자동화

CSP 정책을 코드로 관리하고 배포 시 CloudFront Function에 자동 반영했습니다.

```yaml
# .github/workflows/main.yaml
- name: Update CloudFront CSP Function
  run: |
    ETAG=$(aws cloudfront describe-function \
      --name add-csp-report-only --query 'ETag' --output text)
    aws cloudfront update-function \
      --name add-csp-report-only --if-match "$ETAG" \
      --function-config Comment="CSP security headers",Runtime="cloudfront-js-2.0" \
      --function-code fileb://scripts/cloudfront-functions/csp-headers.js
    NEW_ETAG=$(aws cloudfront describe-function \
      --name add-csp-report-only --query 'ETag' --output text)
    aws cloudfront publish-function \
      --name add-csp-report-only --if-match "$NEW_ETAG"
```

배포는 세 단계로 진행됩니다.

```text
① describe-function  → 현재 함수의 ETag(버전 식별자) 조회
② update-function    → 새 코드 업로드 (아직 미적용)
③ publish-function   → 변경 사항 활성화 (트래픽에 반영)
```

`--if-match "$ETAG"` 옵션은 업로드 시점에 다른 변경이 끼어들었다면 배포를 실패시켜 충돌을 방지합니다.

`scripts/cloudfront-functions/csp-headers.js`가 CSP 정책의 SSOT(Single Source of Truth)입니다. AWS 콘솔에서 직접 수정하면 변경 이력이 코드베이스에 남지 않아 언제, 왜 정책이 바뀌었는지 파악하기 어렵습니다. 이 파일만 수정하면 PR 리뷰를 거쳐 배포 시 자동으로 반영되므로, 보안 정책 변경도 일반 코드 변경과 동일한 절차로 관리됩니다.

## 트레이드오프

`'unsafe-eval'`은 문자열을 JavaScript 코드로 실행하는 `eval()`, `new Function()`, `setTimeout(string)` 같은 동적 코드 실행을 허용합니다. CSP는 기본적으로 이를 차단하는데, XSS 공격으로 악성 문자열이 주입된 경우 `eval()`을 통해 실행될 수 있기 때문입니다. ApexCharts가 차트 렌더링 함수를 `new Function()`으로 생성하기 때문에 예외를 허용했습니다.

> `'unsafe-eval'`을 허용하면 문자열을 코드로 실행하는 경로가 열린다.

<Callout type="tip">
nonce 방식은 `'unsafe-eval'` 없이 특정 스크립트만 허용하는 대안입니다. 서버가 매 요청마다 무작위 토큰을 생성해 `<script nonce="abc123">`처럼 태그에 삽입하고, CSP 헤더에 `'nonce-abc123'`을 지정하면 해당 스크립트만 실행을 허용합니다. whereYouAd는 정적 SPA 구조라 매 요청마다 nonce를 생성할 서버가 없어 적용하기 어렵습니다.
</Callout>

`'unsafe-inline'`(styles)은 스크립트의 `'unsafe-inline'`보다 위험도가 낮습니다. 인라인 CSS는 JavaScript를 실행하거나 직접 네트워크 요청을 보낼 수 없기 때문입니다. 다만 완전히 무해하지는 않아 허용 범위를 `style-src`로 스타일에만 한정했습니다. Tailwind v4와 Framer Motion이 런타임에 인라인 스타일을 주입하므로 허용할 수밖에 없었습니다.

## 정리

XSS 방어는 두 레이어가 함께 작동해야 합니다. CSP는 허용되지 않은 스크립트 실행 자체를 막고, 메모리 저장은 스크립트가 실행되더라도 직접 접근할 수 없게 합니다. S3+CloudFront SPA 구조에서 CSP를 추가하는 가장 간단한 방법은 CloudFront Functions였고, CI/CD에 통합해 정책 변경이 코드 리뷰와 배포 파이프라인을 통해 관리됩니다.

## 관련 PR

- [CSP 보안 헤더 CloudFront Function 코드 추가 및 CI 배포 자동화](https://github.com/WhereYouAd/WhereYouAd-Frontend/pull/329)
