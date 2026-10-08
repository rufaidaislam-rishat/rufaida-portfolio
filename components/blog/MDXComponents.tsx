import React from "react";

export function RenderMarkdown({ content }: { content: string }) {
  // Simple, robust markdown line parser that formats headings, lists, quotes, code, and paragraphs safely
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="my-4 space-y-2 list-disc list-inside text-[#94A3B8]">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">
              <span className="text-[#F1F5F9]">{item}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      flushList(index);
      elements.push(
        <h3 key={index} className="text-xl font-bold font-display text-white mt-8 mb-3">
          {trimmed.replace("### ", "")}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList(index);
      elements.push(
        <h2 key={index} className="text-2xl sm:text-3xl font-bold font-display text-white mt-10 mb-4 pb-2 border-b border-white/10">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      flushList(index);
      elements.push(
        <h1 key={index} className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-12 mb-6">
          {trimmed.replace("# ", "")}
        </h1>
      );
    } else if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
    } else if (trimmed.startsWith("> ")) {
      flushList(index);
      elements.push(
        <blockquote
          key={index}
          className="my-6 p-4 rounded-xl border-l-4 border-[#7C3AED] bg-[#12121A] text-[#94A3B8] italic"
        >
          {trimmed.replace("> ", "")}
        </blockquote>
      );
    } else if (trimmed.length > 0) {
      flushList(index);
      elements.push(
        <p key={index} className="my-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
          {trimmed}
        </p>
      );
    }
  });

  flushList(lines.length);

  return <div className="prose-dark max-w-none">{elements}</div>;
}
