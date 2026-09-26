# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**1차 방문자 — 금융권 대기업·공채 채용 담당자**
KB국민은행·신한은행·하나은행·우리은행·NH농협·카카오뱅크·토스·삼성카드 등 금융사 IT 직군 채용 팀. 짧은 검토 시간 안에 지원자의 기술 역량, 안정성·신뢰성 관련 경험, 보안 감각을 빠르게 판단한다. 포트폴리오를 레주메 보완재 또는 검증 자료로 활용한다. 금융권 특성상 "프로덕션 안정성", "보안", "데이터 정확성"에 민감하게 반응한다.

## Product Purpose

서제경(Seo Je Gyeong)의 프론트엔드 개발자 개인 포트폴리오 사이트.
채용 담당자가 방문했을 때, 기술 역량·프로젝트 기여·문제 해결 방식을 한 페이지에서 파악하고 면접 또는 합격으로 전환하는 것이 성공이다.

## Positioning

"침묵하는 프로덕션 오류를 끝까지 추적해, 사용자의 신뢰를 제품에 심는 개발자."

프로덕션에서 실제로 발생한 침묵 오류(SSE 401, XSS 취약점, SSR 렌더 지연 등)를 데이터·로그 기반으로 끝까지 추적하고 해결한 경험이 핵심 차별점이다. 단순 기능 구현이 아니라 신뢰·품질·안정성에 집착하는 개발자임을 보여준다.

## Operating Context

- 채용 담당자가 레주메와 함께 짧은 시간(2–5분) 안에 스크롤하며 검토
- 모바일보다 데스크톱 환경에서 열람 비중이 높음
- 한국어 콘텐츠가 우선; 영문 이름·직함은 병행 표기
- 취업·이직 준비 목적으로 운영; 채용 시즌에 따라 업데이트 빈도 높음
- 금융권 심사 기준: 보안 감각(XSS·CSP·인증 처리), 안정성(프로덕션 오류 추적·롤백), 정확성(수치 기반 기여 설명)이 일반 IT 기업보다 더 강하게 평가됨

## Capabilities and Constraints

**구현된 섹션 (고정):**
- Hero — 딥 블루 (#002fff) 웨이브 배경, 이름·직함·태그라인, InfoBand
- Experience — 경험·자격증·수상 타임라인
- Projects — 모달 기반 상세 (기여·트러블슈팅·관련 포스트)
- Blog — 기술 블로그 포스트 목록
- GitHub Calendar — 잔디(contribution graph)
- Contact/Footer — GitHub·LinkedIn·이메일

**기술 스택:** Next.js (App Router) + Tailwind CSS v4 + TypeScript + Framer Motion

**보존 제약:**
- 딥 블루 히어로 (#002fff) — 포트폴리오의 첫인상 아이덴티티, 변경 불가
- 한국어 우선 콘텐츠 — 섹션 제목·경험·프로젝트 설명
- 현재 섹션 순서 — Hero → Experience → Projects → Blog → GitHub Calendar → Contact

## Brand Commitments

- 이름: 서제경 / Seo Je Gyeong
- 아이덴티티 컬러: #002fff (딥 블루) + #00bcff (시안) 페어
- 톤: 간결하고 사실 기반; 과장 없음; 기술적 구체성 우선
- 언어: 한국어 우선, 영문 병기 (이름·기술 스택·외부 링크)
- 콘택트: GitHub (Seojegyeong), LinkedIn (jegyeong), Email (seojk0315@naver.com)

## Evidence on Hand

- WhereYouAd — B2B 광고 SaaS; 상명대 창업 아이디어 경진대회 대상, 모두의 창업 1기 본선
- Roome — 인테리어 레퍼런스·가구 쇼핑 앱; 잇타 8기 프로젝트
- Light — Claude AI 기반 경제 뉴스 금융 용어 Chrome 확장; 1인 풀스택
- WithTime — 데이트 코스 추천 서비스; UMC 8기 프로젝트
- 자격증: 정보처리기사, AWS Certified Cloud Practitioner, OPIc IH
- 교환학생: University of Mississippi CS (전 과목 A+)
- 블로그: seojegyeong.tistory.com (기술 포스트 다수)
- GitHub: Seojegyeong

## Product Principles

1. **신뢰는 디테일에서 만들어진다** — 화려한 기능보다 안정성·정확성·엣지케이스 처리를 앞세운다. 금융권이 요구하는 "실수 없는 개발자" 이미지와 직결된다.
2. **기여는 측정 가능해야 한다** — LCP 개선율, 케이스 수, 실제 수치로 기여를 표현한다.
3. **보안은 별도 항목이 아닌 기본값이다** — XSS 방어(CSP·메모리 저장), 인증 처리(SSE 토큰 갱신), 입력 검증 등 보안 감각을 자연스럽게 드러낸다.
4. **채용 담당자의 시간을 존중한다** — 정보 위계를 명확히 해 2–5분 안에 핵심을 파악하게 한다.
5. **성장은 증거로 말한다** — 수상·자격증·교환학생·커뮤니티 활동 등 검증 가능한 사실만 기재한다.

## Accessibility & Inclusion

- WCAG 2.1 AA 준수 목표 (대기업 공채 담당자 대상이므로 표준 접근성 기대)
- aria-expanded / aria-controls 등 시맨틱 마크업 적용 중 (Experience 섹션)
- 이미 구현된 접근성 패턴 유지
