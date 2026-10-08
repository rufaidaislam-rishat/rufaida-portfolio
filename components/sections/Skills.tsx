"use client";

import React from "react";
import {
  Tag,
  CheckCircle2,
  ShieldCheck,
  GitFork,
  Languages,
  FileSearch,
  Search,
  Table,
  Code2,
  Cpu,
  Terminal,
  Zap,
} from "lucide-react";
import profileData from "@/data/profile.json";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const SKILL_ICONS: Record<string, React.ReactNode> = {
  Tag: <Tag className="w-5 h-5 text-[#4F46E5]" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-[#06B6D4]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
  GitFork: <GitFork className="w-5 h-5 text-[#7C3AED]" />,
  Languages: <Languages className="w-5 h-5 text-[#F59E0B]" />,
  FileSearch: <FileSearch className="w-5 h-5 text-[#EC4899]" />,
  Search: <Search className="w-5 h-5 text-[#3B82F6]" />,
  Table: <Table className="w-5 h-5 text-[#10B981]" />,
  Code2: <Code2 className="w-5 h-5 text-[#6366F1]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#8B5CF6]" />,
  Terminal: <Terminal className="w-5 h-5 text-[#06B6D4]" />,
  Zap: <Zap className="w-5 h-5 text-[#F59E0B]" />,
};

export function Skills() {
  return (
    <AnimatedSection id="skills" className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="SKILLS"
          title="Skills & Tools I'm Building"
          description="Focusing on human-in-the-loop AI workflows, data quality verification, and foundational engineering programming."
          align="center"
        />

        {/* 3 Columns Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.skills.map((skill, index) => {
            const iconElement = SKILL_ICONS[skill.icon] || (
              <Zap className="w-5 h-5 text-[#7C3AED]" />
            );

            return (
              <GlassCard
                key={skill.id || index}
                className="p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#7C3AED]/40 group-hover:bg-[#7C3AED]/10 transition-colors">
                      {iconElement}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-[#06B6D4] transition-colors mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
