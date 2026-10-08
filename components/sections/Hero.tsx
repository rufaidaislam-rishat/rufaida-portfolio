"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Send } from "lucide-react";
import profileData from "@/data/profile.json";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

// Dynamically import Three.js particle scene for performance and SSR safety
const ParticleScene = dynamic(
  () => import("@/components/three/ParticleScene").then((mod) => mod.ParticleScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),rgba(10,10,15,0))]" />
    ),
  }
);

export function Hero() {
  const emailHref = profileData.personal.email.startsWith("[")
    ? `mailto:rufaidarishat@gmail.com`
    : `mailto:${profileData.personal.email}`;

  const githubHref = profileData.personal.github.replace(/^\[|\]$/g, "");
  const linkedinHref = profileData.personal.linkedin.replace(/^\[|\]$/g, "");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      {/* 3D Particle Scene */}
      <Suspense fallback={null}>
        <ParticleScene />
      </Suspense>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center my-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono text-[#06B6D4] bg-[#12121A]/80 border border-[#06B6D4]/30 backdrop-blur-md mb-6 shadow-sm shadow-[#06B6D4]/10"
        >
          <span>{profileData.hero.eyebrow}</span>
          <span className="inline-block w-2 h-4 bg-[#06B6D4] animate-blink -ml-0.5" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4"
        >
          {profileData.hero.title}
        </motion.h1>

        {/* Subtitle with Animated Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 max-w-3xl"
        >
          <span className="font-display font-semibold text-lg sm:text-2xl md:text-3xl text-gradient tracking-tight">
            {profileData.hero.subtitle}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-10"
        >
          {profileData.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <GradientButton
            href="#projects"
            variant="primary"
            size="lg"
            icon={<ArrowDown className="w-4 h-4" />}
          >
            {profileData.hero.primaryCta.text}
          </GradientButton>

          <GradientButton
            href="#contact"
            variant="secondary"
            size="lg"
            icon={<Send className="w-4 h-4" />}
          >
            {profileData.hero.secondaryCta.text}
          </GradientButton>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-3"
        >
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-11 h-11 rounded-xl bg-[#12121A]/80 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-11 h-11 rounded-xl bg-[#12121A]/80 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={emailHref}
            aria-label="Email Rufaida"
            className="w-11 h-11 rounded-xl bg-[#12121A]/80 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-auto pt-6"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
