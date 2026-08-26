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
          .match(/<title>(.*?)<\/title>/s)?.[1]
          ?.replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .trim() ?? "";

      const link = item.match(/<link>(.*?)<\/link>/s)?.[1]?.trim() ?? "";

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1]?.trim() ?? "";
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
    <section id="blog" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Blog</h2>
          <a
            href="https://seojegyeong.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            전체 글 보기 →
          </a>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-12">글을 불러오는 중...</p>
        ) : (
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
            {posts.map((post) => (
              <li key={post.link}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-5 group"
                >
                  <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </span>
                  <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0 ml-6">
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
