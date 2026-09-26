import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  desc: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

export type Heading = { id: string; text: string; level: number };

export function extractHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .filter((line) => /^## /.test(line))
    .map((line) => {
      const text = line.replace(/^## /, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      return { id, text, level: 2 };
    });
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        desc: data.desc ?? "",
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const filepath = path.join(postsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    desc: data.desc ?? "",
    tags: data.tags ?? [],
    content,
  };
}
