export type MediaItem =
  | { type: "youtube"; src: string }
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  media: MediaItem[];
  awards?: string[];
  contributions?: string[];
  troubleshooting?: { problem: string; solution: string }[];
  relatedPosts?: { title: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: "WhereYouAd",
    description:
      "Google·Naver·Meta 광고 성과를 단일 대시보드에 통합하는 B2B SaaS. FE 팀 리더로 axiosInstance·queryClient·인증 레이어 등 인프라 전체 설계 주도.",
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "AWS"],
    github: "https://github.com/WhereYouAd/WhereYouAd-Frontend",
    demo: "",
    media: [{ type: "youtube", src: "https://youtu.be/sTcq1MLCJAY" }],
    awards: [
      "교내 창업아이디어 경진대회 대상",
      "모두의 창업 공모전 1기 본선",
    ],
    contributions: [
      "FE 팀 리더 — axiosInstance·queryClient·queryKeys 인프라 레이어 전체 설계",
      "16개 파일에 분산된 지표 포맷 로직을 METRIC_REGISTRY 단일 SSOT로 통합",
      "Zustand 기반 타입 안전 전역 모달 시스템(ModalProvider) 설계",
    ],
    troubleshooting: [
      {
        problem: "대시보드 진입 시 병렬 API 9개가 동시에 401 → reissue N번 호출",
        solution: "refreshSubscribers 큐 패턴으로 첫 401만 재발급 실행, 나머지는 대기 후 일괄 처리. reissue 9→1회 감소",
      },
      {
        problem: "accessToken을 queryKey에 포함하면 토큰 재발급마다 캐시 파편화",
        solution: "사용자 식별자를 accessToken에서 orgId로 교체하여 캐시 히트율 정상화",
      },
    ],
    relatedPosts: [
      { title: "[Vite] IP로 접속하면 로그인이 자꾸 풀리는 이유 (feat. Secure 쿠키)", url: "https://seojegyeong.tistory.com/8" },
      { title: "[TypeScript] 대시보드 지표 포맷팅, 하나로 흐르게 만들기", url: "https://seojegyeong.tistory.com/7" },
      { title: "[TanStack Query] queryKey 하나로 캐시 이해하기", url: "https://seojegyeong.tistory.com/6" },
      { title: "[Playwright] Cursor와 Playwright로 테스트 자동화 하기", url: "https://seojegyeong.tistory.com/5" },
    ],
  },
  {
    title: "Roome",
    description:
      "취향 기반 인테리어 레퍼런스 피드 + 가구 쇼핑 + AI 챗봇 앱. 피드·쇼핑·온보딩·배포 전담. Masonry 무한 스크롤, Framer Motion 애니메이션 구현.",
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Framer Motion"],
    github: "https://github.com/ITA-Roome/roome-fe",
    demo: "",
    media: [{ type: "youtube", src: "https://youtu.be/hCe5JMVMQxE" }],
    contributions: [
      "FE 2인 팀에서 프로젝트 셋업·API 인프라·Feed/Shop·온보딩·배포 전담 (아키텍처 기반 전체 담당)",
      "axios 인터셉터에서 서버 응답 키 success/isSuccess 혼재 방어 처리",
      "Masonry 무한 스크롤 피드 + 필터·정렬 조합별 독립 캐시 설계",
    ],
    troubleshooting: [
      {
        problem: "Vercel SPA 배포 후 /feed 직접 접속 시 404 발생",
        solution: "routes 대신 rewrites 사용 — URL을 유지하면서 index.html 서빙하여 React Router 정상 동작",
      },
      {
        problem: "서버 응답 키가 success/isSuccess 혼재하여 정상 응답이 에러로 처리",
        solution: "인터셉터에서 두 키를 모두 체크하는 방어 로직 추가",
      },
    ],
  },
  {
    title: "Light",
    description:
      "경제 뉴스 금융 용어를 자동 감지해 호버 툴팁으로 즉시 설명하는 Chrome 확장 프로그램. 프론트(Chrome Extension)부터 백엔드(Node.js + Express + Claude API)까지 1인 풀스택 개발. Chrome Web Store 배포.",
    tags: ["TypeScript", "React", "Chrome Extension", "Claude AI", "Node.js"],
    github: "https://github.com/Seojegyeong/Light",
    demo: "https://chromewebstore.google.com/detail/light/oakngefnlimlmgcoadomekojacbminco",
    media: [{ type: "youtube", src: "https://youtu.be/P0sHsM-qLWU" }],
    contributions: [
      "Shadow DOM에 React 마운트 + Emotion 캐시를 Shadow Root에 바인딩 — 미디어 사이트 전역 CSS·z-index 충돌 완전 격리",
      "TreeWalker + DocumentFragment로 텍스트 노드만 순회 치환 — innerHTML 치환 시 이벤트 리스너 파괴 문제 해결",
      "Node.js + Express + Claude API 백엔드 직접 구축 — 사전 등록 용어는 Map에서 O(1) 반환, 미등록 용어는 Claude AI로 실시간 추출 및 Promise.all 병렬 처리",
    ],
    troubleshooting: [
      {
        problem: "영어 단어 내 부분 문자열이 금융 용어로 오매칭되어 일반 텍스트에 하이라이트 오적용",
        solution: "word boundary lookbehind/lookahead 정규식으로 정밀 매칭 구현하여 오탐 차단",
      },
      {
        problem: "Chrome Storage 비동기 초기화 전 setState 호출로 설정 손실 위험",
        solution: "Storage(영속) / Context(전역) / useState(UI) 3계층 분리 + isLoadedRef 가드로 초기화 전 호출 차단",
      },
    ],
    relatedPosts: [
      { title: "[JS] 크롬 확장 프로그램에서 이벤트를 다루는 방법", url: "https://seojegyeong.tistory.com/9" },
    ],
  },
  {
    title: "WithTime",
    description:
      "AI 기반 커플 데이트 코스 추천 서비스. 설정·공지·FAQ 도메인 전담. Firebase FCM 푸시 알림, 멤버십 등급 시스템 포함.",
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Firebase"],
    github: "",
    demo: "",
    media: [{ type: "youtube", src: "https://youtu.be/oy63--lXUtQ" }],
    contributions: [
      "설정·공지·FAQ 도메인 전담 구현",
      "알람 설정 Optimistic Update + 에러 시 롤백 패턴 구현",
      "EditableInputBox·PasswordEdit·ToggleSwitch 공통 컴포넌트 설계",
    ],
  },
];
