import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F1F5F9] relative overflow-hidden">
      {/* 1. Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        {/* 2. Hero */}
        <Hero />

        {/* 3. About Me */}
        <About />

        {/* 4. Skills */}
        <Skills />

        {/* 5. Experience */}
        <Experience />

        {/* 6. Projects */}
        <Projects />

        {/* 7. Blog Preview */}
        <BlogPreview posts={posts} />

        {/* 8. Contact */}
        <Contact />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
