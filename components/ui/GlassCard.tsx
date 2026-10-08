"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  clickable?: boolean;
}

export function GlassCard({
  children,
  className,
  glowOnHover = true,
  clickable = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        glowOnHover
          ? {
              y: -4,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-[#12121A]/70 backdrop-blur-md p-6 sm:p-8",
        "transition-all duration-300",
        glowOnHover && "hover:border-[#7C3AED]/50 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.25)]",
        clickable && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Subtle top inner highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl"
      />
      {children}
    </motion.div>
  );
}
