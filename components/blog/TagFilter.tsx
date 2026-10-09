"use client";

import { useRouter } from "next/navigation";

type Props = {
  tags: string[];
  selected: string | null;
};

export default function TagFilter({ tags, selected }: Props) {
  const router = useRouter();

  const handleClick = (tag: string) => {
    if (tag === selected) {
      router.push("/blog");
    } else {
      router.push(`/blog?tag=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap mb-10">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleClick(tag)}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
            tag === selected
              ? "bg-brand-blue text-white"
              : "bg-surface-subtle text-text-secondary hover:bg-brand-50 hover:text-brand-blue"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
