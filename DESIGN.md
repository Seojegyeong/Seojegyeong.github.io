---
name: Seo Je Gyeong Portfolio
description: 침묵하는 프로덕션 오류를 끝까지 추적해, 사용자의 신뢰를 제품에 심는 프론트엔드 개발자 포트폴리오
colors:
  mission-blue: "#002fff"
  kinetic-cyan: "#00bcff"
  mid-blue: "#0050ff"
  brand-50: "#eef2ff"
  brand-100: "#e0eaff"
  surface: "#ffffff"
  surface-subtle: "#f8faff"
  text-primary: "#0a0a14"
  text-secondary: "#374151"
  text-muted: "#6b7280"
  text-subtle: "#9ca3af"
  border: "#e5e7eb"
  border-subtle: "#dde3f0"
typography:
  display:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(32px, 10vw, 84px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "144px"
components:
  tag-primary:
    backgroundColor: "{colors.brand-50}"
    textColor: "{colors.mission-blue}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
    typography: "{typography.label}"
  tag-primary-hover:
    backgroundColor: "{colors.brand-100}"
    textColor: "{colors.mission-blue}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  nav-arrow:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    size: "40px"
  nav-arrow-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.mission-blue}"
    rounded: "{rounded.full}"
    size: "40px"
  contact-icon:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    size: "36px"
  contact-icon-hover:
    backgroundColor: "transparent"
    textColor: "{colors.mission-blue}"
    rounded: "{rounded.full}"
    size: "36px"
---

# Design System: Seo Je Gyeong Portfolio

## Overview

**Creative North Star: "The Signal Depth"**

이 시스템은 표면 아래 깊은 곳에서 정확한 신호를 발신하는 개발자를 시각화한다. 딥 블루의 심연에서 시작해 시안의 파동이 표면으로 부서지는 히어로 배경은 단순한 배경이 아닌 포트폴리오의 논리적 메타포다 — 침묵하는 프로덕션 오류를 끝까지 추적하는 개발자가 작동하는 방식이 그렇다. 보이지 않는 레이어에서 일하며, 결과는 표면에서 명료하게 읽힌다.

바디 섹션은 의도적으로 조용하다. 순백의 배경, 절제된 텍스트 위계, Mission Blue는 인터랙션이나 강조가 필요한 순간에만 등장한다. 이 희소성이 브랜드 블루의 힘을 유지한다. 금융권 채용 담당자가 2–5분 안에 스캔하는 환경에서 정보는 명확하게 분리되고, 시각 소음은 없으며, 신뢰감은 디테일에서 나온다.

Framer Motion 기반 진입 애니메이션은 섬세하고 목적 지향적이다. y축 이동 + 투명도 페이드의 조합으로 콘텐츠가 아래에서 올라오며 자리를 잡는다. 과장하지 않고, 존재를 드러낸다.

**Key Characteristics:**
- 딥 블루 히어로가 첫 뷰포트를 장악하고, 아래 섹션들은 침묵으로 응답한다
- Mission Blue는 인터랙션과 강조 순간에만 등장 — 희소성으로 힘을 유지
- 타이포그래피 위계가 정보 스캔 속도를 제어한다
- 섀도우 없는 평면 시스템 — 깊이는 레이어드 투명도와 border로 표현
- 모든 애니메이션은 `[0.22, 1, 0.36, 1]` 커브로 통일 — 빠른 시작, 부드러운 착지

## Colors

딥 블루와 시안의 이극 구조 위에, 순백 바디가 그것들을 더 강하게 만드는 시스템.

### Primary
- **Mission Blue** (`#002fff`): 히어로 섹션 전체 배경, 프로젝트 태그 텍스트, 인터랙션 강조(hover border·텍스트). 포트폴리오의 선언이자 아이덴티티 컬러. 바디 섹션에서는 인터랙션 시에만 등장해 희소성을 유지한다.
- **Kinetic Cyan** (`#00bcff`): WaveField 배경. 히어로 아래 층에서 운동 에너지를 시각화한다. 인터페이스에 직접 등장하지 않고 웨이브 애니메이션에서만 사용.
- **Mid Blue** (`#0050ff`): WaveField 도트 최대 커버리지 지점. 블루와 시안 사이의 에너지 정점.

