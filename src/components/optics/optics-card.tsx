import * as React from "react";

import { cn } from "@/lib/utils";

type OpticsCardProps = React.ComponentProps<"div"> & {
  size?: "default" | "sm";
  decorations?: boolean;
  decorationColor?: string;
};

function OpticsCard({
  className,
  size = "default",
  decorations = false,
  decorationColor = "black",
  children,
  ...props
}: OpticsCardProps) {
  const dc = { backgroundColor: decorationColor };

  return (
    <div
      data-slot="optics-card"
      data-size={size}
      className={cn(
        "ring-foreground/10 bg-card text-card-foreground relative flex flex-col gap-4 overflow-hidden py-4 text-xs/relaxed ring-1 has-[>img:first-child]:pt-0 has-[data-slot=optics-card-footer]:pb-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg group/optics-card rounded-lg",
        decorations && "overflow-visible rounded-none",
        className,
      )}
      {...props}
    >
      {children}

      {decorations && (
        <>
          <div className="absolute -top-[1px] -left-[1px] z-10">
            <div className="relative">
              <div style={dc} className="absolute top-0 h-[10px] w-[1px] rounded-full" />
              <div style={dc} className="absolute left-0 h-[1px] w-[10px] rounded-full" />
            </div>
          </div>
          <div className="absolute -top-[1px] -right-[0px] z-10">
            <div className="relative">
              <div style={dc} className="absolute top-0 h-[10px] w-[1px] rounded-full" />
              <div style={dc} className="absolute -left-[9px] h-[1px] w-[10px] rounded-full" />
            </div>
          </div>
          <div className="absolute -bottom-[0px] -left-[1px] z-10">
            <div className="relative">
              <div style={dc} className="absolute -top-[9px] h-[10px] w-[1px] rounded-full" />
              <div style={dc} className="absolute left-0 h-[1px] w-[10px] rounded-full" />
            </div>
          </div>
          <div className="absolute -right-[0px] -bottom-[0px] z-10">
            <div className="relative">
              <div style={dc} className="absolute -top-[9px] h-[10px] w-[1px] rounded-full" />
              <div style={dc} className="absolute -left-[9px] h-[1px] w-[10px] rounded-full" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function OpticsCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="optics-card-header"
      className={cn(
        "group/optics-card-header @container/optics-card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-4 has-data-[slot=optics-card-action]:grid-cols-[1fr_auto] has-data-[slot=optics-card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/optics-card:[.border-b]:pb-3 group-data-[size=sm]/optics-card:px-3",
        className,
      )}
      {...props}
    />
  );
}

function OpticsCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="optics-card-title" className={cn("text-sm font-medium", className)} {...props} />;
}

function OpticsCardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="optics-card-description"
      className={cn("text-muted-foreground text-xs/relaxed", className)}
      {...props}
    />
  );
}

function OpticsCardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="optics-card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function OpticsCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="optics-card-content"
      className={cn("px-4 group-data-[size=sm]/optics-card:px-3", className)}
      {...props}
    />
  );
}

type OpticsCardFooterProps = React.ComponentProps<"div"> & {
  background?: boolean;
};

function OpticsCardFooter({
  className,
  background = false,
  children,
  ...props
}: OpticsCardFooterProps) {
  return (
    <div
      data-slot="optics-card-footer"
      className={cn(
        "flex h-full items-center rounded-b-lg p-4 [.border-t]:pt-4 -mb-4 group-data-[size=sm]/optics-card:[.border-t]:pt-3 group-data-[size=sm]/optics-card:px-3 group-data-[size=sm]/optics-card:pb-3",
        background &&
          "bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)] relative border-t p-3!",
        className,
      )}
      {...props}
    >
      {children}

      {background && (
        <>
          <div className="absolute -top-[1px] -left-[1px] z-10">
            <div className="relative">
              <div className="bg-black absolute -top-[6px] h-[12px] w-[1px] rounded-full" />
              <div className="bg-black absolute left-0 h-[1px] w-[10px] rounded-full" />
            </div>
          </div>
          <div className="absolute -top-[1px] -right-[0px] z-10">
            <div className="relative">
              <div className="bg-black absolute -top-[6px] h-[12px] w-[1px] rounded-full" />
              <div className="bg-black absolute -left-[9px] h-[1px] w-[10px] rounded-full" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export {
  OpticsCard,
  OpticsCardHeader,
  OpticsCardFooter,
  OpticsCardTitle,
  OpticsCardAction,
  OpticsCardDescription,
  OpticsCardContent,
};
