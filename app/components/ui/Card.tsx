import { cn } from "@/app/lib/cn";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
};

export function Card({ hoverable = false, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm",
        hoverable ? "transition hover:shadow-md" : "",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}
