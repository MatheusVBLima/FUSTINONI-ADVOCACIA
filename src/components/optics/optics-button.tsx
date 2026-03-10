import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const opticsButtonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 aria-invalid:border-destructive border border-transparent bg-clip-padding text-xs/relaxed font-medium focus-visible:ring-[2px] aria-invalid:ring-[2px] inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none select-none gap-2! rounded-lg cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-radial-[at_52%_-52%] [text-shadow:0_1px_0_var(--color-primary)] border-primary bg-background from-primary/70 to-primary/95 hover:from-primary/80 hover:to-primary/100 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 border shadow-md shadow-zinc-950/30",
        secondary:
          "shadow-xs bg-linear-to-t hover:to-muted to-sidebar from-muted bg-background border border-zinc-300 shadow-zinc-950/10 text-foreground",
        decorations:
          "shadow-xs hover:bg-muted bg-background border border-zinc-300 shadow-zinc-950/10 text-foreground",
        muted: "bg-muted hover:bg-neutral-200 shadow-zinc-950/10 duration-200 text-foreground",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        ghost: "hover:bg-neutral-200 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        info: "text-white [text-shadow:0_1px_0_var(--color-blue-800)] from-blue-600/85 to-blue-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 border-0 hover:brightness-110 active:brightness-95",
        success:
          "text-white [text-shadow:0_1px_0_var(--color-emerald-800)] from-emerald-600/85 to-emerald-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 border-0 hover:brightness-110 active:brightness-95",
        warning:
          "text-white [text-shadow:0_1px_0_var(--color-amber-800)] from-amber-600/85 to-amber-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 border-0 hover:brightness-110 active:brightness-95",
        destructive:
          "text-white from-destructive to-destructive/85 bg-linear-to-t border border-b-2 border-zinc-950/40 shadow-md shadow-zinc-950/20 border-red-800 ring-1 ring-inset ring-white/25 hover:brightness-110 active:brightness-90",
        raised:
          "[text-shadow:0_1px_0_var(--color-zinc-100)] bg-background hover:bg-zinc-50 border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-0 ring-zinc-300 text-foreground",
        link: "text-primary underline-offset-4 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current hover:after:w-full after:transition-[width] after:duration-150 !px-0 !pb-0 transition-colors",
      },
      size: {
        default: "h-7 gap-1 px-2 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-5 gap-1 rounded-sm px-2 text-[0.625rem] [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-6 gap-1 px-2 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3",
        lg: "h-8 gap-1 px-2.5 text-xs/relaxed [&_svg:not([class*='size-'])]:size-4",
        icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-xs": "size-5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-lg": "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
      animation: {
        all: "active:scale-[0.97] transition-all duration-150",
        colors: "transition-colors duration-150",
        none: "",
        "only-scale": "active:scale-[0.97] transition-scale duration-150",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "all",
    },
  },
);

type OpticsButtonProps = React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof opticsButtonVariants>;

type OpticsButtonPropsWithDecoration = OpticsButtonProps & {
  decorationColor?: string;
};

function OpticsButton({
  className,
  variant = "default",
  size = "default",
  animation = "all",
  decorationColor,
  children,
  ...props
}: OpticsButtonPropsWithDecoration) {
  const hasCustomRender = "render" in props;
  const { nativeButton, ...restProps } = props as OpticsButtonPropsWithDecoration & {
    nativeButton?: boolean;
  };
  const dc = decorationColor ? { backgroundColor: decorationColor } : undefined;

  return (
    <ButtonPrimitive
      data-slot="optics-button"
      nativeButton={nativeButton ?? !hasCustomRender}
      className={cn(
        opticsButtonVariants({ variant, size, animation, className }),
        variant === "decorations" && "relative overflow-visible rounded-none",
      )}
      {...restProps}
    >
      {children}

      {variant === "decorations" && (
        <>
          <div className="absolute -top-[1px] -left-[1px] z-10">
            <div className="relative">
              <div data-optics-decoration style={dc} className="absolute top-0 h-[7px] w-[1px] rounded-full bg-current" />
              <div data-optics-decoration style={dc} className="absolute left-0 h-[1px] w-[7px] rounded-full bg-current" />
            </div>
          </div>
          <div className="absolute -top-[1px] -right-[0px] z-10">
            <div className="relative">
              <div data-optics-decoration style={dc} className="absolute top-0 h-[7px] w-[1px] rounded-full bg-current" />
              <div data-optics-decoration style={dc} className="absolute -left-[6px] h-[1px] w-[7px] rounded-full bg-current" />
            </div>
          </div>
          <div className="absolute -bottom-[0px] -left-[1px] z-10">
            <div className="relative">
              <div data-optics-decoration style={dc} className="absolute -top-[6px] h-[7px] w-[1px] rounded-full bg-current" />
              <div data-optics-decoration style={dc} className="absolute left-0 h-[1px] w-[7px] rounded-full bg-current" />
            </div>
          </div>
          <div className="absolute -right-[0px] -bottom-[0px] z-10">
            <div className="relative">
              <div data-optics-decoration style={dc} className="absolute -top-[6px] h-[7px] w-[1px] rounded-full bg-current" />
              <div data-optics-decoration style={dc} className="absolute -left-[6px] h-[1px] w-[7px] rounded-full bg-current" />
            </div>
          </div>
        </>
      )}
    </ButtonPrimitive>
  );
}

export { OpticsButton, opticsButtonVariants };
