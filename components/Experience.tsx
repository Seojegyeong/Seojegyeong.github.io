"use client";

import { motion } from "framer-motion";

type Category = "경험" | "자격증" | "수상";

const items: {
  period: string;
  title: string;
  type: Category;
  href?: string;
  sub?: string;
  desc?: string;
}[] = [
  {
    period: "2025.09 ~ 2026.01",
    title: "잇타(IT's TIME) 8기 WEB",
    type: "경험",
    desc: "FE 개발과 배포를 주도하며 Roome 프로젝트를 완성했습니다.",
  },
  {
    period: "2025.09 ~ 2026.02",
    title: "UMC 9기 WEB 시니어 챌린저",
    type: "경험",
    desc: "시니어 챌린저로서 배포·인프라 등 심화 주제를 학습하며 웹 개발 역량을 높였습니다.",
  },
  {
    period: "2025.03 ~ 2025.08",
    title: "UMC 8기 WEB 주니어 챌린저",
    type: "경험",
    desc: "React·TypeScript 기초를 익히며 WithTime 프로젝트 FE 개발에 참여했습니다.",
  },
  {
    period: "2024.08 ~ 2024.12",
    title: "교환학생 · University of Mississippi",
    type: "경험",
    sub: "Computer Science",
    href: "https://olemiss.edu/",
    desc: "Java와 컴퓨터 구조 CS 전공 수업을 영어 강의 환경에서 이수하며 전 과목 A+를 달성했습니다.",
  },
  {
    period: "2026.09",
    title: "정보처리기사",
    type: "자격증",
    desc: "취득 예정 (2026년 9월) — 소프트웨어 개발·운영 전반을 검증하는 IT 분야 국가기술자격입니다.",
  },
  {
    period: "2025.01",
    title: "AWS Certified Cloud Practitioner",
    type: "자격증",
    desc: "AWS 클라우드 핵심 서비스와 아키텍처를 다루는 공식 자격증을 취득하여 클라우드 기본 지식을 다졌습니다.",
  },
  {
    period: "2025.01",
    title: "OPIc IH",
    type: "자격증",
    desc: "영어 말하기 공인 시험에서 Intermediate High 등급을 취득했습니다.",
  },
  {
    period: "2026",
    title: "상명대학교 교내 창업아이디어 경진대회 대상",
    type: "수상",
    sub: "WhereYouAd",
    desc: "교내 창업 아이디어 경진대회에서 서비스 기획·팜플렛 디자인을 주도하며 대상을 수상했습니다.",
  },
  {
    period: "2026",
    title: "모두의 창업 공모전 1기 선정 · 본선 진출",
    type: "수상",
    sub: "WhereYouAd",
    desc: "중소벤처기업부 주관 창업 프로그램 1기에 선정되어 본선 진출 및 전문가 멘토링을 받았습니다.",
  },
];

function getSortKey(period: string): number {
  const match = period.match(/(\d{4})(?:\.(\d{2}))?/);
  if (!match) return 0;
  return parseInt(match[1]) * 100 + (match[2] ? parseInt(match[2]) : 0);
}

const sorted = [...items].sort((a, b) => getSortKey(b.period) - getSortKey(a.period));

const BADGE: Record<Category, string> = {
  경험: "bg-brand-50 text-brand-blue",
  자격증: "bg-surface-subtle text-text-secondary",
  수상: "bg-amber-50 text-amber-700",
};

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const listItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-3xl font-bold mb-10"
        >
          경험
        </motion.h2>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col gap-9"
        >
          {sorted.map((item) => (
            <motion.li key={item.title} variants={listItem} className="flex flex-col gap-1.5 sm:flex-row sm:gap-5 sm:items-start">
              <div className="flex items-center gap-2 sm:contents">
                <span className="text-xs text-text-subtle shrink-0 sm:text-sm sm:pt-0.5 sm:w-36">
                  {item.period}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 sm:mt-0.5 ${BADGE[item.type]}`}
                >
                  {item.type}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-text-primary hover:text-brand-blue transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span className="font-semibold text-text-primary">{item.title}</span>
                )}
                {item.sub && (
                  <span className="text-xs text-text-subtle">{item.sub}</span>
                )}
                {item.desc && (
                  <span className="text-sm text-text-muted leading-relaxed">{item.desc}</span>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