### Secondary
- **Brand 50** (`#eef2ff`): 기술 태그 배경, 카드 이미지 플레이스홀더. Mission Blue의 1% 희석 — 태그가 너무 강해지지 않도록 압을 낮추는 역할.
- **Brand 100** (`#e0eaff`): 미세한 강조가 필요한 배경 보조.

### Neutral
- **Surface White** (`#ffffff`): 바디 섹션 전체 배경. 딥 블루 히어로와의 대비를 통해 시각적 전환점을 만든다.
- **Surface Subtle** (`#f8faff`): 모바일 메뉴 배경, 호버 fill. Mission Blue를 극미량 섞은 흰색.
- **Text Primary** (`#0a0a14`): 섹션 제목, 프로젝트 이름, 강조 텍스트. 블루 베이스 극미량 가미.
- **Text Secondary** (`#374151`): 본문, 경험 타이틀.
- **Text Muted** (`#6b7280`): 보조 설명, 날짜, footer 텍스트.
- **Text Subtle** (`#9ca3af`): 기간 표시, 비활성, 플레이스홀더.
- **Border** (`#e5e7eb`): 카드, footer divider.
- **Border Subtle** (`#dde3f0`): 네비게이션 바 하단 border. 브랜드 블루 성분 미세하게 가미.

### Named Rules
**The One-Voice Rule.** Mission Blue(`#002fff`)는 화면당 인터랙션 강조가 필요한 요소에만 쓴다. 태그 텍스트, hover 상태에서 동시에 대량 노출되면 힘을 잃는다.

**The Blank Canvas Rule.** 바디 섹션 배경은 반드시 Surface White(`#ffffff`)다. 히어로의 블루가 강렬할수록 아래 섹션의 흰색이 더 강해진다. 그라디언트·wash·텍스처 금지.

## Typography

**Body Font:** Pretendard (`-apple-system, BlinkMacSystemFont, sans-serif` 폴백)

**Character:** 단일 패밀리가 weight·size·tracking 조합으로 히어로 디스플레이부터 날짜 라벨까지 커버한다. 한국어 최적화된 Pretendard는 장문 기술 설명에서 가독성을 유지하면서 대형 디스플레이 타이틀에서 응집력 있는 임팩트를 낸다.

### Hierarchy
- **Display** (700, `clamp(32px, 10vw, 84px)`, lh 1.1, tracking -0.06em): 히어로 이름 전용. 포트폴리오에서 딱 한 번 사용.
- **Hero Sub** (400, `clamp(18px, 4vw, 44px)`, lh 1.2, tracking -0.03em): 히어로 직함 전용. `white/70` 투명도.
- **Headline** (700, `30px`, lh 1.2): 섹션 제목("경험", "Projects"). Framer Motion 진입 애니메이션과 함께.
- **Body** (400, `14–16px`, lh 1.6): 프로젝트 설명, 경험 desc, 트러블슈팅. 최대 65ch 권장.
- **Label** (500, `12px`): 기술 태그, 기간 표시, 뱃지. 소문자, 특별한 case 없음.

### Named Rules
**The Compression Rule.** 히어로 디스플레이는 자간 -0.06em, 서브는 -0.03em. 바디에는 letter-spacing을 적용하지 않는다. 가독성을 보호하고 위계를 명확히 한다.

**The Single Family Rule.** 새로운 폰트 패밀리를 도입하지 않는다. Pretendard 단일 패밀리로 전체 위계를 처리하는 것이 이 시스템의 결정이다.

## Layout

단일 컬럼, 최대 너비 1024px(`max-w-5xl`) 컨테이너. 히어로만 full-bleed로 돌출된다.

**Container:** 모든 섹션은 `max-w-5xl mx-auto px-6`(24px 양측 padding) 공유.

