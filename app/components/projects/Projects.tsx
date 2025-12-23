"use client";
import Image from "next/image";
import Link from "next/link";

import { projects } from "./Projects.data";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export function Projects() {
  return (
    <Section id="projects" spacing="loose">
      <div className="space-y-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2"></div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Main Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block relative focus-visible:outline-none"
    >
      <Card
        hoverable
        className="
          h-full flex flex-col glass overflow-hidden border-border/40
          transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5
        "
      >
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-lg bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
              {p.role}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-muted-foreground/80">
                {p.period}
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {p.title}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2 min-h-12">
            {p.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <Badge
                key={t}
                className="
                  bg-muted/50 text-muted-foreground border-none text-[10px] px-2.5 py-0.5
                  group-hover:bg-primary/10 group-hover:text-primary transition-colors
                "
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
