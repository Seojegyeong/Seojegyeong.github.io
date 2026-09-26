"use client";

import { STAGE } from "@/components/originkit/ui/hero-31/stage";

const PLUS =
  "linear-gradient(#fff,#fff) center / 1px 100% no-repeat, linear-gradient(#fff,#fff) center / 100% 1px no-repeat";

const RAIL_LEFT = "left-[16px] ipad:left-[48px] -translate-x-1/2";
const RAIL_RIGHT = "right-[16px] ipad:right-[48px] translate-x-1/2";
const RAIL_CENTRE = "left-1/2 -translate-x-1/2 hidden desktop-sm:block";

const Mark = ({ className }: { className: string }) => (
  <span
    aria-hidden
    style={{ background: PLUS }}
    className={`pointer-events-none absolute size-3 ${className}`}
  />
);

const LABEL = "text-[18px] leading-[1.2] font-medium text-white";

export const InfoBand = () => (
  <section
    aria-label="학력 및 링크"
    className="relative z-10 w-full shrink-0 border-b border-white/40 ipad:border-t desktop-sm:h-80"
  >
    <div className={`${STAGE} h-full desktop-sm:flex`}>
      <div className="pl-5 pr-5 pb-8 ipad:flex ipad:h-72.5 ipad:flex-col ipad:border-b ipad:border-white/40 ipad:pl-14 ipad:pr-14 ipad:pt-8 ipad:pb-8 desktop-sm:h-full desktop-sm:min-w-0 desktop-sm:flex-1 desktop-sm:border-b-0 desktop-sm:border-r desktop-sm:pl-14 desktop-sm:pr-14 desktop-sm:pt-10 desktop-sm:pb-10">
        <p className={`hidden ipad:block ${LABEL}`}>학력</p>
        <div className="flex flex-col gap-2 ipad:mt-auto">
          <p className="text-white/80 text-[16px] font-semibold ipad:text-[16px] leading-normal">
            컴퓨터과학{" "}
            <span className="text-[12px] ipad:text-[13px] text-white/60">
              복수전공
            </span>{" "}
            | 한일문화콘텐츠전공
          </p>
          <p className="text-white/60 text-[13px] ipad:text-[14px]">
            학점 3.91 / 4.5
          </p>
        </div>
      </div>

      <div className="relative flex h-55 flex-col border-t border-white/40 pl-5 pr-5 pt-5 pb-5 ipad:h-72.5 ipad:pl-14 ipad:pr-14 ipad:pt-8 ipad:pb-8 desktop-sm:h-full desktop-sm:min-w-0 desktop-sm:flex-1 desktop-sm:border-t-0 desktop-sm:pl-14 desktop-sm:pr-14 desktop-sm:pt-10 desktop-sm:pb-10">
        <p className={LABEL}>링크</p>
        <ul className="flex flex-col gap-3 mt-auto">
          {[
            { label: "GitHub", href: "https://github.com/Seojegyeong" },
            { label: "Blog", href: "/#blog" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/jegyeong" },
            {
              label: "YouTube",
              href: "https://youtube.com/channel/UCQYWIWTp1ntBK6Z9ecjdj9w",
            },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-150 text-[14px] ipad:text-[16px]"
              >
                <span>{label}</span>
                <span className="text-xs text-white/50 group-hover:text-white transition-colors duration-150">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Mark
          className={`top-0 -translate-y-1/2 desktop-sm:hidden ${RAIL_LEFT}`}
        />
        <Mark
          className={`top-0 -translate-y-1/2 desktop-sm:hidden ${RAIL_RIGHT}`}
        />
      </div>

      <Mark className="top-0 left-12 hidden -translate-x-1/2 -translate-y-1/2 ipad:block" />
      <Mark className="top-0 right-12 hidden translate-x-1/2 -translate-y-1/2 ipad:block" />
      <Mark className={`top-0 -translate-y-1/2 ${RAIL_CENTRE}`} />

      <Mark className={`bottom-0 translate-y-1/2 ${RAIL_LEFT}`} />
      <Mark className={`bottom-0 translate-y-1/2 ${RAIL_RIGHT}`} />
      <Mark className={`bottom-0 translate-y-1/2 ${RAIL_CENTRE}`} />
    </div>
  </section>
);
