import Link from "next/link";
import { Layout } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { projects } from "@/app/data/projects";
import type { Project } from "@/app/types";

export function Projects() {
  return (
    <Section id="projects" width="content" spacing="loose" className="pb-32">
      <SectionHeader icon={Layout} title="Featured Projects" />

      <div className="space-y-8">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 md:p-10 space-y-8 transition-all",
        project.isLead
          ? "border-slate-200 bg-white ring-1 ring-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
          : "border-slate-100 bg-white shadow-sm"
      )}
    >
      <ProjectCardHeader project={project} />
      <ProjectCardAchievements project={project} />
      <ProjectCardFooter project={project} />
    </div>
  );
}

function ProjectCardHeader({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wide">
              {project.isLead ? "Lead Project" : "Project"}
            </span>
            <span className="text-sm font-medium text-slate-500">{project.period}</span>
          </div>
          {project.isCore && (
            <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-wide border border-rose-100">
              Core
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{project.title}</h3>
      </div>

      <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-x-8 gap-y-4 pt-1">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">
            ROLE
          </span>
          <span className="px-3 py-1 rounded-md bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700">
            {project.role}
            {project.isLead && (
              <span className="ml-1.5 text-primary text-[11px] font-semibold uppercase">
                / Lead
              </span>
            )}
          </span>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">
            TECH STACK
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-md bg-white border border-slate-200 text-sm font-medium text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardAchievements({ project }: { project: Project }) {
  const achievements = project.highlights?.slice(0, 3);
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="border-t border-slate-100 pt-6 space-y-3">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        Key Achievements
      </h4>
      <ul className="space-y-2">
        {achievements.map((h) => (
          <li key={h} className="text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
            <span className="mt-[7px] shrink-0 block w-1.5 h-1.5 rounded-full bg-slate-400 flex-none" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCardFooter({ project }: { project: Project }) {
  return (
    <div className="flex justify-between items-center bg-slate-50/60 -mx-6 md:-mx-10 -mb-6 md:-mb-10 px-6 md:px-10 py-4 rounded-b-2xl border-t border-slate-100">
      <Link
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-primary transition-colors group"
      >
        View Case Study
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </Link>
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {project.category}
      </span>
    </div>
  );
}
