"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 504 : -504,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <h2 className="text-3xl font-bold text-center">Projects</h2>
        </div>

        <div className="flex items-center gap-4 px-6 max-w-5xl mx-auto">
          <button
            onClick={() => scroll("left")}
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400"
            aria-label="이전"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          >
            {projects.map((project) => (
              <button
                key={project.title}
                onClick={() => setSelected(project)}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col gap-5 shrink-0 w-[480px] snap-start text-left cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 transition"
              >
                <h3 className="font-bold text-xl">{project.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400"
            aria-label="다음"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
