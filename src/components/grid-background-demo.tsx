"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({
  className,
  variant = "dark",
}: {
  className?: string;
  /** `dark` = grid #262626 on black (Fator K section). `light` = zinc grid on white. */
  variant?: "light" | "dark";
}) {
  const grid =
    variant === "dark"
      ? "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
      : "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]";
  const fadeBg = variant === "dark" ? "bg-black" : "bg-white";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("absolute inset-0 [background-size:40px_40px]", grid)} />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
          fadeBg,
        )}
      />
    </div>
  );
}

export default function GridBackgroundDemo() {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <GridBackground variant="light" className="dark:hidden" />
      <GridBackground variant="dark" className="hidden dark:block" />
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl dark:from-neutral-200 dark:to-neutral-500">
        Backgrounds
      </p>
    </div>
  );
}
