"use client";

import { motion } from "framer-motion";

type Post = { title: string; link: string; date: string };

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export default function BlogList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-text-subtle text-center py-12">
        포스트를 불러올 수 없습니다.{" "}
        <a
          href="https://seojegyeong.tistory.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-blue hover:underline"
        >
          블로그 바로가기 →
        </a>
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
        <motion.li key={post.link} variants={item}>
          <motion.a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 py-5 group sm:flex-row sm:items-center sm:justify-between"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease }}
          >
            <span className="text-text-primary font-semibold group-hover:text-brand-blue transition-colors">
              {post.title}
            </span>
            <span className="text-sm text-text-subtle shrink-0 sm:ml-6">
              {post.date}
            </span>
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
