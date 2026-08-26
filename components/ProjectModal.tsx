"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const prev = () => setMediaIndex((i) => (i - 1 + project.media.length) % project.media.length);
  const next = () => setMediaIndex((i) => (i + 1) % project.media.length);

  const current = project.media[mediaIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 미디어 슬라이더 */}
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-t-2xl aspect-video flex items-center justify-center overflow-hidden">
          {current.type === "video" ? (
            <video
              src={current.src}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={current.src}
              alt={`${project.title} 이미지 ${mediaIndex + 1}`}
              className="w-full h-full object-contain"
            />
          )}

          {project.media.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.media.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMediaIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition ${
                      i === mediaIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 프로젝트 설명 */}
        <div className="p-8 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-bold text-2xl">{project.title}</h3>
            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>

          <div className="flex gap-3 text-sm font-medium pt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
            >
              GitHub →
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
