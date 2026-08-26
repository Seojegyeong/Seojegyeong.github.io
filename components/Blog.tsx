type Post = {
  title: string;
  link: string;
  date: string;
};

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://seojegyeong.tistory.com/rss", {
      cache: "force-cache",
    });
    const xml = await res.text();

    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    return items.map((item) => {
      const title =
        item
          .match(/<title>(.*?)<\/title>/)?.[1]
          ?.replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .trim() ?? "";

      const link = item.match(/<link>(.*?)<\/link>/)?.[1]?.trim() ?? "";

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() ?? "";
      const date = pubDate
        ? new Date(pubDate).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";

      return { title, link, date };
    });
  } catch {
    return [];
  }
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <section id="blog" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Blog</h2>
          <a
            href="https://seojegyeong.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            전체 글 보기 →
          </a>
        </div>

        {posts.length === 0 ? (
          <p className="text-text-subtle text-center py-12">글을 불러오는 중...</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {posts.map((post) => (
              <li key={post.link}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-5 group"
                >
                  <span className="text-text-primary font-medium group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </span>
                  <span className="text-sm text-text-subtle shrink-0 ml-6">
                    {post.date}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
