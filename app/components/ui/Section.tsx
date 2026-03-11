import { cn } from "@/app/lib/cn";
import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  spacing?: "tight" | "normal" | "loose";
  width?: "wide" | "content";
};

const spacings: Record<NonNullable<Props["spacing"]>, string> = {
  tight: "py-10 md:py-14",
  normal: "py-14 md:py-20",
  loose: "py-20 md:py-28",
};

const widths: Record<NonNullable<Props["width"]>, string> = {
  wide: "max-w-4xl",
  content: "max-w-5xl",
};

export function Section({
  spacing = "loose",
  width = "wide",
  className,
  children,
  ...props
}: Props) {
  return (
    <section className={cn(spacings[spacing], className)} {...props}>
      <div className={cn("mx-auto px-6 lg:px-8", widths[width])}>
        {children}
      </div>
    </section>
  );
}
