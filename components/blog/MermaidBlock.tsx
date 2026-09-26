"use client";

import { useId, useEffect, useRef } from "react";

let initialized = false;

export default function MermaidBlock({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const id = useRef(`mermaid-${reactId.replace(/[^a-z0-9]/gi, "")}`);

  useEffect(() => {
    let cancelled = false;

    import("mermaid")
      .then(({ default: mermaid }) => {
        if (!initialized) {
          mermaid.initialize({ startOnLoad: false });
          initialized = true;
        }
        return mermaid.render(id.current, code);
      })
      .then(({ svg }) => {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      })
      .catch((err) => console.error("Mermaid render error:", err));

    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div
      ref={ref}
      className="flex justify-center overflow-x-auto my-8 not-prose"
    />
  );
}
