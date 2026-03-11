import type { Project } from "@/app/types";
import WithTimeMain from "../../public/withtime_main.png";
import RoomeMain from "../../public/Roome_main.png";

export const projects: Project[] = [
  {
    slug: "whereyouad",
    title: "WhereYouAd",
    period: "2026.01 — Present",
    role: "Frontend Team Leader",
    isLead: true,
    isCore: true,
    category: "B2B SaaS",
    description:
      "광고 성과 데이터를 분석하고 팀 워크스페이스를 관리하는 B2B SaaS 기반 마케팅 대시보드 서비스",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "React Router",
    ],
    image: "/whereyouad_main.png",
    highlights: [
      "AI 기반 광고 성과 요약(AI Summary) 패널 UI 설계 및 인터랙션 구현",
      "대시보드 KPI 카드 및 Highcharts 기반 데이터 시각화 라이브러리 연동 구현",
      "Zustand와 TanStack Query를 활용하여 서버 상태와 클라이언트 상태를 엄격히 분리한 구조 설계",
      "재사용 가능한 공통 컴포넌트 가이드라인 수립 및 atomic-like 구조 채택으로 개발 생산성 30% 향상",
      "공통 PageHeader 및 Modal, Drawer 등 글로벌 UI 컴포넌트 아키텍처 설계",
    ],
    collaboration: [
      "GitHub Flow 기반 브랜치 전략 및 PR 단위 코드 리뷰 문화 주도",
      "디자이너와 UI 가이드를 조율하여 디자인 시스템 기반의 UI 일관성 확보",
      "금융권 수준의 안정성을 고려한 에러 바운더리 및 에러 핸들링 전략 수립",
    ],
    keyLearning:
      "단순한 기능 구현보다 데이터 흐름의 안정성과 확장 가능한 프론트엔드 아키텍처 설계의 중요성을 경험했습니다.",
  },
  {
    slug: "roome",
    title: "Roome",
    period: "2025.06 — 2026.01",
    role: "Frontend Developer",
    isLead: true,
    category: "Public Service",
    description: "AI 기반 인테리어 큐레이션 및 소셜 네트워킹 플랫폼",
    tech: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    image: RoomeMain,
    highlights: [
      "핀터레스트 스타일의 카드 레이아웃 및 무한 스크롤(Intersection Observer) 기반 피드 구현",
      "사용자 취향 분석을 위한 단계별 온보딩 플로우 및 전환 애니메이션 구현",
      "이미지 업로드 및 미리보기 기능을 포함한 레퍼런스 등록 프로세스 구축",
      "Zustand를 활용한 전역 테마 관리 및 사용자 설정 상태 유지",
    ],
    collaboration: [
      "Jira 기반 태스크 관리 및 백엔드 API 명세 기반의 효율적인 데이터 연동",
    ],
  },
  {
    slug: "withtime",
    title: "WithTime",
    period: "2025.06 — 2025.08",
    role: "Frontend Developer",
    category: "Public Service",
    description: "AI 기반 개인 맞춤형 데이트 코스 추천 서비스",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: WithTimeMain,
    highlights: [
      "개인 프로필 설정 및 비밀번호 변경 등 회원 정보 관리 플로우 구현",
      "시맨틱 마크업을 준수한 FAQ 및 공지사항 접근성 개선 페이지 구현",
      "반응형 웹 디자인 적용으로 모바일 환경 최적화 대응",
    ],
  },
];
