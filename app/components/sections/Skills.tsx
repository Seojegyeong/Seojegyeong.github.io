import { Code2 } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { skills, skillCategoryLabels } from "@/app/data/skills";

export function Skills() {
  return (
    <Section id="skills" width="content">
      <SectionHeader icon={Code2} title="Skills & Technologies" />

      <div className="rounded-2xl border border-slate-100 bg-white/50 p-6 md:p-10 space-y-7">
        {(Object.keys(skills) as (keyof typeof skills)[]).map((category) => (
          <div
            key={category}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6 items-start border-b border-slate-50 pb-7 last:border-0 last:pb-0"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 pt-1.5">
              {skillCategoryLabels[category]}
            </h3>
            <div className="md:col-span-3 flex flex-wrap gap-2">
              {skills[category].map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "px-3.5 py-1 rounded-lg text-sm font-medium border transition-all",
                    category === "Core"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
