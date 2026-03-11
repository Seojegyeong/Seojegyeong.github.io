import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
};

export function SectionHeader({ icon: Icon, title }: Props) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white">
        <Icon className="h-4 w-4 text-slate-900" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
    </div>
  );
}
