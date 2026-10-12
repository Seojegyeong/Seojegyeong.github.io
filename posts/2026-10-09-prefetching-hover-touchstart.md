---
title: "hover·touchStart 프리페칭으로 탭 전환 스켈레톤 제거"
date: "2025-11-24"
desc: "Feed·Shop 탭을 전환할 때마다 스켈레톤이 노출되는 문제를, 탭 호버·터치 시점에 prefetchInfiniteQuery를 연결해 클릭 전에 데이터를 미리 요청했다."
tags: ["TanStack Query", "성능최적화"]
---

Roome의 Feed·Shop 탭을 처음 전환하면 스켈레톤 UI가 나타납니다. InfiniteQuery 요청이 완료될 때까지 콘텐츠가 없기 때문입니다. 탭 간 이동이 잦은 앱에서 매번 스켈레톤을 보여주는 것은 UX를 끊깁니다.

## 클릭 전에 이미 의도 신호가 있다

마우스를 탭 아이콘 위에 올리는 순간부터 실제 클릭까지 100~200ms의 시간이 있습니다. 모바일에서는 화면을 터치하는 순간(`touchstart`)과 실제 클릭 이벤트 처리 사이에도 수십 ms 간격이 있습니다. 이 시간 동안 데이터를 미리 요청하면 클릭 시점에 캐시가 준비되어 있을 수 있습니다.

## onMouseEnter·onTouchStart에 prefetchInfiniteQuery 연결

NavLink의 `onMouseEnter`(데스크톱)와 `onTouchStart`(모바일)에 `prefetchInfiniteQuery`를 연결했습니다.

```tsx
// BottomNavigation.tsx / SideNavigation.tsx

function NavItem({ to, label }: { to: string; label: string }) {
  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    if (to === "/feed") {
      queryClient.prefetchInfiniteQuery({
        queryKey: ["feed", "products", defaultFilters],
        queryFn: ({ pageParam = 0 }) => getProducts({ page: pageParam, ...defaultFilters }),
        initialPageParam: 0,
        staleTime: 1000 * 60 * 3, // 3분
      });
    }
    if (to === "/shop") {
      queryClient.prefetchInfiniteQuery({
        queryKey: ["shop", "products", defaultShopFilters],
        queryFn: ({ pageParam = 0 }) => getShopProducts({ page: pageParam, ...defaultShopFilters }),
        initialPageParam: 0,
        staleTime: 1000 * 60 * 3,
      });
    }
  };

  return (
    <NavLink
      to={to}
      onMouseEnter={handlePrefetch}  // 데스크톱: 마우스 호버
      onTouchStart={handlePrefetch}  // 모바일: 터치 시작
    >
      {label}
    </NavLink>
  );
}
```

`staleTime`을 설정하면 캐시가 fresh 상태인 경우 실제 API 요청을 보내지 않습니다. 3분 안에 같은 탭을 두 번 호버해도 첫 번째에만 요청이 발생합니다.

## onTouchStart가 onClick보다 앞서는 이유

모바일 브라우저에서 `touchstart`는 `click` 이벤트보다 수십~수백 ms 먼저 발생합니다. 브라우저는 터치 시작 후 클릭인지 스크롤인지를 판단하는 시간이 있고, 그 다음 `click`을 발생시킵니다. `onTouchStart`에 프리페치를 붙이면 클릭 처리 전에 네트워크 요청이 앞서 나갑니다.

```text
모바일 이벤트 순서:
  touchstart (프리페치 시작) → [50~200ms 후] → click (페이지 전환)
```

페이지 전환이 일어날 때 이미 요청이 진행 중이거나 완료된 상태이므로 스켈레톤이 보이는 시간이 줄어듭니다.

## 앱 마운트 시 모든 탭 데이터를 미리 로드하지 않는 이유

앱이 시작될 때 Feed·Shop 데이터를 모두 prefetch하는 방법도 있습니다. 하지만 사용자가 모든 탭을 방문하리라는 보장이 없습니다. 로그인 후 바로 로그아웃하는 경우, 불필요한 API 요청이 발생합니다. hover·touchstart 시점에만 프리페치하면 클릭 의도가 있는 탭에만 요청을 보냅니다.

<Callout type="tip">
탭 위에 마우스를 올렸다가 다른 곳으로 이동하면 불필요한 API 요청이 발생합니다. `staleTime`으로 중복을 줄일 수 있지만, 의도하지 않은 hover prefetch는 완전히 막기 어렵습니다.
</Callout>

## 정리

| 방식 | 스켈레톤 노출 | 불필요한 요청 |
|------|--------------|--------------|
| 탭 클릭 후 요청 | 항상 노출 | 없음 |
| 앱 마운트 시 전체 prefetch | 없음 | 방문 안 한 탭도 요청 |
| **hover·touchStart prefetch + staleTime** | 최소화 | staleTime으로 제어 |

클릭 의도 신호(hover, touchstart)를 활용해 사용자가 탭을 클릭하기 전에 데이터를 미리 준비했습니다. InfiniteQuery prefetch는 첫 페이지만 가져오므로 스크롤 다운 시 로딩은 여전히 발생하지만, 탭 전환 초기 화면의 스켈레톤은 대부분 사라졌습니다.
