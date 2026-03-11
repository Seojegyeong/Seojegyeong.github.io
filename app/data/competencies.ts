import type { Competency } from "@/app/types";

export const competencies: Competency[] = [
  {
    title: "Component-driven UI Development",
    description:
      "React 컴포넌트 기반으로 재사용 가능한 UI 구조를 설계하고, 아토믹 패턴을 적용해 프로젝트 전반의 유지보수성을 높입니다.",
  },
  {
    title: "State & Data Flow Management",
    description:
      "Zustand · TanStack Query로 클라이언트/서버 상태를 분리하여 예측 가능하고 안정적인 데이터 흐름을 구현합니다.",
  },
  {
    title: "Responsive & User-centric Interface",
    description:
      "사용자 흐름을 고려한 직관적인 UI와 반응형 레이아웃으로 다양한 환경에서 일관된 UX를 제공합니다.",
  },
  {
    title: "Collaboration & Quality Control",
    description:
      "GitHub Flow 기반 협업과 코드 리뷰 문화를 통해 팀의 개발 생산성과 코드 품질을 함께 높입니다.",
  },
];
