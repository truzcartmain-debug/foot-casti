import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * V2 button system — one place for every button style on the site.
 * Clean rounded shapes, clear hover / active / disabled states, and
 * primary vs. secondary that read as visually distinct.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight cursor-pointer select-none transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-[1.06] hover:shadow-[0_14px_34px_-10px_color-mix(in_oklab,var(--primary)_65%,transparent)]",
        secondary:
          "bg-secondary/70 text-secondary-foreground border border-border backdrop-blur-sm hover:bg-secondary hover:border-primary/50 hover:text-foreground",
        outline:
          "border border-primary/35 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary/70 hover:text-primary",
        ghost: "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_8px_24px_-12px_var(--destructive)] hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline rounded-md hover:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
