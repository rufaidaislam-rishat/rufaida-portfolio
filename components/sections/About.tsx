"use client";

import React from "react";
import { GraduationCap, Brain, Languages, MapPin, Sparkles } from "lucide-react";
import profileData from "@/data/profile.json";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-[#4F46E5]" />,
  Brain: <Brain className="w-6 h-6 text-[#7C3AED]" />,
  Languages: <Languages className="w-6 h-6 text-[#06B6D4]" />,
  MapPin: <MapPin className="w-6 h-6 text-[#10B981]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#F59E0B]" />,
};

export function About() {
  return (
    <AnimatedSection id="about" className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={profileData.about.eyebrow}
          title={profileData.about.title}
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Bio */}
          <div className="lg:col-span-7 space-y-5 text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            {profileData.about.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "text-[#F1F5F9] font-medium leading-relaxed" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column: Information Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {profileData.about.cards.map((card) => {
              const iconElement = ICON_MAP[card.icon] || (
                <Sparkles className="w-6 h-6 text-[#7C3AED]" />
              );

              return (
                <GlassCard
                  key={card.id}
                  className="p-5 sm:p-5 flex items-center gap-4 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                    {iconElement}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-sm sm:text-base tracking-tight truncate">
                        {card.title}
                      </h3>
                      {card.highlight && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5 truncate">
                      {card.subtitle}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
