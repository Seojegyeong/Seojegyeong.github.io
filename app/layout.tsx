import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seojegyeong.github.io"),
  title: "서제경 | 프론트엔드 개발자",
  description:
    "프로덕션 오류를 끝까지 추적하는 프론트엔드 개발자 서제경의 포트폴리오. 기술 역량·프로젝트·경험을 확인하세요.",
  openGraph: {
    type: "website",
    url: "https://seojegyeong.github.io",
    siteName: "서제경 포트폴리오",
    title: "서제경 | 프론트엔드 개발자",
    description:
      "프로덕션 오류를 끝까지 추적하는 프론트엔드 개발자 서제경의 포트폴리오. 기술 역량·프로젝트·경험을 확인하세요.",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "서제경 | 프론트엔드 개발자",
    description:
      "프로덕션 오류를 끝까지 추적하는 프론트엔드 개발자 서제경의 포트폴리오. 기술 역량·프로젝트·경험을 확인하세요.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`h-full antialiased ${pretendard.variable}`}>
      <body className={`min-h-full flex flex-col ${pretendard.className}`}>
        {children}
      </body>
    </html>
  );
}
