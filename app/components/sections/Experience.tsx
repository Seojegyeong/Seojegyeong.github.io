import { Briefcase } from "lucide-react";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { highlights } from "@/app/data/experience";
import type { ExperienceItem } from "@/app/types";

const experiences = highlights.filter((h) => h.type !== "Certification");
const certifications = highlights.filter((h) => h.type === "Certification");

function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <div className="relative pl-5 before:absolute before:left-0 before:top-[7px] before:h-full before:w-px before:bg-slate-100 last:before:hidden">
      <span className="absolute left-[-3.5px] top-[7px] block w-2 h-2 rounded-full border-2 border-slate-300 bg-white" />
      <div className="pb-6 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-500">{item.period}</span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 uppercase tracking-wide">
            {item.type}
          </span>
        </div>
        <h4 className="text-[15px] font-bold text-slate-900 leading-snug">{item.title}</h4>
        <p className="text-sm font-medium text-slate-500">{item.org}</p>
        {item.desc && (
          <p className="text-sm text-slate-500 pt-1 leading-relaxed">{item.desc}</p>
        )}
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-primary transition-colors pt-0.5"
          >
            View More →
          </a>
        )}
      </div>
    </div>
  );
}

function CertItem({ item }: { item: ExperienceItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-slate-100 last:border-0">
      <div className="space-y-0.5">
        <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
        <p className="text-xs font-medium text-slate-500">{item.org}</p>
      </div>
      <span className="shrink-0 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
        {item.period}
      </span>
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience" width="content">
      <SectionHeader icon={Briefcase} title="Experience & Certifications" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Activities
          </h3>
          <div>
            {experiences.map((item) => (
              <TimelineItem key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Certifications
          </h3>
          <div className="rounded-xl border border-slate-100 bg-white px-5">
            {certifications.map((item) => (
              <CertItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
