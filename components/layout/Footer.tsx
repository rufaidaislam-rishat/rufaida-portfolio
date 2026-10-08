"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import profileData from "@/data/profile.json";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const emailHref = profileData.personal.email.startsWith("[")
    ? `mailto:rufaidarishat@gmail.com`
    : `mailto:${profileData.personal.email}`;

  const githubHref = profileData.personal.github.replace(/^\[|\]$/g, "");
  const linkedinHref = profileData.personal.linkedin.replace(/^\[|\]$/g, "");

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0A0A0F] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding & Academic note */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="text-lg font-bold font-display tracking-tight text-white hover:text-[#06B6D4] transition-colors"
            >
              {profileData.personal.name}
            </Link>
            <p className="text-xs text-[#94A3B8] mt-1">
              {profileData.personal.academicYear} · {profileData.personal.department}
            </p>
            <p className="text-xs text-[#64748B] mt-0.5">
              {profileData.personal.university}
            </p>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-4">
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl bg-[#12121A] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-[#12121A] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={emailHref}
              aria-label="Send Email"
              className="w-10 h-10 rounded-xl bg-[#12121A] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Right: Back to top */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-[#94A3B8] bg-[#12121A] border border-white/10 hover:border-[#06B6D4]/50 hover:text-white transition-all group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-3">
          <p>{profileData.footer.copyright}</p>
          <p className="font-mono text-[11px] text-[#64748B]">
            {profileData.footer.credit}
          </p>
        </div>
      </div>
    </footer>
  );
}
