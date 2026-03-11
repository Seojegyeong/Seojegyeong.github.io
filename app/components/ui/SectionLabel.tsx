type Props = {
  label: string;
  heading: string;
};

export function SectionLabel({ label, heading }: Props) {
  return (
    <div className="space-y-2 mb-10">
      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
        {heading}
      </h2>
    </div>
  );
}
