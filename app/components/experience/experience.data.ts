export type ExperienceType = "Certification" | "Activity" | "Exchange";

export type ExperienceItem = {
  type: ExperienceType;
  title: string;
  org: string;
  period: string;
  href?: string | null;
};

export const highlights: ExperienceItem[] = [
  {
    type: "Certification",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    period: "2025.01",
  },
  {
    type: "Certification",
    title: "OPIc IH",
    org: "ACTFL",
    period: "2025.01",
  },
  {
    type: "Activity",
    title: "융합공과대학 영상제작동아리 VJ 18기",
    org: "상명대학교",
    period: "2021 — 2023",
  },
  {
    type: "Exchange",
    title: "Computer Science 교환학생",
    org: "Ole Miss · University of Mississippi",
    period: "2024 — 2025",
  },
  {
    type: "Activity",
    title: "UMC WEB 파트 8th",
    org: "University Makeus Challenge",
    period: "2025.03 — 2025.08",
    href: "https://www.makeus.in/umc",
  },
  {
    type: "Activity",
    title: "UMC WEB 파트 9th 활동 중",
    org: "University Makeus Challenge",
    period: "2025.09 — 2025.12",
    href: "https://www.makeus.in/umc",
  },
  {
    type: "Activity",
    title: "잇타 WEB 파트 8th 활동 중",
    org: "It's time",
    period: "2025.09 — 2026.01",
    href: "https://www.makeus.in/umc",
  },
];
