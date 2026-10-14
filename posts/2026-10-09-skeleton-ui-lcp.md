---
title: "대시보드 Skeleton UI와 LCP 측정"
date: "2026-05-19"
desc: "통합 대시보드의 6~8개 병렬 API 로딩 중 빈 화면이 오류로 오인되는 문제를 Skeleton UI로 해결하고, perf/no-skeleton 브랜치 비교 측정으로 LCP 1,180ms → 1,048ms(-11%) 수치를 확보했다."
tags: ["성능최적화"]
project: "WhereYouAd"
---

whereYouAd 통합 대시보드는 KPI 카드·트래픽 차트·예산 게이지 등 여러 섹션으로 구성되고, 각 섹션이 독립적으로 API를 요청합니다. 처음 진입하면 6~8개 API가 동시에 실행되는데, 응답이 오기 전까지 각 섹션이 빈 공간으로 표시됐습니다. 실제 사용자 테스트에서 "페이지가 깨진 것 같다"는 피드백이 있었습니다.

## 빈 화면은 레이아웃도 무너뜨린다

콘텐츠 영역에 높이가 잡히지 않으면 API 응답이 도착할 때 요소들이 갑자기 나타나면서 화면이 아래로 밀립니다. 이것이 [CLS(Cumulative Layout Shift)](https://developer.mozilla.org/ko/docs/Glossary/CLS)입니다. 6~8개 API가 각각 다른 시간에 응답하면 레이아웃이 여러 번 흔들려 사용자에게 혼란을 줍니다.

"Skeleton UI를 적용해 LCP가 개선됐다"고 주장하려면 수치가 필요했습니다. 느낌만으로는 설득력이 없습니다.

## Skeleton 컴포넌트 구조

기반이 되는 `Skeleton` 컴포넌트는 회색 박스에 shimmer 애니메이션을 적용한 단순한 구조입니다.

```tsx
// components/common/skeleton/Skeleton.tsx
export function Skeleton({ className, ...props }: ISkeletonProps) {
  return (
    <div
      className={twMerge("animate-shimmer rounded bg-surface-300", className)}
      {...props}
    />
  );
}
```

`animate-shimmer`는 왼쪽에서 오른쪽으로 밝기가 흘러가는 효과입니다. 데이터가 로딩 중임을 사용자에게 자연스럽게 전달합니다.

## Skeleton이 실제 레이아웃을 그대로 반영해야 하는 이유

Skeleton이 CLS를 막으려면 실제 컴포넌트와 **동일한 크기**여야 합니다. 크기가 달라지면 Skeleton → 실제 데이터 전환 시 레이아웃 이동이 발생합니다.

KPI 카드 Skeleton은 실제 `StatCard`와 동일한 padding, border, rounded 값을 그대로 씁니다.

```tsx
// components/dashboard/overview/skeleton/OverviewSkeleton.tsx
export function OverviewKpiCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-surface-100/40 bg-surface-100/80 px-7 py-5 shadow-Soft backdrop-blur-sm">
      <Skeleton className="h-4 w-16" />   {/* 지표명 */}
      <Skeleton className="h-6 w-24" />   {/* 수치 */}
      <Skeleton className="h-6 w-14 rounded-full" />  {/* 증감 뱃지 */}
    </div>
  );
}
```

트래픽 차트 Skeleton은 실제 차트 높이를 상수로 공유해 크기를 맞춥니다.

```tsx
export function OverviewTrafficChartSkeleton() {
  return (
    <Skeleton
      className="w-full rounded-2xl"
      style={{ height: `${OVERVIEW_TRAFFIC_CHART_HEIGHT}px` }}
    />
  );
}
```

## 섹션별 Skeleton 적용 패턴

Overview 대시보드에서는 두 가지 패턴을 혼용했습니다.

**패턴 1 — `isLoading` 조건부 렌더링**

TanStack Query의 `isLoading`으로 Skeleton과 실제 컴포넌트를 교체합니다. KPI 카드·예산 게이지·플랫폼 랭킹 테이블에 적용했습니다.

```tsx
// OverviewKpiSection.tsx
{isKpisLoading
  ? [0, 1, 2, 3].map((i) => <OverviewKpiCardSkeleton key={i} />)
  : kpiList.map((kpi) => <StatCard key={`d-${kpi.title}`} {...kpi} />)
}
```

```tsx
// OverviewPlatformSection.tsx
{isRankingsLoading
  ? <OverviewPlatformRankingSkeleton />
  : <PlatformRoasTable rankings={rankings ?? []} />
}
```

**패턴 2 — `Suspense` fallback**

lazy load된 컴포넌트는 `Suspense`의 `fallback`으로 Skeleton을 전달합니다. `TrafficChart`는 번들 크기 때문에 동적 임포트 대상이라 이 패턴을 사용했습니다.

```tsx
// OverviewKpiSection.tsx
<Suspense fallback={<OverviewTrafficChartSkeleton />}>
  <TrafficChart />
</Suspense>
```

두 패턴 모두 Skeleton의 크기가 실제 컴포넌트와 일치하므로 전환 시 레이아웃 이동이 없습니다.

## LCP 비교 측정 방법

임시 브랜치 `perf/no-skeleton`을 만들어 Skeleton을 제거하고 AuthGuard를 우회한 상태로 빌드했습니다. 동일 조건에서 각 3회 측정해 평균을 비교했습니다.

- **도구**: Chrome DevTools Lighthouse (Navigation, Desktop)
- **대상**: `/dashboard` OverviewDashboard
- **BEFORE**: `perf/no-skeleton` 브랜치
- **AFTER**: `main` 브랜치 (Skeleton 적용)

### 측정 결과

| 지표 | BEFORE | AFTER | 변화 |
|------|--------|-------|------|
| **LCP** | **1,180ms** | **1,048ms** | **−132ms (−11%)** |
| CLS | 0.000172 | 0.000304 | +0.000132 |
| TBT | 54ms | 54ms | 변화 없음 |

[LCP(Largest Contentful Paint)](https://developer.mozilla.org/ko/docs/Glossary/Largest_contentful_paint)는 화면에서 가장 큰 콘텐츠 요소가 렌더된 시점을 뜻합니다. Skeleton이 LCP를 개선하는 이유는 브라우저가 콘텐츠를 인식하는 방식에 있습니다.

빈 화면 상태에서는 LCP를 측정할 대상 자체가 없어 실제 데이터가 도착할 때까지 타이머가 켜진 채로 유지됩니다. Skeleton이 먼저 렌더되면 브라우저는 그 시점을 의미 있는 첫 콘텐츠로 인식해 타이머가 일찍 닫힙니다.

> Skeleton 자체가 LCP 대상이 되어 실제 데이터 도착 전에 측정을 완료한다.

CLS가 소폭 증가한 이유는 Skeleton → 실제 콘텐츠 전환 시 미세한 레이아웃 이동이 발생하기 때문입니다. 둘 다 0.1 기준 대비 사실상 0 수준이라 사용자 체감 영향은 없습니다.

## CI와 로컬 측정 분리 전략

`@lhci/cli`로 PR마다 Lighthouse를 자동화했지만 두 가지 제약이 있었습니다. `/dashboard`는 `AuthGuard`로 보호되어 CI 환경에서 접근할 수 없고, accessToken이 Zustand 메모리에만 존재해 CI에서 주입할 방법이 없습니다. 측정 가능한 `/login` 페이지는 `Login` 컴포넌트도 lazy load 대상이라 GitHub Actions 러너의 느린 CPU에서 LCP가 항상 ~15,000ms를 초과합니다.

이 제약을 우회하는 대신 역할을 나눴습니다. CI에서는 실행 환경 영향을 거의 받지 않는 CLS와 TBT만 `error` 임계값으로 자동 차단하고, LCP는 `warn`으로만 기록합니다. `/dashboard` LCP는 `perf/no-skeleton` 브랜치를 로컬에서 직접 측정하는 방식으로 관리합니다. CI가 잡을 수 있는 지표와 로컬에서 직접 확인해야 하는 지표를 분리한 것입니다.

## 정리

Skeleton UI는 두 가지를 동시에 해결합니다. 사용자에게 로딩 중임을 명확히 알리고, 레이아웃을 미리 잡아 데이터 도착 시 CLS를 방지합니다. LCP 개선 효과는 실측으로 확인했습니다. "체감이 좋아졌다"가 아닌 "LCP 11% 감소"로 말할 수 있습니다.
