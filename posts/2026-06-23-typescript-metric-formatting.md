---
title: "대시보드 지표 포맷팅, 하나로 흐르게 만들기"
date: "2026-06-23"
desc: "포맷 규칙이 16개 파일에 분산되어 화면마다 지표가 다르게 표시되는 버그를 METRIC_REGISTRY 레지스트리 패턴으로 단일화해 해결한 과정을 정리했다."
tags: ["TypeScript", "리팩토링"]
project: "WhereYouAd"
---

통합 대시보드를 맡았을 때, 지표 포맷 규칙이 16개 파일에 흩어져 있었습니다. KPI 카드에서 소수 2자리, 테이블에서 소수 1자리, 합계 행에서는 반올림. 같은 클릭수가 화면마다 다르게 보이는 버그가 있었습니다.

```ts
// 클릭수 1234 — 화면마다 포맷이 달랐다
// KpiCard.tsx
const formatted = metric === "clicks" ? value.toLocaleString() : `${value.toFixed(2)}%`;
// → "1,234"

// DataTable.tsx
const formatted = metric === "clicks" ? value.toFixed(0) : `${value.toFixed(1)}%`;
// → "1234"   ← 콤마 없음

// LineChart.tsx (툴팁)
const formatted = String(value);
// → "1234"   ← 포맷 없음
```

같은 지표인데 세 컴포넌트가 각자 규칙을 가지고 있어서 화면마다 숫자가 달랐습니다.

![통합 대시보드 — 클릭수·노출수·전환율·ROAS를 각각 다른 포맷으로 표시한다](/blog/metric_registry/METRIC_REGISTRY-07.png)

![전체 구조: API 응답 → 바인딩 → METRIC_REGISTRY → KPI 카드·일별 테이블·차트](/blog/metric_registry/METRIC_REGISTRY-01.png)

API 응답이 바인딩을 거쳐 `METRIC_REGISTRY`에 연결되고, 레지스트리가 각 컴포넌트에 포맷을 공급하는 구조입니다. 이 흐름을 다섯 단계로 나눠 정리합니다.

## 1. 레지스트리 — 흩어진 분기를 객체에 모으기

1234라는 숫자가 있다고 합시다. 무슨 지표냐에 따라 다르게 보여줘야 합니다.

```js
function formatValue(metric, value) {
  if (metric === "clicks") return value.toLocaleString();      // "1,234"
  if (metric === "spend") return `₩${value.toLocaleString()}`; // "₩1,234"
  if (metric === "conversion") return `${value.toFixed(2)}%`;  // "1.23%"
}
```

돌아가긴 하지만 문제는 이 if 덩어리가 카드 컴포넌트, 테이블, 차트 등에 **각자 미묘하게 다른 형태로** 반복된다는 것입니다. 클릭수 표시 규칙을 바꾸려면 여러 군데를 고쳐야 하고, 한 군데라도 빠뜨리면 화면마다 다르게 보입니다.

지표별 규칙을 하나의 객체에 등록해두고 어디서든 꺼내 쓰는 구조로 바꾸기로 했습니다. 이런 방식을 레지스트리 패턴이라고 부릅니다. if 분기가 객체의 키로 바뀌고, 규칙을 참조하는 쪽은 키만 알면 됩니다.

```ts
const METRIC_REGISTRY = {
  clicks:     { label: "클릭수", format: (v) => v.toLocaleString() },
  spend:      { label: "비용",   format: (v) => `₩${v.toLocaleString()}` },
  conversion: { label: "전환율", format: (v) => `${v.toFixed(2)}%` },
};
```

이제 어느 화면에서든 이렇게 꺼내 쓸 수 있습니다.

```ts
METRIC_REGISTRY.clicks.format(1234); // "1,234"
METRIC_REGISTRY.spend.format(1234);  // "₩1,234"
```

클릭수 포맷을 바꾸려면 레지스트리 한 줄만 수정하면 됩니다. 카드·테이블·차트는 손댈 필요가 없습니다.

![METRIC_REGISTRY — KPI 카드·일별 테이블·차트가 하나의 객체를 바라본다](/blog/metric_registry/METRIC_REGISTRY-02.png)

## 2. 값 타입별 포맷 기준 통일 — 같은 종류면 같은 규칙

레지스트리에 규칙을 모으고 나니 다음 고민이 찾아왔습니다. 팀 프로젝트이다 보니 카드에선 소수 2자리, 좁은 테이블에선 소수 1자리, 테이블 합계 행에서는 반올림 등 위치별 포맷이 달랐습니다.