**Vertical Rhythm:** Experience `py-36`(144px), Projects `py-40`(160px). 섹션 간격이 넉넉해 각 섹션이 독립된 공간으로 인식된다.

**Breakpoints (Originkit 기반):**
- Mobile base: `< 768px` — 단일 컬럼, 패딩 최소화, 네비게이션 햄버거
- `ipad: ≥ 768px` — InfoBand 수평/수직 전환, 데스크톱 nav 등장
- `desktop-sm: ≥ 1280px` — 히어로 타이포 최대 크기, InfoBand 완전 수평

**Spacing Scale:**
- `gap-2` (8px): 태그 그룹 내부
- `gap-3` (12px): 링크 목록, 뱃지+텍스트
- `p-6` (24px): 카드 내부 패딩 표준
- `mb-10` (40px): 섹션 타이틀 아래
- `py-36` / `py-40`: 섹션 상하 padding

## Elevation & Depth

기본적으로 **평면(flat)** 시스템. 그림자는 인터랙션 상태에서만 예외적으로 등장한다. 깊이는 세 수단으로 표현된다:

1. **Border + white bg**: 카드와 버튼은 `border border-border`로 분리. 배경색 대비가 깊이 역할.
2. **Layered opacity**: 네비게이션 바(`bg-white/82 backdrop-blur(12px)`)와 모달 오버레이(`bg-black/60 backdrop-blur-sm`)가 공간감을 만든다.
3. **3D transform (Projects 캐러셀 한정)**: 좌우 카드는 `scale: 0.85, z: -150, opacity: 0.6`으로 perspective 공간에서 물러난다.

### Shadow Vocabulary
- **Nav shadow** (`0 1px 2px rgba(0,0,0,0.05)` — `shadow-sm`): 스크롤 80% 이상 진입 시에만 등장.
- **Arrow shadow** (`shadow-sm`): 프로젝트 캐러셀 화살표 버튼에 항상 적용.

### Named Rules
**The Flat-By-Default Rule.** 모든 카드와 컨테이너는 그림자 없이 시작한다. 깊이가 필요하면 border와 bg 대비를 먼저 쓴다. 그림자는 상태(nav 스크롤)에 반응해서만 등장한다.

## Shapes

부드럽게 곡선 처리된 형태 언어. 날카로운 각도는 없다.

- **Cards / Modal:** `rounded-2xl` (16px) — 프로젝트 카드, 프로젝트 모달 패널
- **Mobile Menu Items:** `rounded-xl` (12px)
- **Tags / Chips:** `rounded-md` (6px) — 기술 스택 태그
- **Icon Buttons:** `rounded-full` (9999px) — 캐러셀 화살표, 연락처 아이콘 버튼
- **Nav Pills:** `rounded-full` — 네비게이션 hover 영역
- **Progress Dots:** `rounded-full` — 캐러셀 인디케이터 (inactive: `w-1.5`, active: `w-6`)

**InfoBand Geometry:** 히어로 하단의 격자 규칙선 + `+` 마크 교차점이 시스템 유일의 직선 형태. 의도적인 대비 — 유기적인 웨이브 위의 구조적 그리드.

## Components

### Navbar
스크롤에 따라 live하게 변형되는 적응형 헤더.
- **Default (hero 위):** 완전 투명, 텍스트는 흰색
- **Scrolled (body 위):** `bg-white/82 backdrop-blur(12px)`, 텍스트는 `#0a0a14`로 전환
- **전환:** `progress`(0→1) 값에 따른 rgba 보간 — 히어로 높이의 40% 기준
- **Nav Link Hover:** `rounded-full` pill 배경이 문맥 투명도로 등장 (hero 위: white/12, body 위: dark/8)
- **Mobile:** 햄버거 → 슬라이드 다운 메뉴, `bg-white/97 backdrop-blur(12px)`, 각 링크 `rounded-xl`

