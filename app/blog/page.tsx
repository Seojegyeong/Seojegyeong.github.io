import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/common/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 | 서제경",
  description: "프론트엔드 개발 경험과 트러블슈팅을 기록합니다.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-28">
        <h1 className="text-3xl font-bold mb-12">블로그</h1>
        <ul className="flex flex-col divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-1 py-5 group sm:flex-row sm:items-start sm:justify-between hover:opacity-80 transition-opacity"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-text-primary font-semibold group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </span>
                  {post.desc && (
                    <span className="text-sm text-text-muted line-clamp-1 break-keep">
                      {post.desc}
                    </span>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-sm text-text-subtle shrink-0 sm:ml-6 sm:pt-0.5">
                  {post.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
