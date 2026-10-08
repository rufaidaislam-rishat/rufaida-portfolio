"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/blog";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <AnimatedSection id="blog" className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="BLOG"
            title="Notes From My Learning Journey"
            description="Personal reflections on entering AI data workflows, language evaluation, and developing technical habits."
            align="left"
            className="mb-0"
          />

          <Link
            href="/blog"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] hover:text-white transition-colors group"
          >
            <span>View All Notes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(0, 2).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