### Project Card
캐러셀 뷰에서 center/side 포지션에 따라 크기·투명도 변화.
- **Container:** `bg-white rounded-2xl border border-border overflow-hidden`
- **Media:** `aspect-video w-full bg-brand-50` — YouTube 썸네일 또는 brand-50 플레이스홀더
- **Body:** `flex flex-col gap-3 p-6`
- **Title:** `font-bold text-lg` (18px, text-primary)
- **Description:** `text-sm text-text-muted leading-relaxed line-clamp-2`
- **Center slot:** `scale: 1, opacity: 1` / **Side slot:** `scale: 0.85, opacity: 0.6, z: -150`

### Tech Tag
순수 레이블. 인터랙션 없음.
- **Style:** `bg-brand-50 text-brand-blue rounded-md px-2 py-1 text-xs font-medium`

### Carousel Arrow
- **Default:** `w-10 h-10 rounded-full bg-white border border-border text-text-secondary shadow-sm`
- **Hover:** `border-brand-blue text-brand-blue` + `scale(1.1)`
- **Tap:** `scale(0.9)`
- **Transition:** 색상만 변환, `transition-colors duration-150`

### Experience Badge
카테고리별 3종 변형.
- **경험:** `bg-brand-50 text-brand-blue rounded-full px-2 py-0.5 text-xs font-medium`
- **자격증:** `bg-surface-subtle text-text-secondary rounded-full px-2 py-0.5 text-xs font-medium`
- **수상:** `bg-amber-50 text-amber-700 rounded-full px-2 py-0.5 text-xs font-medium`

### Contact Icon Button
- **Default:** `w-9 h-9 rounded-full border border-border text-text-muted`
- **Hover:** `border-brand-blue text-brand-blue` + `scale(1.12)`
- **Tap:** `scale(0.92)`

### Project Modal
- **Overlay:** `bg-black/60 backdrop-blur-sm` fixed inset-0
- **Panel:** `bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col`
- **Enter:** `scale: 0.96→1, y: 16→0, opacity: 0→1` (0.25s ease [0.22,1,0.36,1])
- **Media Header:** `bg-gray-950 rounded-t-2xl aspect-video`
- **Close Button:** `rounded-full bg-black/30 hover:bg-black/50 text-white` (absolute top-3 right-3)

## Do's and Don'ts

### Do:
- **Do** 바디 섹션 배경은 항상 `#ffffff`를 유지한다. 히어로의 딥 블루가 전환의 충격으로 작동하려면 아래는 순백이어야 한다.
- **Do** Mission Blue(`#002fff`)는 hover, 강조, 인터랙션 시에만 사용한다. 정적 텍스트 대량 노출은 희소성을 소진시킨다.
- **Do** 진입 애니메이션은 `ease: [0.22, 1, 0.36, 1]`를 기본 커브로 사용한다.
- **Do** 카드 border는 `border-border`(`#e5e7eb`)를 사용한다. 브랜드 색상 border는 hover 상태에서만.
- **Do** 섹션 타이틀(`h2`)은 `text-3xl font-bold` 단일 스타일로 통일한다.
- **Do** 자간 압축(-0.06em, -0.03em)은 히어로 텍스트에만 적용한다.

### Don't:
- **Don't** 바디 섹션 배경에 컬러 그라디언트, wash, 텍스처를 추가한다.
- **Don't** 카드에 `box-shadow`를 추가한다. border + bg 대비가 이 시스템의 깊이 수단이다.
- **Don't** 새로운 폰트 패밀리를 도입한다. Pretendard 단일 패밀리가 이 시스템의 결정이다.
- **Don't** Mission Blue를 버튼 배경 fill로 사용한다. 현재 시스템에 solid blue CTA는 없다.
- **Don't** 애니메이션 duration을 0.5s 이상으로 설정한다(섹션 진입 애니메이션 제외). 채용 담당자가 스크롤하는 환경에서 느린 전환은 방해물이다.
- **Don't** `rounded-none` 또는 직각 모서리를 카드·버튼에 사용한다. 이 시스템에 날카로운 각도는 없다.
