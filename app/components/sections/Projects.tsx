"use client";

import Link from "next/link";
import { ExternalLink, LayoutDashboard, LayoutGrid } from "lucide-react";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { projects } from "@/app/data/projects";
import type { Project } from "@/app/types";

export function Projects() {
  return (
    <Section id="projects" width="content" spacing="loose" className="pb-32">
      <SectionHeader icon={LayoutDashboard} title="Featured Projects" />

      <div className="space-y-5 mt-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

const MAX_TECH = 3;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visibleTech = project.tech.slice(0, MAX_TECH);
  const remainingTech = project.tech.length - MAX_TECH;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl border border-slate-200 bg-white p-8 md:p-10 space-y-6 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
    >
      {/* Top row: number + date | 상세 보기 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black tracking-[0.15em] text-slate-500 border border-slate-300 px-2.5 py-1 rounded uppercase">
            PROJECT {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {project.period}
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <LayoutGrid size={13} />
          상세 보기
        </span>
      </div>

      {/* Title + Description */}
      <div className="space-y-3">
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {project.title}
        </h3>
        <p className="text-[16px] text-slate-600 leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </div>

      {/* Tags: role + tech + overflow */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {project.role}
        </span>
        {visibleTech.map((t) => (
          <span
            key={t}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white"
          >
            {t}
          </span>
        ))}
        {remainingTech > 0 && (
          <span className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-400 bg-white">
            +{remainingTech}
          </span>
        )}
      </div>

      {/* Key achievement */}
      {project.highlights?.[0] && (
        <p className="text-[15px] text-slate-700 leading-relaxed">
          <span className="font-bold">핵심 성과:</span> {project.highlights[0]}
        </p>
      )}

      {/* Footer: buttons + dev log */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Source Code
            </a>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400">
          <span className="font-mono text-xs">&gt;_</span>
          Dev Log →
        </span>
      </div>
    </Link>
  );
}
