import { cn } from "@/app/lib/cn";
import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  spacing?: "tight" | "normal" | "loose";
  divider?: boolean;
  tone?: "default" | "card";
  width?: "wide" | "content";
};

const spacings: Record<NonNullable<Props["spacing"]>, string> = {
  tight: "py-10 sm:py-12",
  normal: "py-14 sm:py-16",
  loose: "py-16 sm:py-20",
};

const widths: Record<NonNullable<Props["width"]>, string> = {
  wide: "max-w-6xl",
  content: "max-w-4xl",
};

const tones: Record<NonNullable<Props["tone"]>, string> = {
  default: "bg-background",
  card: "bg-card",
};

export function Section({
  spacing = "loose",
  divider = false,
  tone = "default",
  width = "wide",
  className,
  children,
  ...props
}: Props) {
  return (
    <section
      className={cn(
        tones[tone],
        spacings[spacing],
        divider ? "border-b border-border" : "",
        className
      )}
      {...props}
    >
      <div className={cn("mx-auto px-6 lg:px-7", widths[width])}>
        {children}
      </div>
    </section>
  );
}