포맷 기준의 축을 아예 바꾸기로 했습니다. 표시 위치가 아니라 값의 타입에 묶는 것입니다.

```ts
// Before: 위치(컴포넌트)가 포맷 기준 — conversion이 어디서 보이느냐에 따라 달라진다
conversion: {
  formatForCard:    (v) => `${v.toFixed(2)}%`,  // KPI 카드: 소수 2자리
  formatForTable:   (v) => `${v.toFixed(1)}%`,  // 테이블: 소수 1자리
  formatForSummary: (v) => `${Math.round(v)}%`, // 합계 행: 반올림
}

// After: 값의 타입이 포맷 기준 — 비율이면 toFixed(2)%, 어디서 쓰든 동일
conversion: {
  format: (v) => `${v.toFixed(2)}%`,
}
```

Before에서는 같은 지표가 세 개의 포맷을 가집니다. 지표를 추가할 때마다 위치별 포맷을 모두 채워야 하고, 한 군데 빠뜨리면 또 불일치가 생깁니다. After에서는 `conversion`은 비율이므로 `toFixed(2)%` — 이 판단이 레지스트리에 한 번만 들어갑니다.

지표가 많아도 값은 결국 네 종류 중 하나로 떨어집니다.

- 정수형 카운트 → 천 단위 콤마 (1,234)
- 비율 / 퍼센트 → toFixed(2)% (12.34%)
- 금액 (KRW) → ₩ + 반올림 + 콤마 (₩1,234)
- 증감률 → toFixed(2)% + 절댓값

![4가지 값 타입과 포맷 규칙 — 정수형 카운트·비율·금액·증감률](/blog/metric_registry/METRIC_REGISTRY-03.png)

같은 타입으로 분류된 지표는 포맷 함수를 공유합니다. `spend`와 `revenue`는 모두 금액이므로 `formatCurrency` 하나를 spread로 재사용합니다.

```ts
const currencyFormat = { format: formatCurrency } satisfies Pick<IMetricMeta, "format">;

spend:   { label: "비용(지출)", ...currencyFormat } satisfies IMetricMeta,
revenue: { label: "매출",      ...currencyFormat } satisfies IMetricMeta,
```

## 3. 객체에 타입을 붙이자: satisfies

```ts
interface IMetricMeta {
  label: string;
  format: (v: number) => string;
}
```

**방법① 아무것도 안 붙이기**

```ts
const clicks = {
  label: "클릭수",
  format: (v) => v.toLocaleString(),
};
```

TypeScript가 타입을 추론합니다. 하지만 format을 빠뜨려도, 오타를 내도 검사를 하지 않습니다. 또한 strict 모드에서는 `format`의 `v` 파라미터가 unannotated 상태이므로 implicit `any` 경고가 발생합니다.

**방법② 타입 명시하기 (`: IMetricMeta`)**

```ts
const clicks: IMetricMeta = {
  label: "클릭수",
  format: (v) => v.toLocaleString(),
};
```

검사는 받게 되지만, 타입이 `IMetricMeta`로 넓어집니다. `clicks.label`의 타입은 `string`이고, `keyof typeof METRIC_REGISTRY`는 `string`이 됩니다.

**방법③ satisfies 붙이기**

```ts
const clicks = {
  label: "클릭수",
  format: (v) => v.toLocaleString(),
} satisfies IMetricMeta;
```

- format을 빠뜨리면 → 에러가 나고 (검사 O)

```ts
const clicks = {
  label: "클릭수",
  // format 빠뜨림
} satisfies IMetricMeta;
// TS2739: Type '{ label: string; }' is missing the following properties
//         from type 'IMetricMeta': format
```

- format의 `v` 파라미터 → `number`로 contextual typing (implicit any 없음)
- `clicks.label`의 타입 → `string` (오브젝트 리터럴이므로 여전히 widened)

`satisfies`의 핵심 이점은 레지스트리 전체에서 드러납니다.

```ts
const METRIC_REGISTRY = {
  clicks:     { label: "클릭수", format: (v: number) => v.toLocaleString() },
  spend:      { label: "비용",   format: formatCurrency },
  conversion: { label: "전환율", format: (v: number) => `${v.toFixed(2)}%` },
} satisfies Record<string, IMetricMeta>
```

- `keyof typeof METRIC_REGISTRY` → `"clicks" | "spend" | "conversion"` (`:` 방식이면 `string`)
- `METRIC_REGISTRY.unknownKey` → 컴파일 에러 (`:` 방식이면 허용)
- 각 항목의 구체적인 타입이 보존됨

