// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { InfoBand } from "@/components/originkit/ui/hero-31/info-band";
import { STAGE } from "@/components/originkit/ui/hero-31/stage";
import { WaveField } from "@/components/originkit/ui/hero-31/wave-field";

const FADE_FILL =
  "linear-gradient(to top, #002fff 0, #002fff var(--fade-solid), transparent 100%)";

export const SectionHero = () => (
  <section
    id="hero"
    className="animate-hero-reveal relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-[#002fff]"
  >
    <WaveField />

    <div
      aria-hidden
      style={{ backgroundImage: FADE_FILL }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[567px] [--fade-solid:266px] ipad:h-[629px] ipad:[--fade-solid:264px] desktop-sm:h-[416px] desktop-sm:[--fade-solid:116px]"
    />

    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
      }}
    />

    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-[2] w-full max-w-[1920px] -translate-x-1/2"
    >
      <span className="absolute inset-y-0 left-[16px] w-px bg-white/40 ipad:left-[48px]" />
      <span className="absolute inset-y-0 right-[16px] w-px bg-white/40 ipad:right-[48px]" />
    </div>

    <div
      className={`${STAGE} z-10 flex flex-1 flex-col items-center justify-center pt-16 px-[20px] ipad:px-[56px] text-center`}
    >
      <h1 className="mb-4 font-bold text-[clamp(32px,10vw,42px)] leading-[1.1] tracking-[-0.06em] text-white ipad:text-[68px] desktop-sm:text-[84px]">
        Seo Je Gyeong
      </h1>
      <p className="text-[clamp(18px,4vw,24px)] leading-[1.2] tracking-[-0.03em] text-white/70 ipad:text-[36px] desktop-sm:text-[44px]">
        Frontend Developer
      </p>
      <p className="mt-4 text-[clamp(14px,2vw,17px)] leading-[1.6] text-white/80 ipad:text-[20px] desktop-sm:text-[22px]">
        침묵하는 프로덕션 오류를 끝까지 추적해, 사용자의 신뢰를 제품에 심는 개발자.
      </p>
    </div>

    <InfoBand />

    <div
      aria-hidden
      className="h-[80px] shrink-0 ipad:h-[60px] desktop-sm:h-[64px]"
    />
  </section>
);
