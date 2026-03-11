import { Briefcase } from "lucide-react";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { highlights } from "@/app/data/experience";
import type { ExperienceItem } from "@/app/types";

const experiences = highlights.filter((h) => h.type !== "Certification");
const certifications = highlights.filter((h) => h.type === "Certification");

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-2.5 group hover:border-slate-200 transition-all">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {item.period}
        </span>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-wide">
          {item.type}
        </span>
      </div>
      <div className="space-y-0.5">
        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
          {item.title}
        </h4>
        <p className="text-xs font-medium text-slate-500">{item.org}</p>
        {item.desc && (
          <p className="text-xs text-slate-400 pt-1.5 leading-relaxed">{item.desc}</p>
        )}
      </div>
      {item.href && (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-primary transition-colors"
        >
          View More →
        </a>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience" width="content">
      <SectionHeader icon={Briefcase} title="Experience & Certifications" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Activities
          </h3>
          <div className="space-y-3">
            {experiences.map((item) => (
              <ExperienceCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((item) => (
              <ExperienceCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
