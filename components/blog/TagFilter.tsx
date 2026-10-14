"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  projects: string[];
  selected: string | null;
};

const ALL = "전체";

export default function TagFilter({ projects, selected }: Props) {
  const router = useRouter();
  const options = [ALL, ...projects];
  const current = selected ?? ALL;

  const handleClick = (option: string) => {
    if (option === ALL) {
      router.push("/blog");
    } else {
      router.push(`/blog?project=${encodeURIComponent(option)}`);
    }
  };

  return (
    <div className="flex items-center gap-0.5 p-1 bg-[#f2f3f5] rounded-2xl mb-10 w-fit">
      {options.map((option) => {
        const isSelected = option === current;
        return (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className="relative px-4 py-1.5 text-sm font-medium rounded-xl cursor-pointer transition-colors"
            style={{
              color: isSelected ? "var(--color-text-primary)" : "var(--color-text-muted)",
            }}
          >
            {isSelected && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 bg-white rounded-xl"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.06)" }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
