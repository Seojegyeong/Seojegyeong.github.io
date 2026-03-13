import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
};

export function SectionHeader({ icon: Icon, title }: Props) {
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-14">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
        <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
      </div>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
        {title}
      </h2>
    </div>
  );
}
