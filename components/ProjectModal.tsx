"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
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

  const toEmbedUrl = (src: string) => {
    const id = src.match(/(?:youtu\.be\/|v=)([^&?/]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : src;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 미디어 슬라이더 */}
        <div className="relative bg-gray-950 rounded-t-2xl aspect-video flex items-center justify-center overflow-hidden">
          {current.type === "youtube" ? (
            <iframe
              src={toEmbedUrl(current.src)}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : current.type === "video" ? (
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
        <div className="p-8 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-bold text-2xl">{project.title}</h3>
            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>

          {/* 수상 */}
          {project.awards && project.awards.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.awards.map((award, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium"
                >
                  <Trophy className="w-3 h-3 shrink-0" />
                  {award}
                </span>
              ))}
            </div>
          )}

          {/* 기여 */}
          {project.contributions && project.contributions.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                기여
              </p>
              <ul className="flex flex-col gap-2">
                {project.contributions.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-gray-300 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 트러블슈팅 */}
          {project.troubleshooting && project.troubleshooting.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                트러블슈팅
              </p>
              <ul className="flex flex-col gap-4">
                {project.troubleshooting.map((item, i) => (
                  <li key={i} className="flex flex-col gap-1 text-sm leading-relaxed">
                    <span className="text-gray-500">{item.problem}</span>
                    <span className="text-gray-800">→ {item.solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 하단 링크 */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:opacity-80 transition"
              >
                Live Demo →
              </a>
            )}

            {project.relatedPosts && project.relatedPosts.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  관련 블로그
                </p>
                <ul className="flex flex-col gap-2">
                  {project.relatedPosts.map((post) => (
                    <li key={post.url}>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-blue-600 transition"
                      >
                        {post.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
