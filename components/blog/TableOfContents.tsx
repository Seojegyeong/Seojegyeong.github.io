"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { id: string; text: string; level: number };

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm">
      <ul className="flex flex-col">
        {headings.map(({ id, text }) => (
          <li
            key={id}
            className={`border-l-2 transition-colors ${
              activeId === id ? "border-gray-900" : "border-gray-200"
            }`}
          >
            <a
              href={`#${id}`}
              className={`block py-1.5 pl-3 leading-snug transition-colors ${
                activeId === id
                  ? "text-gray-900 font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
