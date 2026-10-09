"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import TagFilter from "./TagFilter";
import type { PostMeta } from "@/lib/posts";

type Props = {
  posts: PostMeta[];
  allTags: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

export default function BlogContent({ posts, allTags }: Props) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const filtered = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  return (
    <>
      <TagFilter tags={allTags} selected={tag} />
      <motion.ul
        key={tag ?? "all"}
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col divide-y divide-border"
      >
        {filtered.map((post) => (
          <motion.li key={post.slug} variants={item}>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2, ease }}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-1 py-5 group sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-text-primary font-semibold group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </span>
                  {post.desc && (
                    <span className="text-sm text-text-muted line-clamp-1 break-keep">
                      {post.desc}
                    </span>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-md bg-brand-50 text-brand-blue font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-sm text-text-subtle shrink-0 sm:ml-8 sm:pt-0.5">
                  {post.date}
                </span>
              </Link>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
      {filtered.length === 0 && (
        <p className="text-text-muted text-sm py-12 text-center">
          해당 태그의 포스트가 없습니다.
        </p>
      )}
    </>
  );
}
