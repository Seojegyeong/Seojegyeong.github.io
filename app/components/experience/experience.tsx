"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../ui/Card";
import { Section } from "../ui/Section";
import { ExperienceType, highlights } from "./experience.data";
import { cn } from "@/app/lib/cn";
import { Calendar, Building2 } from "lucide-react";

function ExperienceTag({ type }: { type: ExperienceType }) {
  const styles: Record<ExperienceType, string> = {
    Certification: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Activity: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Exchange: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-widest",
        styles[type]
      )}
    >
      {type}
    </span>
  );
}

export function Experience() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const count = highlights.length;
  const looped = useMemo(
    () => [...highlights, ...highlights, ...highlights],
    [count]
  );

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];
        if (visible && visible.isIntersecting) {
          const idx = Number((visible.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { root, rootMargin: "0px -30% 0px -30%", threshold: 0.6 }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);

  return (
    <Section id="experience" spacing="loose" className="overflow-hidden">
      <div className="space-y-12">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Experience
          </h2>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-8 overflow-x-auto py-10 snap-x snap-mandatory [scrollbar-width:none]"
          >
            <style>{`div::-webkit-scrollbar{display:none;}`}</style>
            {looped.map((item, loopIdx) => {
              const originalIdx = loopIdx % count;
              const isActive = originalIdx === active;
              return (
                <div
                  key={loopIdx}
                  ref={(el) => {
                    itemRefs.current[loopIdx] = el;
                  }}
                  data-index={originalIdx}
                  className="snap-center shrink-0 w-[85vw] sm:w-[450px] lg:w-[500px]"
                >
                  <Card
                    className={cn(
                      "relative p-8 h-60 flex flex-col justify-between transition-all duration-700 rounded-4xl border-white/10 glass",
                      isActive
                        ? "scale-105 opacity-100 shadow-2xl shadow-primary/10 border-primary/30"
                        : "scale-95 opacity-30 blur-[0.5px]"
                    )}
                  >
                    <div className="relative space-y-5">
                      <div className="flex justify-between items-center">
                        <ExperienceTag type={item.type} />
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground/60">
                          <Calendar className="h-3.5 w-3.5" /> {item.period}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4 opacity-50" /> {item.org}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
