"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown, ArrowUpRight } from "lucide-react";
import profileData from "@/data/profile.json";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#0A0A0F]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/30 py-3.5"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-lg p-1"
          >
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#06B6D4] transition-colors">
              RUFAIDA ISLAM
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] animate-pulse shadow-[0_0_8px_#7C3AED]"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href === "/blog" && pathname.startsWith("/blog"));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]",
                    isActive
                      ? "text-white bg-white/10"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action (Resume) & Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={encodeURI(profileData.personal.resumePath)}
              download="Resume of Most Rufaida Islam Rishat.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#1A1A2E]/90 hover:bg-[#7C3AED]/20 border border-[#7C3AED]/40 hover:border-[#7C3AED] text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
              aria-label="Download Rufaida's Resume PDF"
            >
              <FileDown className="w-4 h-4 text-[#06B6D4]" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-[#0A0A0F]/98 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] mb-2 px-3">
                Navigation
              </span>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-lg font-medium text-[#F1F5F9] hover:bg-white/5 hover:text-[#06B6D4] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#64748B]" />
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <a
                href={encodeURI(profileData.personal.resumePath)}
                download="Resume of Most Rufaida Islam Rishat.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl font-medium text-center bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#7C3AED]/25"
              >
                <FileDown className="w-5 h-5" />
                <span>Download Resume (PDF)</span>
              </a>
              <p className="text-xs text-center text-[#64748B]">
                {profileData.personal.department} · {profileData.personal.universityShort}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
