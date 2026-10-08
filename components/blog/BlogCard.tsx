"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-2xl"
    >
      <GlassCard className="h-full flex flex-col justify-between p-7 sm:p-8 transition-all">
        <div>
          {/* Top meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] px-2.5 py-1 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/20">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>

            <div className="flex items-center gap-3 text-xs text-[#64748B] font-mono">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#06B6D4] transition-colors mb-3">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>
        </div>

        {/* Read more link */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-sm font-medium text-white group-hover:text-[#7C3AED] transition-colors">
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </GlassCard>
    </Link>
  );
}
