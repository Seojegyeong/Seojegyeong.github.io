import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/common/Navbar";
import BlogContent from "@/components/blog/BlogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 | 서제경",
  description: "프론트엔드 개발 경험과 트러블슈팅을 기록합니다.",
};

const PROJECT_ORDER = ["WhereYouAd", "Roome", "Light", "withtime"];

export default function BlogPage() {
  const posts = getAllPosts();

  const projects = Array.from(new Set(posts.map((p) => p.project).filter(Boolean))).sort(
    (a, b) => PROJECT_ORDER.indexOf(a) - PROJECT_ORDER.indexOf(b)
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          홈으로
        </Link>
        <h1 className="text-3xl font-bold mb-8">블로그</h1>
        <Suspense>
          <BlogContent posts={posts} projects={projects} />
        </Suspense>
      </div>
    </main>
  );
}
