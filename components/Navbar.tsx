"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    function update() {
      rafId = null;
      const hero = document.getElementById("hero");
      const threshold = Math.max(
        (hero?.offsetHeight ?? window.innerHeight) * 0.4,
        1,
      );
      setProgress(Math.min(window.scrollY / threshold, 1));
    }

    function onScroll() {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const eased = 1 - Math.pow(1 - progress, 2);

  const textColor = `rgb(${Math.round(255 - 200 * eased)},${Math.round(255 - 190 * eased)},${Math.round(255 - 174 * eased)})`;
  const pillBg = `rgba(${Math.round(255 - 200 * eased)},${Math.round(255 - 190 * eased)},${Math.round(255 - 174 * eased)},${(0.12 - 0.05 * eased).toFixed(3)})`;

  const headerStyle: CSSProperties = {
    backgroundColor: `rgba(255,255,255,${(eased * 0.82).toFixed(3)})`,
    backdropFilter: `blur(${(eased * 12).toFixed(1)}px)`,
    WebkitBackdropFilter: `blur(${(eased * 12).toFixed(1)}px)`,
    borderBottomColor: `rgba(221,227,240,${eased.toFixed(3)})`,
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b h-16 transition-shadow duration-300 ${progress > 0.8 ? "shadow-sm" : ""}`}
        style={headerStyle}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-center">
          {/* Desktop */}
          <nav aria-label="메인 메뉴" className="hidden md:flex items-center gap-3">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="group relative rounded-full px-4 py-1.5 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-1"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  style={{ backgroundColor: pillBg }}
                />
                <span
                  className="relative opacity-90 transition-opacity duration-150 group-hover:opacity-100"
                  style={{ color: textColor }}
                >
                  {label}
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg ml-auto"
          >
            {[
              open ? "translateY(8px) rotate(45deg)" : "none",
              undefined,
              open ? "translateY(-8px) rotate(-45deg)" : "none",
            ].map((transform, i) =>
              i === 1 ? (
                <span
                  key={i}
                  className="block h-0.5 w-5 rounded-full transition-all duration-200"
                  style={{ backgroundColor: textColor, opacity: open ? 0 : 1 }}
                />
              ) : (
                <span
                  key={i}
                  className="block h-0.5 w-5 rounded-full transition-all duration-200 origin-center"
                  style={{ backgroundColor: textColor, transform: transform as string }}
                />
              )
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed left-0 right-0 z-40 md:hidden"
            style={{ top: "64px" }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div
              className="border-b"
              style={{
                backgroundColor: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottomColor: "rgba(221,227,240,1)",
              }}
            >
              <nav aria-label="모바일 메뉴" className="flex flex-col px-4 py-3">
                {links.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-sm font-medium text-text-primary hover:bg-surface-subtle transition-colors duration-150 text-center"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>
    </>
  );
}
