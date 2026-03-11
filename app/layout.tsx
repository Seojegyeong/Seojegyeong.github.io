import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seo Je Gyeong | Frontend Developer",
  description:
    "React · TypeScript 기반으로 사용자 흐름과 유지보수성을 함께 고려하는 프론트엔드 개발자 서제경의 포트폴리오입니다.",
  openGraph: {
    title: "Seo Je Gyeong | Frontend Developer",
    description:
      "React · TypeScript 기반으로 사용자 흐름과 유지보수성을 함께 고려하는 프론트엔드 개발자입니다.",
    siteName: "Seo Je Gyeong Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
