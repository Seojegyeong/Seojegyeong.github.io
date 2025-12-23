import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/cn";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonVariants: Record<ButtonVariant, string> = {
  default: cn(
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90 active:bg-primary/85",
    "shadow-sm"
  ),
  secondary: cn(
    "bg-background/60 text-foreground",
    "border border-border",
    "hover:bg-background/80 active:bg-background/70",
    "backdrop-blur-md"
  ),
  outline: cn(
    "bg-transparent text-foreground",
    "border border-border",
    "hover:bg-background/60 active:bg-background/50",
    "backdrop-blur-md"
  ),
  ghost: cn(
    "bg-transparent text-muted-foreground",
    "hover:bg-background/60 hover:text-foreground",
    "active:bg-background/50",
    "backdrop-blur-md"
  ),

  link: cn("bg-transparent text-primary underline-offset-4", "hover:underline"),
};

const sizeVariants: Record<ButtonSize, string> = {
  default: "h-11 px-5 rounded-xl text-sm font-medium",
  sm: "h-9 px-4 rounded-lg text-sm font-medium",
  lg: "h-12 px-6 rounded-xl text-base font-semibold",
  icon: "h-10 w-10 rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", asChild, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "whitespace-nowrap select-none",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          sizeVariants[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
