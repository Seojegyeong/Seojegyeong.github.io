import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { projects } from "@/app/components/projects/Projects.data";
import { Badge } from "@/app/components/ui/Badge";
import { Card } from "@/app/components/ui/Card";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 lg:px-8 py-14">
      <div className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Projects로 돌아가기
        </Link>
      </div>

      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{project.period}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{project.role}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-7">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline" className="bg-background/40">
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground
                         hover:opacity-95 transition
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold
                         hover:bg-card transition
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </header>

      <section className="mt-10">
        <Card className="overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={`${project.title} cover`}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
        </Card>
      </section>

      <div className="mt-12 space-y-10">
        {project.highlights?.length ? (
          <section>
            <h2 className="text-lg font-semibold">Highlights</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {project.highlights.map((h) => (
                <li key={h} className="leading-7">
                  • {h}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
