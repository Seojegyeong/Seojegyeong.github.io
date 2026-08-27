"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

function getYouTubeThumbnail(src: string): string | null {
  const id = src.match(/(?:youtu\.be\/|v=)([^&?/]+)/)?.[1];
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

function getThumbnail(project: Project): string | null {
  for (const m of project.media) {
    if (m.type === "youtube") return getYouTubeThumbnail(m.src);
    if (m.type === "image") return m.src;
  }
  return null;
}

function CardFace({ project }: { project: Project }) {
  const thumb = getThumbnail(project);
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col h-full">
      <div className="aspect-video w-full bg-brand-50 overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const id = project.media[0].src.match(/(?:youtu\.be\/|v=)([^&?/]+)/)?.[1];
              if (id)
                (e.currentTarget as HTMLImageElement).src =
                  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-brand-50" />
        )}
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3 className="font-bold text-lg">{project.title}</h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
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
    </div>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-40 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-3xl font-bold mb-12"
          >
            프로젝트
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease }}
                role="button"
                tabIndex={0}
                aria-label={`${project.title} 프로젝트 상세 보기`}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-2xl"
                onClick={() => setSelected(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(project);
                  }
                }}
              >
                <CardFace project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProjectModal key="modal" project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
