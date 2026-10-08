"use client";

import React from "react";
import { Calendar, CheckCircle2, BookOpen, Clock } from "lucide-react";
import profileData from "@/data/profile.json";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function Experience() {
  return (
    <AnimatedSection id="experience" className="relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="EXPERIENCE"
          title="My Learning & Professional Journey"
          description="A transparent timeline of university engineering studies, freelance annotation projects, and practical programming development."
          align="center"
        />

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10 sm:space-y-12">
          {profileData.experience.map((item, index) => {
            const isCurrent = item.status === "Current" || item.period.includes("Present");

            return (
              <div key={item.id || index} className="relative group">
                {/* Glowing Timeline Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#12121A] border-2 border-[#7C3AED] group-hover:border-[#06B6D4] group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-[#06B6D4] animate-ping opacity-75" />
                  )}
                </div>

                {/* Content Card */}
                <GlassCard className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-2.5 py-1 rounded-md border border-[#06B6D4]/20">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>

                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        isCurrent
                          ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                          : "bg-white/[0.05] text-[#94A3B8] border border-white/10"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-[#7C3AED] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-[#94A3B8] mb-4">
                    {item.role}
                  </p>

                  <ul className="space-y-2">
                    {item.details.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-sm text-[#94A3B8] flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0 group-hover:bg-[#06B6D4] transition-colors" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
