"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 실패 시 무시
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-xs text-text-muted hover:text-text-primary transition-colors mt-6 pt-5 border-t border-border w-full"
    >
      {copied ? (
        <>
          <Check size={14} strokeWidth={1.75} className="text-brand-blue shrink-0" />
          <span className="text-brand-blue">링크 복사됨</span>
        </>
      ) : (
        <>
          <Link2 size={14} strokeWidth={1.75} className="shrink-0" />
          <span>링크 복사</span>
        </>
      )}
    </button>
  );
}
