"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/projects/")) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100/80">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-center">
        <div className="flex items-center gap-6">
          <a
            href="#experience"
            className="text-sm font-medium text-slate-500 hover:text-black transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="text-sm font-medium text-slate-500 hover:text-black transition-colors"
          >
            Projects
          </a>
        </div>
      </div>
    </nav>
  );
}
