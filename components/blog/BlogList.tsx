"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-text-subtle text-center py-12">
        아직 작성된 포스트가 없습니다.
      </p>
    );
  }

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col divide-y divide-border"
    >
      {posts.map((post) => (
        <motion.li key={post.slug} variants={item}>
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-1 py-5 group sm:flex-row sm:items-start sm:justify-between"
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
              </div>
              <span className="text-sm text-text-subtle shrink-0 sm:ml-6 sm:pt-0.5">
                {post.date}
              </span>
            </Link>
          </motion.div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
