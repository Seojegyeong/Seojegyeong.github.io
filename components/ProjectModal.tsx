"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectModal({ project, onClose }: Props) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const prev = () => setMediaIndex((i) => (i - 1 + project.media.length) % project.media.length);
  const next = () => setMediaIndex((i) => (i + 1) % project.media.length);

  const current = project.media[mediaIndex];

  const toEmbedUrl = (src: string) => {
    const id = src.match(/(?:youtu\.be\/|v=)([^&?/]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : src;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease }}
        ref={panelRef}
        className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 (항상 우상단 고정) */}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 미디어 슬라이더 */}
        <div className="relative bg-gray-950 rounded-t-2xl aspect-video flex items-center justify-center overflow-hidden shrink-0">
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
                aria-label="이전 미디어"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="다음 미디어"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.media.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`미디어 ${i + 1}로 이동`}
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

        {/* 스크롤 영역 (전체) */}
        <div className="px-8 pb-8 pt-6 flex flex-col gap-8 overflow-y-auto flex-1 min-h-0">
          <div className="flex flex-col gap-3 pr-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-2xl">{project.title}</h3>
              {project.team && (
                <p className="text-xs text-text-subtle">
                  {project.team.type === "solo"
                    ? "개인 프로젝트"
                    : `팀 프로젝트 · ${project.team.size}인 (${project.team.roles.join(" · ")})`}
                </p>
              )}
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md bg-brand-50 text-brand-blue text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

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

          {/* Technical 블록 — 기여 + 트러블슈팅 */}
          {(project.contributions?.length || project.troubleshooting?.length) ? (
            <div className="border-t border-border flex flex-col gap-8 pt-6">
              {project.contributions && project.contributions.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-3">
                    기여
                  </p>
                  <ul className="flex flex-col gap-4">
                    {project.contributions.map((item, i) => (
                      <li key={i} className="text-sm text-text-secondary leading-relaxed break-keep">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.troubleshooting && project.troubleshooting.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-3">
                    트러블슈팅
                  </p>
                  <ul className="flex flex-col gap-3">
                    {project.troubleshooting.map((item, i) => (
                      <li key={i} className="flex flex-col gap-2 text-sm leading-relaxed rounded-xl bg-gray-50 p-4">
                        <div className="flex gap-2 items-start">
                          <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-500">
                            문제
                          </span>
                          <span className="text-text-muted">{item.problem}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-600">
                            해결
                          </span>
                          <span className="text-text-primary">{item.solution}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}

          {/* Links 블록 — 관련 블로그 + 링크 버튼 */}
          {(project.relatedPosts?.length || project.demo || project.github) ? (
            <div className="border-t border-border flex flex-col gap-5 pt-6">
              {project.relatedPosts && project.relatedPosts.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-3">
                    관련 블로그
                  </p>
                  <ul className="flex flex-col gap-2">
                    {project.relatedPosts.map((post) => (
                      <li key={post.url}>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-text-secondary hover:text-brand-blue transition"
                        >
                          {post.title} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(project.demo || project.github) && (
                <div className="flex flex-wrap gap-2 justify-end">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-brand-blue border border-brand-blue px-4 py-1.5 rounded-lg hover:bg-brand-50 transition"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-text-secondary border border-border px-4 py-1.5 rounded-lg hover:bg-surface-subtle hover:text-text-primary transition"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