| 방법 | 검사(오타·누락) | 키 유니온 보존 | implicit any 없음 |
| --- | --- | --- | --- |
| ① 아무것도 안 붙임 | ✗ | O | ✗ (strict) |
| ② IMetricMeta | O | ✗ | O |
| ③ satisfies | O | O | O |

`label`의 리터럴 타입 `"클릭수"`를 보존하려면 `as const`를 추가해야 합니다.

```ts
const METRIC_REGISTRY = {
  clicks: { label: "클릭수" as const, format: (v: number) => v.toLocaleString() },
} satisfies Record<string, IMetricMeta>
// METRIC_REGISTRY.clicks.label → "클릭수" (리터럴 타입)
```

![satisfies는 검사와 키 유니온 보존을 모두 만족시키는 교집합이다](/blog/metric_registry/METRIC_REGISTRY-04.png)

## 4. 인터페이스 상속 계층 — 능력을 한 칸씩 쌓기

지표마다 필요한 능력이 다릅니다. 증감률(`formatDelta`)이 필요한 지표도 있고, 카드 제목용 `kpiLabel`이 필요한 지표도 있습니다.

처음에는 `formatDelta`를 optional로 뒀습니다. 증감률이 없는 지표에 실수로 `formatDelta`를 호출했고, 차트 툴팁에 `undefined%`가 표시됐습니다. 타입 검사는 통과했기 때문에 런타임에 직접 확인하기 전까지는 누락을 알 수 없었습니다.

```ts
// ❌ optional 남용 — 빠뜨려도 TypeScript는 가만히 있고, 런타임에 undefined
interface IMetricMeta {
  label: string;
  format: (v: number) => string;
  formatDelta?: (v: number) => string;
  kpiLabel?: string;
}

// ✅ 능력을 한 단계씩 쌓기
interface IMetricMeta {                                    // 바닥: 모두 공통
  label: string;
  format: (v: number) => string;
}
interface IMetricMetaWithDelta extends IMetricMeta {       // + 증감률
  formatDelta: (v: number) => string;
}
interface IKpiMetricMeta extends IMetricMetaWithDelta {    // + 카드 제목
  kpiLabel: string;
}
interface IConversionMetricMeta extends IKpiMetricMeta {   // + 좁은 영역용
  formatCompact: (v: number) => string;
}
```

```ts
conversion: {
  label: "CVR(전환율)",
  kpiLabel: "전환율",
  format: (v) => `${v.toFixed(2)}%`,
  formatCompact: (v) => `${v.toFixed(1)}%`,
  formatDelta: formatPercentDelta,
} satisfies IConversionMetricMeta,   // 하나라도 빠지면 → 컴파일 에러

spend: {
  label: "비용(지출)",
  format: formatCurrency,
} satisfies IMetricMeta,             // label · format만 있으면 됨
```

> 필요한 능력만, 빠짐없이를 타입으로 강제하는 것입니다.

![IMetricMeta → IMetricMetaWithDelta → IKpiMetricMeta → IConversionMetricMeta 상속 계층도](/blog/metric_registry/METRIC_REGISTRY-05.png)

## 5. API 바인딩 — 백엔드와 잇는 방법

백엔드 응답을 레지스트리에 연결할 차례입니다.

- 백엔드 응답: ROAS, ROASChangeRate, cvrChangeRate…
- 레지스트리 키: roas, conversion, clicks…

바인딩에서 쓰는 두 타입은 각각 레지스트리와 API 응답에서 파생됩니다.

```ts
type TKpiMetricKey   = keyof typeof METRIC_REGISTRY; // "clicks" | "roas" | "conversion" | ...
type TMetricApiField = keyof IMetricsResponse;        // "ROAS" | "clicks" | "cvrChangeRate" | ...
```

바인딩 레이어 없이 컴포넌트가 API 응답을 직접 참조하면 백엔드 필드명이 컴포넌트 곳곳으로 새어 나갑니다.

```ts
// 바인딩 없이 — 백엔드 필드명이 컴포넌트 곳곳에 노출된다
<KpiCard label={METRIC_REGISTRY.roas.label} value={data.ROAS} delta={data.ROASChangeRate} />
<TableRow metric="roas" value={data.ROAS} />
<LineChart series={[{ key: "ROAS", data: data.ROAS }]} />
```

