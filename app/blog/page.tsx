import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Blog & Learning Notes | Most. Rufaida Islam Rishat",
  description:
    "Reflections and notes on AI data annotation, evaluation, bilingual datasets, and student engineering experiences by Most. Rufaida Islam Rishat.",
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F1F5F9] flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#1A1A2E]/80 border border-[#7C3AED]/30 text-[#06B6D4] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
              Learning Notes & Articles
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              Notes From My Learning Journey
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Transparent perspectives from a 2nd-year ECE student building foundational skills in AI data annotation, evaluation, and engineering problem solving.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
