type Props = {
  label: string;
  heading: string;
};

export function SectionLabel({ label, heading }: Props) {
  return (
    <div className="space-y-1 mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <h2 className="text-xl font-bold tracking-tight text-slate-900">{heading}</h2>
    </div>
  );
}
