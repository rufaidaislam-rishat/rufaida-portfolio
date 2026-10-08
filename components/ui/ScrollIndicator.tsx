"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={scrollToAbout}
        aria-label="Scroll down to About section"
        className="flex flex-col items-center gap-2 text-xs font-mono text-[#64748B] hover:text-[#06B6D4] transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-lg p-2"
      >
        <span className="tracking-widest uppercase text-[11px] font-semibold">Scroll</span>
        <div className="relative w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1 group-hover:border-[#06B6D4]/50 transition-colors">
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"
          />
        </div>
        <ChevronDown className="w-4 h-4 -mt-1 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
