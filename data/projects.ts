export type MediaItem =
  | { type: "youtube"; src: string }
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export type Team =
  | { type: "solo" }
  | { type: "team"; size: number; roles: string[] };

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  media: MediaItem[];
  team?: Team;
  awards?: string[];
  contributions?: string[];
  troubleshooting?: { problem: string; solution: string }[];
  relatedPosts?: { title: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: "WhereYouAd",
    description:
      "Google·Naver·Meta 광고 성과를 단일 대시보드에 통합하고,\nAI 분석 리포트를 생성·저장하는 팀 협업 B2B SaaS.",
    tags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "AWS",
    ],
    github: "https://github.com/WhereYouAd/WhereYouAd-Frontend",
    media: [{ type: "youtube", src: "https://youtu.be/zW1o8vfdBno" }],
    team: { type: "team", size: 6, roles: ["FE 3", "BE 3"] },
    awards: [
      "상명대학교 교내 창업아이디어 경진대회 대상",
      "모두의 창업 1기 선발·본선 진출",
    ],
    contributions: [
      "Skeleton UI 적용으로 다중 API 로딩 빈 화면 문제 해결, LCP 1,180ms → 1,048ms(-11%) 개선",
      "16개 파일에 분산된 지표 포맷 로직을 METRIC_REGISTRY로 단일화, Vitest 51케이스 CI 연동으로 포맷 위반 PR 자동 차단 — 지표 추가 시 1개 파일 수정만으로 전체 화면 자동 반영",
      "Zustand 메모리 저장 + CloudFront Functions CSP 두 레이어로 XSS 방어, Report-Only 검증 후 Enforcing 전환으로 프로덕션 충돌 없이 정책 배포",
      "useCoreQuery · useCoreMutation 공통 추상화로 TanStack Query 보일러플레이트 해소, 팀원 도메인 집중 환경 구축",
      "GitHub Actions 3개 워크플로로 PR 검증(ESLint+빌드) · 배포(S3+CloudFront 무효화) · 시각 회귀(Chromatic) 파이프라인 분리, 코드 품질과 배포 안정성 동시 확보",
    ],
    troubleshooting: [
      {
        problem:
          "Sentry가 포착한 프로덕션 SSE 401 침묵 오류 — SSE가 axios 인터셉터를 우회하는 구조",
        solution:
          "sseRefreshPromise 싱글턴으로 3개 동시 SSE 인스턴스의 중복 reissue를 차단해 강제 로그아웃 방지",
      },
      {
        problem:
          "accessToken localStorage 저장 시 XSS 탈취 위험, 메모리 저장만으로는 스크립트 실행 자체를 막을 수 없음",
        solution:
          "Zustand 메모리 저장 + CloudFront Functions CSP 두 레이어로 스크립트 실행 차단과 탈취 피해 최소화 동시 달성",
      },
      {
        problem:
          "차트 라이브러리 크래시 시 페이지 전체가 흰 화면으로 전환, 정상 위젯 데이터까지 함께 소실",
        solution:
          "전역(404/500) · 컴포넌트(차트/카드) 2단계 Error Boundary로 장애 범위 격리, Sentry 모니터링으로 프로덕션 미처리 오류 실시간 수집 — 차트 크래시 시에도 대시보드 프레임 유지",
      },
    ],
    relatedPosts: [
      {
        title:
          "[Vite] IP로 접속하면 로그인이 자꾸 풀리는 이유 (feat. Secure 쿠키)",
        url: "https://seojegyeong.tistory.com/8",
      },
      {
        title: "[TypeScript] 대시보드 지표 포맷팅, 하나로 흐르게 만들기",
        url: "https://seojegyeong.tistory.com/7",
      },
      {
        title: "[TanStack Query] queryKey 하나로 캐시 이해하기",
        url: "https://seojegyeong.tistory.com/6",
      },
      {
        title: "[Playwright] Cursor와 Playwright로 테스트 자동화 하기",
        url: "https://seojegyeong.tistory.com/5",
      },
    ],
  },
  {
    title: "Roome",
    description:
      "인테리어 취향에 맞는 레퍼런스 피드를 탐색하고,\n가구 쇼핑과 AI 챗봇 상담까지 한 곳에서 제공하는 앱.",
    tags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Framer Motion",
      "Vercel",
    ],
    github: "https://github.com/ITA-Roome/roome-fe",
    media: [{ type: "youtube", src: "https://youtu.be/gwQPsdBpcwI" }],
    team: { type: "team", size: 6, roles: ["PM 1", "FE 2", "BE 3"] },
    contributions: [
      "FE 2인 팀에서 프로젝트 셋업·API 인프라·Feed/Shop·온보딩·배포 전담",
      "필터 조합별 InfiniteData 캐시 낙관적 업데이트로 좋아요·스크랩 4종 즉각 반응 구현, 에러 시 자동 rollback 처리",
      "목록 → 상세 전환 시 initialData 즉시 주입 + initialDataUpdatedAt: 0 stale 처리로 전환 지연 없이 즉시 화면 표시",
      "UT 결과 기반으로 태그 드롭다운·사용 제품 미리보기 UI 직접 제안·구현해 레퍼런스 등록 흐름 개선",
    ],
    troubleshooting: [
      {
        problem:
          "서버 응답 키가 success/isSuccess로 혼재 배포되어 정상 응답이 에러로 처리",
        solution:
          "응답 인터셉터에서 양쪽 키를 모두 확인하는 방어 로직으로 서버 불일치 상태에서도 API 안정성 유지",
      },
      {
        problem:
          "이미지 업로드 시 파일 교체마다 Object URL이 해제되지 않아 메모리 누적",
        solution:
          "useEffect cleanup으로 개별 해제, useRef로 최신 목록 참조해 언마운트 시 일괄 revoke로 누수 차단",
      },
      {
        problem: "Vercel SPA 배포 후 /feed 직접 접속 시 404 발생",
        solution:
          "routes 대신 rewrites 사용 — URL 유지하면서 index.html 서빙해 React Router 정상 동작",
      },
    ],
  },
  {
    title: "Light",
    description:
      "경제 뉴스 금융 용어를 자동 감지해 호버 툴팁으로 즉시 설명하는\nChrome 확장 프로그램.",
    tags: ["TypeScript", "React", "Chrome Extension", "Claude AI", "Node.js"],
    github: "https://github.com/Seojegyeong/Light",
    demo: "https://chromewebstore.google.com/detail/light/oakngefnlimlmgcoadomekojacbminco",
    media: [{ type: "youtube", src: "https://youtu.be/P0sHsM-qLWU" }],
    team: { type: "solo" },
    contributions: [
      "프론트(Chrome Extension)부터 백엔드(Node.js + Express + Claude API)까지 1인 풀스택 개발",
      "Figma MCP + Claude Code로 기획 문서 기반 초안 생성, 자연어 피드백 반복 수정으로 기획·디자인·구현 전 과정 단독 완성",
      "Shadow DOM + Emotion 캐시 바인딩으로 미디어 사이트 전역 CSS·z-index 충돌 완전 격리",
      "사전 등록 용어는 Map O(1) 반환, 미등록 용어는 Claude API + Promise.all 병렬 처리로 API 비용과 응답 속도 동시 최적화",
      "150ms 디바운싱 + 이벤트 위임으로 span 수천 개 개별 리스너를 컨테이너 2개로 축소해 DOM 이벤트 메모리 사용량 최소화",
    ],
    troubleshooting: [
      {
        problem:
          "innerHTML로 텍스트 치환 시 뉴스 페이지의 이벤트 리스너·스크립트 태그가 파괴",
        solution:
          "TreeWalker + NodeFilter로 텍스트 노드만 순회하고 DocumentFragment로 일괄 교체해 DOM 무결성 유지",
      },
      {
        problem:
          "페이지 새로고침마다 설정이 초기화되고 비동기 Race Condition으로 설정 손실 위험",
        solution:
          "Chrome Storage Sync(영속) / React Context(전역) / useState(UI) 3계층 분리 + isLoadedRef로 초기화 전 setSettings 호출 차단",
      },
      {
        problem:
          "영어 단어 내 부분 문자열이 금융 용어로 오매칭되어 일반 텍스트에 하이라이트 오적용",
        solution:
          "word boundary lookbehind/lookahead 정규식으로 정밀 매칭 구현해 오탐 차단",
      },
    ],
    relatedPosts: [
      {
        title: "[JS] 크롬 확장 프로그램에서 이벤트를 다루는 방법",
        url: "https://seojegyeong.tistory.com/9",
      },
    ],
  },
  {
    title: "WithTime",
    description:
      "데이트 취향 테스트로 나만의 데이트 타입을 진단하고,\n날씨와 AI 기반으로 맞춤 데이트 코스를 추천·생성하는 서비스.",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Zustand",
      "Firebase",
    ],
    github: "https://github.com/WithTime12/WithTimeFE",
    media: [{ type: "youtube", src: "https://youtu.be/oy63--lXUtQ" }],
    team: { type: "team", size: 7, roles: ["PM 1", "FE 3", "BE 3"] },
    contributions: [
      "설정·공지·FAQ 도메인 전담 구현, 웹·모바일 네브바 구현",
      "FAQItem에 aria-expanded·aria-controls 적용한 접근성 준수 아코디언 구현",
      "알람 토글 즉시 반응 + 전체 상태 PATCH로 동시 요청 충돌 방지, onError에서 prev 스냅샷 복구로 롤백 구현",
      "EditableInputBox·PasswordEdit·ToggleSwitch 공통 컴포넌트 설계",
    ],
    troubleshooting: [
      {
        problem:
          "ToggleSwitch 내부 isOn과 부모 AlarmSetting 상태가 이중으로 존재해, 에러 시 어디서 롤백해야 하는지 불명확",
        solution:
          "부모에서만 prev 스냅샷 복구(setAlarmSetting(prev))하고, ToggleSwitch는 value prop → useEffect 동기화 구조로 설계해 부모 상태 복구 한 번으로 자식 UI가 자동 롤백되는 단방향 흐름 구성",
      },
      {
        problem:
          "FAQ 검색·목록 모드 전환 시 조건부 훅 호출 구조로는 Rules of Hooks 위반 발생",
        solution:
          "두 훅을 항상 호출하되 enabled 플래그로 실제 요청 제어, keepPreviousData로 전환 중 이전 데이터 유지해 깜빡임 방지",
      },
    ],
  },
];