백엔드가 `ROAS` 필드를 `roas`로 소문자로 바꾸면 세 군데를 모두 찾아 고쳐야 합니다. 검색도 쉽지 않습니다. `ROAS`라는 문자열이 레이블 텍스트인지, API 필드명인지 구분이 안 되기 때문입니다.

바인딩 레이어를 두면 컴포넌트는 `registryKey`만 알고, API 필드명은 바인딩 한 줄에만 존재합니다.

![API 응답(ROAS, ROASChangeRate) → 바인딩(필드명 ↔ 키 연결) → 레지스트리(roas → format())](/blog/metric_registry/METRIC_REGISTRY-06.png)

```ts
interface IOverviewKpiBinding {
  registryKey: TKpiMetricKey;   // 어느 레지스트리 항목에서 포맷·label을 가져올지
  valueField: TMetricApiField;  // 응답에서 "값"을 꺼낼 필드명
  deltaField: TMetricApiField;  // 응답에서 "증감률"을 꺼낼 필드명
}

export const OVERVIEW_KPI_BINDINGS: readonly IOverviewKpiBinding[] = [
  { registryKey: "roas", valueField: "ROAS", deltaField: "ROASChangeRate" },
  { registryKey: "conversion", valueField: "conversion", deltaField: "cvrChangeRate" },
];
```

`TMetricApiField`가 `keyof IMetricsResponse`이기 때문에 응답에 없는 필드명을 오타로 적으면 타입 에러가 납니다. 백엔드 필드명이 바뀌어도 바인딩 한 줄만 고치면 됩니다.

`OVERVIEW_KPI_BINDINGS`를 순회하면 컴포넌트는 레지스트리 키만 참조합니다. API 필드명은 바인딩 배열에만 남습니다.

```tsx
{OVERVIEW_KPI_BINDINGS.map(({ registryKey, valueField, deltaField }) => {
  const meta = METRIC_REGISTRY[registryKey];
  return (
    <KpiCard
      key={registryKey}
      label={meta.kpiLabel}
      value={meta.format(data[valueField])}
      delta={meta.formatDelta(data[deltaField])}
    />
  );
})}
```

## 마무리

![① 백엔드 응답(날것의 숫자) → ② 바인딩이 꺼내고 레지스트리가 포맷 → ③ KPI 카드에 표시](/blog/metric_registry/METRIC_REGISTRY-08.png)

다섯 단계가 하나의 흐름으로 연결됩니다.

흩어진 if 분기를 **레지스트리** 객체 하나로 모으고, 포맷 기준을 표시 위치가 아니라 **값의 타입**에 묶어 통일합니다. 이 객체를 `satisfies`로 타입 검사하면 누락된 필드를 컴파일 타임에 잡으면서도 키 유니온과 리터럴 타입이 보존됩니다.

지표마다 필요한 능력이 다를 때는 **인터페이스 상속 계층**으로 "필요한 것만, 빠짐없이"를 강제합니다. 마지막으로 **API 바인딩 레이어**가 백엔드 필드명과 레지스트리 키를 잇습니다. 백엔드 네이밍이 바뀌어도 컴포넌트는 손댈 필요가 없습니다.

이 작업에서 인터페이스를 먼저 설계하고 구현이 따라오는 순서를 처음으로 의식적으로 적용했습니다. `satisfies`와 상속 계층을 조합하면 지표를 추가할 때 컴파일러가 체크리스트 역할을 합니다. 필드 하나 빠뜨리면 빌드가 실패하고, 통과하면 모든 컴포넌트가 올바른 포맷을 받는다는 보장이 생깁니다. 레지스트리를 도입한 뒤로는 PR에서 "이 지표의 포맷이 맞는가"를 눈으로 추적하는 일이 사라졌습니다.

| 단계 | 해결하는 문제 |
|------|------|
| 레지스트리 | 포맷 규칙이 여러 파일에 흩어져 불일치 발생 |
| 값 타입별 통일 | 같은 종류인데 위치마다 다른 포맷 기준 |
| `satisfies` | 필드 누락·오타를 런타임이 아닌 컴파일에서 검출 |
| 인터페이스 상속 | optional 남용으로 런타임에야 드러나는 누락 |
| API 바인딩 | 백엔드 필드명이 컴포넌트 곳곳으로 새어나감 |

> 규칙을 객체에 모으고(1·2), 그 객체를 TypeScript로 단단하게 만들고(3·4), 바깥 데이터와 안전하게 잇는다(5) — 이 한 흐름입니다.
