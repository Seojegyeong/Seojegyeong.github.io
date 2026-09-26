import { ReactNode } from "react";

type CalloutType = "tip" | "warning" | "info";

const styles: Record<CalloutType, { wrapper: string; icon: string }> = {
  tip: {
    wrapper: "border-l-4 border-emerald-400 bg-emerald-50 text-emerald-900",
    icon: "💡",
  },
  warning: {
    wrapper: "border-l-4 border-amber-400 bg-amber-50 text-amber-900",
    icon: "⚠️",
  },
  info: {
    wrapper: "border-l-4 border-brand-blue bg-brand-50 text-brand-900",
    icon: "ℹ️",
  },
};

export default function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const { wrapper, icon } = styles[type];
  return (
    <div className={`not-prose flex gap-3 rounded-r-lg px-4 py-3 my-6 text-sm leading-relaxed ${wrapper}`}>
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div>{children}</div>
    </div>
  );
}
