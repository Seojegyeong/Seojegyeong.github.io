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
};

export const projects: Project[] = [
  {
    title: "WhereYouAd",
    description:
      "Google·Naver·Meta 광고 성과를 단일 대시보드에 통합하는 B2B SaaS. FE 팀 리더로 axiosInstance·queryClient·인증 레이어 등 인프라 전체 설계 주도. 558/1210 커밋(46%, 팀 1위). 교내 창업아이디어 경진대회 대상 / 모두의 창업 공모전 1기 본선.",
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "AWS"],
    github: "https://github.com/WhereYouAd/WhereYouAd-Frontend",
    demo: "",
    media: [{ type: "youtube", src: "https://youtu.be/sTcq1MLCJAY" }],
  },
  {
    title: "Roome",
    description:
      "취향 기반 인테리어 레퍼런스 피드 + 가구 쇼핑 + AI 챗봇 앱. 피드·쇼핑·온보딩·배포 전담. Masonry 무한 스크롤, Framer Motion 애니메이션 구현.",
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Framer Motion"],
    github: "https://github.com/ITA-Roome/roome-fe",
    demo: "",
    media: [{ type: "youtube", src: "https://youtu.be/hCe5JMVMQxE" }],
  },
  {
    title: "Light",
    description:
      "경제 뉴스 금융 용어를 자동 감지해 호버 툴팁으로 즉시 설명하는 Chrome 확장 프로그램. Shadow DOM + TreeWalker 기반 DOM 격리, Claude AI 연동, Chrome Web Store 배포.",
    tags: ["TypeScript", "React", "Chrome Extension", "Claude AI", "Node.js"],
    github: "https://github.com/Seojegyeong/Light",
    demo: "https://chromewebstore.google.com/detail/light/oakngefnlimlmgcoadomekojacbminco",
    media: [{ type: "youtube", src: "https://youtu.be/P0sHsM-qLWU" }],
  },
  {
    title: "WithTime",
    description:
      "AI 기반 커플 데이트 코스 추천 서비스. 설정·공지·FAQ 도메인 전담. Firebase FCM 푸시 알림, 멤버십 등급 시스템 포함.",
    tags: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Firebase"],
    github: "",
    demo: "",
    media: [{ type: "youtube", src: "https://youtu.be/oy63--lXUtQ" }],
  },
];
