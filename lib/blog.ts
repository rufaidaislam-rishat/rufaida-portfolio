import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts: BlogPost[] = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Estimate reading time if not present: ~200 words per minute
      const wordCount = content.split(/\s+/).filter(Boolean).length;
      const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date || "2026-01-01",
        category: data.category || "General",
        excerpt: data.excerpt || "",
        readTime: data.readTime || calculatedReadTime,
        content,
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPathMdx = path.join(blogDirectory, `${slug}.mdx`);
    const fullPathMd = path.join(blogDirectory, `${slug}.md`);
    const fullPath = fs.existsSync(fullPathMdx) ? fullPathMdx : fullPathMd;

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    return {
      slug,
      title: data.title || "Untitled Post",
      date: data.date || "2026-01-01",
      category: data.category || "General",
      excerpt: data.excerpt || "",
      readTime: data.readTime || calculatedReadTime,
      content,
    };
  } catch (err) {
    return null;
  }
}
