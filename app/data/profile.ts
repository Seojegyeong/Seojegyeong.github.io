import type { Profile, Education } from "@/app/types";

export const profile: Profile = {
  name: "Seo Je Gyeong",
  role: "Frontend Developer",
  slogan:
    "React · TypeScript 기반으로\n사용자 흐름과 유지보수성을 고려한 웹 인터페이스를 구현하는\n프론트엔드 개발자입니다.",
  email: "seojk0315@naver.com",
  github: "https://github.com/Seojegyeong",
  linkedIn:
    "https://www.linkedin.com/in/%EC%A0%9C%EA%B2%BD-%EC%84%9C-143372345",
  blog: "https://seojegyeong.tistory.com/",
  location: "Seoul, South Korea",
};

export const education: Education = {
  school: "상명대학교",
  period: "2021.03 — 2027.02",
  degree: [
    { name: "한일문화콘텐츠전공" },
    { name: "컴퓨터과학", info: "복수전공" },
  ],
  graduate: false,
  graduateDate: "2027.02",
  gpa: 3.92,
};
