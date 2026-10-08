"use client";

import React, { useState } from "react";
import { ExternalLink, Github, BookOpen, Layers, X, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profileData from "@/data/profile.json";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  type: string;
  tags: string[];
  github?: string;
  liveDemo?: string;
  details?: string[];
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <AnimatedSection id="projects" className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="PROJECTS"
          title="Selected Work & Learning Projects"
          description="A transparent display of AI data evaluation routines, bilingual tasks, and engineering coding repositories."
          align="center"
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profileData.projects.map((project) => {
            const hasGithub = Boolean(project.github && project.github.trim() !== "");
            const hasLiveDemo = Boolean(project.liveDemo && project.liveDemo.trim() !== "");

            return (
              <GlassCard
                key={project.id}
                className="flex flex-col justify-between p-7 sm:p-8 group relative overflow-hidden"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono text-[#06B6D4] px-2.5 py-1 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/20">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06]">
                      <Layers className="w-3.5 h-3.5 text-[#7C3AED]" />
                      {project.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#06B6D4] transition-colors mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono text-[#94A3B8] bg-[#1A1A2E]/80 border border-white/5 px-2.5 py-1 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project as ProjectItem)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-[#06B6D4] transition-colors px-3 py-2 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
                  >
                    <BookOpen className="w-4 h-4 text-[#7C3AED]" />
                    <span>View Details</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {hasGithub ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title}`}
                        className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    ) : null}

                    {hasLiveDemo ? (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo for ${project.title}`}
                        className="p-2 rounded-lg text-[#94A3B8] hover:text-[#06B6D4] hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : null}

                    {!hasGithub && !hasLiveDemo && (
                      <span className="text-[11px] font-mono text-[#64748B] italic">
                        {project.type}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              className="relative w-full max-w-2xl rounded-2xl bg-[#12121A] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-8"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono text-[#06B6D4] px-2.5 py-1 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/20">
                    {selectedProject.category}
                  </span>
                  <h3
                    id="modal-project-title"
                    className="text-2xl font-bold font-display text-white mt-3"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
                  aria-label="Close project modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {selectedProject.details && (
                <div className="mb-6 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                    Project Focus & Methodology
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-sm text-[#F1F5F9] flex items-start gap-2.5 leading-relaxed bg-[#1A1A2E]/50 p-3 rounded-xl border border-white/5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {selectedProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono text-[#94A3B8] bg-white/[0.04] px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
