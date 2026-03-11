import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { projects } from "@/app/data/projects";
import { Badge } from "@/app/components/ui/Badge";
import { Card } from "@/app/components/ui/Card";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Seo Je Gyeong`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 lg:px-8 py-14">
      <div className="mb-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Projects로 돌아가기
        </Link>
      </div>

      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wide">
            {project.isLead ? "Lead Project" : "Project"}
          </span>
          {project.isCore && (
            <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-wide border border-rose-100">
              Core
            </span>
          )}
          <span className="text-sm text-slate-400">{project.period}</span>
          <span className="text-slate-200">·</span>
          <span className="text-sm text-slate-400">{project.role}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          {project.title}
        </h1>

        <p className="text-base text-slate-700 leading-[1.8] max-w-2xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        )}
      </header>

      {/* Problem / Solution */}
      {(project.problem || project.solution) && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.problem && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Problem
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}
          {project.solution && (
            <div className="rounded-xl border border-slate-100 bg-white p-5 space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Solution
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Demo video */}
      {project.videoUrl && (
        <section className="mt-8">
          <div className="rounded-2xl border border-slate-100 overflow-hidden aspect-video">
            <iframe
              src={project.videoUrl}
              title={`${project.title} 시연 영상`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>
      )}

      {/* Main image */}
      <section className="mt-8">
        <Card className="overflow-hidden rounded-2xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} 프로젝트 화면`}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          ) : (
            <div className="w-full aspect-video bg-slate-100 flex items-center justify-center">
              <span className="text-sm font-medium text-slate-400">
                준비 중입니다
              </span>
            </div>
          )}
        </Card>
      </section>

      {/* Slides */}
      {project.slides && project.slides.length > 0 && (
        <section className="mt-6 space-y-4">
          {project.slides.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-100"
            >
              <Image
                src={src}
                alt={`${project.title} 슬라이드 ${i + 1}`}
                width={1600}
                height={900}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          ))}
        </section>
      )}

      {/* Detail sections */}
      <div className="mt-12 space-y-10">
        {project.highlights && project.highlights.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
              Key Implementation
            </h2>
            <ul className="space-y-2.5">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                >
                  <span className="mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-slate-400" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.collaboration && project.collaboration.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
              Collaboration & Quality
            </h2>
            <ul className="space-y-2.5">
              {project.collaboration.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                >
                  <span className="mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-slate-300" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.keyLearning && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
              Key Learning
            </h2>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <p className="text-sm text-slate-700 italic leading-relaxed">
                &ldquo;{project.keyLearning}&rdquo;
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
