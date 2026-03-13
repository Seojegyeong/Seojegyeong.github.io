import { cn } from "@/app/lib/cn";
import React from "react";

type BadgeVariant = "default" | "outline" | "subtle";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: `
    bg-primary/10 text-primary
  `,
  outline: `
    border border-border/60
    text-muted-foreground
  `,
  subtle: `
    bg-muted/60
    text-muted-foreground
  `,
};

export function Badge({ variant = "subtle", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "rounded-full px-3 py-2",
        "text-[12px] font-medium leading-none",
        "tracking-tight",
        "select-none",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
