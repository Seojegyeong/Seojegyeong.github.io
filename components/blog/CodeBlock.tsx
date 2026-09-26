"use client";

import { HTMLAttributes, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group not-prose">
      <pre {...props} ref={preRef} suppressHydrationWarning />
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded bg-black/5 text-gray-400 hover:bg-black/10 hover:text-gray-700 transition-all"
        aria-label={copied ? "복사됨" : "복사"}
      >
        {copied ? (
          <Check size={14} strokeWidth={1.75} />
        ) : (
          <Copy size={14} strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
