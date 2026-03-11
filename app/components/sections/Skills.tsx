import { Code2 } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { skills, skillCategoryLabels } from "@/app/data/skills";

export function Skills() {
  return (
    <Section id="skills" width="content" spacing="loose">
      <SectionHeader icon={Code2} title="Skills & Technologies" />

      <div className="rounded-4xl border border-slate-100 bg-white/50 p-8 md:p-10 space-y-5 md:space-y-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
        {(Object.keys(skills) as (keyof typeof skills)[]).map((category) => (
          <div
            key={category}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4 items-start border-b border-slate-50/50 pb-4 last:border-0 last:pb-0"
          >
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pt-2">
              {skillCategoryLabels[category]}
            </h3>
            <div className="md:col-span-3 flex flex-wrap gap-2.5">
              {skills[category].map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-[13px] font-bold border transition-all",
                    category === "Core"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-600 border-slate-100 hover:border-slate-200 hover:text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
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
