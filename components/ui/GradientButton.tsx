"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  download?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
  "aria-label"?: string;
}

export function GradientButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external = false,
  download = false,
  type = "button",
  disabled = false,
  icon,
  "aria-label": ariaLabel,
}: GradientButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-[#4F46E5]/25 hover:shadow-[#7C3AED]/40 hover:brightness-110 border border-white/20",
    secondary:
      "bg-[#1A1A2E]/80 text-[#F1F5F9] border border-white/10 hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] hover:text-white shadow-sm",
    outline:
      "border border-white/20 text-[#F1F5F9] hover:border-[#06B6D4] hover:text-[#06B6D4] bg-transparent backdrop-blur-sm",
    ghost:
      "text-[#94A3B8] hover:text-white hover:bg-white/5 bg-transparent",
  };

  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const innerContent = (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, "group")}
          aria-label={ariaLabel}
          download={download}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cn(baseStyles, "group")}
        aria-label={ariaLabel}
        download={download}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, "group")}
      aria-label={ariaLabel}
    >
      {innerContent}
    </motion.button>
  );
}
