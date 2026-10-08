# Most. Rufaida Islam Rishat — Portfolio Website

A modern, accessible, and high-performance personal portfolio website for **Most. Rufaida Islam Rishat**, an Electronics & Communication Engineering (ECE) student at Hajee Mohammad Danesh Science and Technology University (HSTU) and aspiring AI Data Specialist based in Dinajpur, Bangladesh.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Three.js** interactive particle background.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js 18.x or higher** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Test
```bash
npm run build
npm run start
```

---

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom cinematic dark theme
- **Animations**: Framer Motion (respects `prefers-reduced-motion`)
- **3D Graphics**: Three.js floating particle & data network scene
- **Icons**: Lucide React
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (code/mono)
- **Blog Engine**: MDX static parsing at build time (`/content/blog/`)
- **Contact Form**: Formspree / Web3Forms with client-side validation
- **Deployment**: Vercel Free Tier ready

---

## 📁 Architecture & File Structure

```
rufaida-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, Google Fonts, JSON-LD Person schema
│   ├── page.tsx                # Homepage assembling all 9 sections
│   ├── globals.css             # Tailwind & design system CSS tokens
│   ├── sitemap.ts              # Dynamic XML sitemap generator
│   ├── robots.ts               # Robots.txt generator
│   └── blog/
│       ├── page.tsx            # Blog listing page
│       └── [slug]/page.tsx     # Dynamic individual blog post reader
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed navbar with blur on scroll & mobile menu
│   │   └── Footer.tsx          # Social links, academic details & back-to-top
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with 3D particle scene & CTA buttons
│   │   ├── About.tsx           # Bio & student highlight cards
│   │   ├── Skills.tsx          # 12 Glassmorphism skill cards
│   │   ├── Experience.tsx      # Vertical timeline
│   │   ├── Projects.tsx        # Project showcase & detail modal
│   │   ├── BlogPreview.tsx     # Recent articles preview on homepage
│   │   └── Contact.tsx         # Interactive contact form & availability
│   ├── three/
│   │   └── ParticleScene.tsx   # Three.js data network particles (responsive)
│   ├── ui/
│   │   ├── GlassCard.tsx       # Reusable glassmorphic card with hover lift
│   │   ├── GradientButton.tsx  # Accessible interactive button
│   │   ├── SectionHeader.tsx   # Consistent section headings & badges
│   │   ├── AnimatedSection.tsx # Scroll-triggered fade-in animations
│   │   ├── CursorGlow.tsx      # Desktop cursor follow glow
│   │   └── ScrollIndicator.tsx # Hero scroll indicator
│   └── blog/
│       ├── BlogCard.tsx        # Card display for articles
│       └── MDXComponents.tsx   # Markdown article renderer
│
├── content/
│   └── blog/
│       ├── journey-into-ai-data.mdx
│       └── learning-ai-data-annotation.mdx
│
├── data/
│   └── profile.json            # 🌟 SINGLE SOURCE OF TRUTH FOR ALL CONTENT
│
├── lib/
│   ├── blog.ts                 # Blog file reading & frontmatter parsing
│   └── utils.ts                # Tailwind class merge & helpers
│
└── public/
    └── resume/
        └── Rufaida_Islam_Rishat_Resume.pdf
```

---

## ✏️ How to Update Website Content

All personal information is managed in **`/data/profile.json`**. You can update any text without touching React code.

### 1. Update Personal & Social Links
Open `/data/profile.json` and edit:
```json
"personal": {
  "name": "Most. Rufaida Islam Rishat",
  "email": "rufaidarishat@gmail.com",
  "linkedin": "https://linkedin.com/in/your-profile",
  "github": "https://github.com/rufaidaislam-rishat",
  "location": "Dinajpur, Bangladesh"
}
```

### 2. Add or Edit Skills
In `/data/profile.json`, add an entry to `"skills"`:
```json
{
  "id": "skill-13",
  "name": "New Skill Name",
  "description": "Short one-sentence description of the skill.",
  "icon": "Terminal",
  "category": "Programming"
}
```

### 3. Add or Edit Experience
In `/data/profile.json`, add an item to `"experience"`:
```json
{
  "id": "exp-6",
  "title": "Role or Program Title",
  "role": "Student / Project Participant",
  "period": "2026 – Present",
  "status": "Current",
  "details": [
    "Key responsibility or learning takeaway 1",
    "Key responsibility or learning takeaway 2"
  ]
}
```

### 4. Add or Edit Projects
In `/data/profile.json`, add an item to `"projects"`:
```json
{
  "id": "proj-5",
  "title": "Project Title",
  "category": "AI Data / Programming",
  "description": "Clear description of the learning or practical task.",
  "type": "Learning Project",
  "tags": ["Tag1", "Tag2"],
  "github": "https://github.com/...",
  "liveDemo": "",
  "details": [
    "Specific methodology detail 1",
    "Specific methodology detail 2"
  ]
}
```

### 5. Add a New Blog Post
Create a new file in `/content/blog/your-post-title.mdx`:
```mdx
---
title: "Your Post Title"
date: "2026-10-15"
category: "AI & Learning"
excerpt: "A brief summary of what this post covers."
readTime: "4 min read"
---

Your article content written in standard Markdown...
```

### 6. Replace Resume
Place your updated PDF file in:
```
/public/resume/Rufaida_Islam_Rishat_Resume.pdf
```
The "Resume" button in the navigation and mobile drawer will automatically download this file.

### 7. Configure Contact Form (Formspree)
1. Sign up for a free account at [formspree.io](https://formspree.io/).
2. Create a new form and copy the endpoint ID (e.g. `xpzgvkrq`).
3. In `/data/profile.json`, update:
```json
"contact": {
  "formspreeEndpoint": "https://formspree.io/f/YOUR_NEW_FORM_ID"
}
```

---

## 🚢 Deploying to Vercel (Free Tier)

1. Push your repository to **GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Rufaida Islam Rishat portfolio"
git branch -M main
git remote add origin https://github.com/your-username/rufaida-portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and import your repository.
4. Next.js presets will be detected automatically:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click **"Deploy"**. Your site will be live within 1–2 minutes!

---

## 🔒 Content Authenticity & Safety
This portfolio truthfully portrays Rufaida as an early-career university engineering student and developing AI data practitioner. It contains no exaggerated seniority titles, fabricated employers, or fake statistics.
