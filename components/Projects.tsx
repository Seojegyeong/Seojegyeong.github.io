"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;
const CARD_W = 560;
const count = projects.length;

type Slot = "left" | "center" | "right";

const SLOT: Record<Slot, { x: number; scale: number; z: number; opacity: number }> = {
  left:   { x: -330, scale: 0.85, z: -150, opacity: 0.6 },
  center: { x: 0,    scale: 1,    z: 0,    opacity: 1   },
  right:  { x: 330,  scale: 0.85, z: -150, opacity: 0.6 },
};

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
    <div className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col">
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

const cardVariants = {
  enter: (d: number) => ({
    x: d > 0 ? CARD_W + 160 : -(CARD_W + 160),
    scale: 0.85,
    opacity: 0,
    z: -150,
  }),
  exit: (d: number) => ({
    x: d > 0 ? -(CARD_W + 160) : CARD_W + 160,
    scale: 0.72,
    opacity: 0,
    z: -200,
  }),
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState<Project | null>(null);

  const pointerStartX = useRef<number | null>(null);
  const didDrag = useRef(false);
  const lastNav = useRef(0);

  const go = (dir: "left" | "right") => {
    const now = Date.now();
    if (now - lastNav.current < 600) return;
    lastNav.current = now;
    const d = dir === "right" ? 1 : -1;
    setDirection(d);
    setActiveIndex((prev) => (prev + d + count) % count);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    didDrag.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerStartX.current !== null && Math.abs(e.clientX - pointerStartX.current) > 8) {
      didDrag.current = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? go("right") : go("left");
    pointerStartX.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.deltaX > 0 ? go("right") : go("left");
  };

  const visibleCards = ([-1, 0, 1] as const).map((offset) => {
    const idx = (activeIndex + offset + count) % count;
    const slot: Slot = offset === -1 ? "left" : offset === 0 ? "center" : "right";
    return { project: projects[idx], slot, offset };
  });

  return (
    <>
      <section id="projects" className="py-40 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-3xl font-bold text-center"
          >
            Projects
          </motion.h2>
        </div>

        <div
          className="relative"
          style={{ height: 500, perspective: "1200px", touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onWheel={onWheel}
        >
          <motion.button
            onClick={() => go("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-border text-text-secondary shadow-sm hover:border-brand-blue hover:text-brand-blue transition-colors"
            aria-label="이전"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <AnimatePresence initial={false} custom={direction}>
            {visibleCards.map(({ project, slot, offset }) => (
              <motion.div
                key={project.title}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate={SLOT[slot]}
                exit="exit"
                transition={{ duration: 0.45, ease }}
                style={{
                  position: "absolute",
                  width: CARD_W,
                  left: "50%",
                  top: "50%",
                  marginLeft: -CARD_W / 2,
                  marginTop: -250,
                  zIndex: slot === "center" ? 10 : 5,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (didDrag.current) return;
                  if (offset === 0) setSelected(project);
                  else go(offset < 0 ? "left" : "right");
                }}
              >
                <CardFace project={project} />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            onClick={() => go("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-border text-text-secondary shadow-sm hover:border-brand-blue hover:text-brand-blue transition-colors"
            aria-label="다음"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-brand-blue" : "w-1.5 bg-border"
              }`}
            />
          ))}
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
