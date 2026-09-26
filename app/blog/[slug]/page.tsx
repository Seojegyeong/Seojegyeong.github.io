import { getAllPosts, getPostBySlug, extractHeadings } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import Callout from "@/components/blog/Callout";
import Intro from "@/components/blog/Intro";
import BlogImage from "@/components/blog/BlogImage";
import CodeBlock from "@/components/blog/CodeBlock";
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
  pre: CodeBlock,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <BlogImage src={typeof props.src === "string" ? props.src : undefined} alt={props.alt} />
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
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-28">
        <div className="flex gap-16 items-start">
          {/* 목차 — 데스크탑만 표시 */}
          <aside className="hidden xl:flex flex-col w-56 shrink-0 sticky top-28 self-start">
            <Link
              href="/#blog"
              className="text-sm text-text-muted hover:text-text-primary transition-colors mb-6 inline-block"
            >
              ← 목록으로
            </Link>
            {headings.length > 0 && <TableOfContents headings={headings} />}
          </aside>

          {/* 본문 */}
          <article className="flex-1 min-w-0">
            <header className="mb-10">
              <h1 className="text-3xl font-bold leading-snug mb-3">{post.title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-text-subtle">{post.date}</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            <div className="prose prose-neutral max-w-none">
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
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
