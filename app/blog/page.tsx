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

export default function BlogPage() {
  const posts = getAllPosts();

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))
    .filter((tag) => posts.filter((p) => p.tags.includes(tag)).length >= 2)
    .sort((a, b) => {
      const countA = posts.filter((p) => p.tags.includes(a)).length;
      const countB = posts.filter((p) => p.tags.includes(b)).length;
      return countB - countA;
    });

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
          <BlogContent posts={posts} allTags={allTags} />
        </Suspense>
      </div>
    </main>
  );
}
