import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "서제경 | 프론트엔드 개발자",
  description:
    "프로덕션 오류를 끝까지 추적하는 프론트엔드 개발자 서제경의 포트폴리오. 금융권 IT 직군 채용을 위한 기술 역량·프로젝트·경험을 확인하세요.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
