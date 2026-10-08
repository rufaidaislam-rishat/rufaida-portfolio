import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { RenderMarkdown } from "@/components/blog/MDXComponents";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Most. Rufaida Islam Rishat`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Most. Rufaida Islam Rishat"],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F1F5F9] flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1 pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all notes</span>
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-10 pb-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed italic">
              {post.excerpt}
            </p>
          </header>

          {/* Post Body */}
          <div className="mt-8">
            <RenderMarkdown content={post.content} />
          </div>

          {/* Post Footer note */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#64748B]">
              Written by <span className="text-white font-medium">Most. Rufaida Islam Rishat</span> · ECE Student at HSTU
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#06B6D4] hover:text-white transition-colors"
            >
              <span>Have thoughts or feedback? Let&apos;s connect</span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
