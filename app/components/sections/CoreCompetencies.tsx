import { Section } from "@/app/components/ui/Section";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { competencies } from "@/app/data/competencies";

export function CoreCompetencies() {
  return (
    <Section id="competencies" width="content" spacing="normal">
      <div className="space-y-6">
        <SectionLabel label="Core Competencies" heading="핵심 역량" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competencies.map((item) => (
            <div
              key={item.title}
              className="p-6 md:p-8 rounded-2xl border border-slate-100 bg-white space-y-3 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all"
            >
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
