import { StaticImageData } from "next/image";
import WithTimeMain from "../../../public/withtime_main.png";
import RoomeMain from "../../../public/Roome_main.png";
import SMPMain from "../../../public/SMP_main.png";

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  description: string;
  tech: string[];
  image: string | StaticImageData;
  liveUrl?: string;
  githubUrl?: string;

  overview?: string;
  myScope?: string[];
  highlights?: string[];
  challenges?: { title: string; detail: string }[];
  results?: string[];
};

export const projects: Project[] = [
  {
    slug: "SMP",
    title: "SMP",
    period: "2025.03 — 2025.06",
    role: "Frontend Developer",
    description: "위치 기반 실시간 채팅을 통한 커뮤니티 플랫폼",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: SMPMain,
  },
  {
    slug: "withtime",
    title: "WithTime(위티)",
    period: "2025.06 — 2025.08",
    role: "Frontend Developer",
    description: "AI 기반 데이트 코스 추천 서비스",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: WithTimeMain,
    highlights: [
      "개인화 설정(닉네임/비밀번호) 화면 및 플로우 구현",
      "FAQ/공지사항 페이지 구현",
    ],
  },
  {
    slug: "roome",
    title: "Roome",
    period: "2025.06 — 2026.01",
    role: "Frontend Developer",
    description: "AI 기반 인테리어 추천 플랫폼",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: RoomeMain,
    highlights: ["Shop, ", "FAQ/공지사항 페이지 구현"],
  },
];
