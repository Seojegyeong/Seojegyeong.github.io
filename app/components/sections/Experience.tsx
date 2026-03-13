import { Briefcase, Download } from "lucide-react";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { highlights } from "@/app/data/experience";
import type { ExperienceItem } from "@/app/types";

const activities = highlights.filter((h) => h.type !== "Certification");
const certifications = highlights.filter((h) => h.type === "Certification");

const TYPE_LABEL: Record<string, string> = {
  Activity: "ACTIVITY",
  Exchange: "EXCHANGE",
  Certification: "CERTIFICATE",
};

function Card({ item }: { item: ExperienceItem }) {
  return (
    <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400 font-medium">{item.period}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200 rounded px-2 py-0.5">
          {TYPE_LABEL[item.type] ?? item.type}
        </span>
      </div>
      <div>
        <h4 className="text-base font-bold text-slate-900 leading-snug">
          {item.title}
        </h4>
        <p className="text-sm text-slate-500 mt-0.5">{item.org}</p>
      </div>
      {item.desc && (
        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
      )}
      {item.fileUrl && (
        <a
          href={item.fileUrl}
          download
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"
        >
          <Download className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience" width="content" spacing="loose">
      <SectionHeader icon={Briefcase} title="Experience & Certifications" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-100">
        <div className="space-y-4 lg:pr-12">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Experience
          </h3>
          <div className="space-y-3">
            {activities.map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:pl-12">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
