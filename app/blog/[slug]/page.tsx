import { getAllPosts, getPostBySlug, extractHeadings } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMermaid from "@/lib/remark-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Callout from "@/components/blog/Callout";
import Intro from "@/components/blog/Intro";
import BlogImage from "@/components/blog/BlogImage";
import CodeBlock from "@/components/blog/CodeBlock";
import MermaidBlock from "@/components/blog/MermaidBlock";
import TableOfContents from "@/components/blog/TableOfContents";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: `${post.title} | 서제경`, description: post.desc };
}

const components = {
  Callout,
  Intro,
  MermaidBlock,
  pre: CodeBlock,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <BlogImage
      src={typeof props.src === "string" ? props.src : undefined}
      alt={props.alt}
    />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm my-6 not-prose">
      <table {...props} className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const headings = extractHeadings(post.content);

  return (
    <main className="min-h-screen bg-white scroll-smooth">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-28">
        <div className="flex gap-16 items-start">
          {/* 목차 */}
          <aside className="hidden xl:flex flex-col w-56 shrink-0 sticky top-28 self-start">
            <Link
              href="/#blog"
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              목록으로
            </Link>
            {headings.length > 0 && <TableOfContents headings={headings} />}
          </aside>

          {/* 본문 */}
          <article className="flex-1 min-w-0 blog-article-fade">
            <header className="mb-10">
              <span className="text-sm text-text-subtle">{post.date}</span>
              <h1 className="text-3xl font-bold leading-snug mb-3">
                {post.title}
              </h1>
            </header>
            <div className="prose prose-neutral max-w-none">
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkMermaid],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-light",
                          keepBackground: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
