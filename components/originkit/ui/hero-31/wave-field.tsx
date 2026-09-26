"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import ChromaticWaves from "@/components/originkit/ui/hero-31/chromatic-waves";

const DOT_PITCH = (5.33 * 1280) / 1073;

const cellSizeFor = (dpr: number) =>
  Math.min(100, Math.max(1, 1 + ((DOT_PITCH * dpr - 6) * 99) / 54));

export const WaveField = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [cellSize, setCellSize] = useState<number | null>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    setCellSize(cellSizeFor(Math.min(window.devicePixelRatio || 1, 2)));
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    observer.observe(host);
    const sync = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 bg-[#00bcff]"
    >
      {cellSize !== null && (
        <ChromaticWaves
          bgColor="#00bcff"
          colors={["#002fff"]}
          cellSize={1}
          frequency={1}
          gamma={6}
          paletteBias={10}
          speed={0.8}
        />
      )}
    </div>
  );
};
