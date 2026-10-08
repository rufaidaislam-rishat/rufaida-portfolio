import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/ui/CursorGlow";
import profileData from "@/data/profile.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rufaida-portfolio.vercel.app"),
  title: "Most. Rufaida Islam Rishat | ECE Student & AI Data Professional",
  description:
    "Portfolio of Rufaida Islam Rishat — an Electronics & Communication Engineering student at HSTU exploring AI data annotation, AI evaluation, programming, and technology.",
  keywords: [
    "Rufaida Islam Rishat",
    "ECE Student",
    "HSTU",
    "AI Data Annotation",
    "AI Evaluation",
    "Data QA",
    "Bengali NLP",
    "Bangladesh AI Specialist",
    "Engineering Student",
  ],
  authors: [{ name: "Most. Rufaida Islam Rishat" }],
  creator: "Most. Rufaida Islam Rishat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rufaida-portfolio.vercel.app",
    title: "Most. Rufaida Islam Rishat | ECE Student & AI Data Professional",
    description:
      "Portfolio of Rufaida Islam Rishat — an Electronics & Communication Engineering student at HSTU exploring AI data annotation, AI evaluation, programming, and technology.",
    siteName: "Rufaida Islam Rishat Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Most. Rufaida Islam Rishat - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Most. Rufaida Islam Rishat | ECE Student & AI Data Professional",
    description:
      "Portfolio of Rufaida Islam Rishat — an Electronics & Communication Engineering student at HSTU exploring AI data annotation, AI evaluation, programming, and technology.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data: Schema.org Person Schema
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Most. Rufaida Islam Rishat",
    alternateName: "Rufaida Islam",
    description:
      "Electronics & Communication Engineering Student and Aspiring AI Data Professional",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Hajee Mohammad Danesh Science and Technology University (HSTU)",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dinajpur",
      addressCountry: "Bangladesh",
    },
    url: "https://rufaida-portfolio.vercel.app",
    sameAs: [
      "https://github.com/rufaidaislam-rishat",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Data Annotation",
      "Model Evaluation",
      "Bengali Language Data",
      "Electronics and Communication Engineering",
      "C++",
      "Python",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-[#0A0A0F] text-[#F1F5F9] font-sans antialiased selection:bg-[#7C3AED] selection:text-white relative min-h-screen">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#7C3AED] text-white font-medium rounded-lg shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        {/* Ambient Cursor Glow Effect */}
        <CursorGlow />

        {children}
      </body>
    </html>
  );
}
