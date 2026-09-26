import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/blog/BlogList";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="py-36 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">블로그</h2>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            전체 글 보기 <ArrowRight size={14} />
          </Link>
        </div>

        <BlogList posts={posts.slice(0, 5)} />
      </div>
    </section>
  );
}
