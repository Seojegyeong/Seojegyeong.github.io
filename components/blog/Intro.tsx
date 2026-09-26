import { ReactNode } from "react";

export default function Intro({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 my-6 text-gray-600 text-sm leading-relaxed">
      {children}
    </div>
  );
}
