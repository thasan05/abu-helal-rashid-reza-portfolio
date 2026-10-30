import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExecutiveIntroduction from "@/components/ExecutiveIntroduction";
import CareerTimeline from "@/components/CareerTimeline";
import ExpertiseGrid from "@/components/ExpertiseGrid";
import ProfessionalImpact from "@/components/ProfessionalImpact";
import LeadershipPhilosophy from "@/components/LeadershipPhilosophy";
import Mentorship from "@/components/Mentorship";
import InsightsGrid from "@/components/InsightsGrid";
import Credentials from "@/components/Credentials";
import PersonalDimension from "@/components/PersonalDimension";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import { getPublishedPortfolioData } from "@/lib/db/data";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPublishedPortfolioData();
  const seo = data.seoSettings;
  const siteUrl = seo.canonicalUrl || "https://abuhelalrashidreza.com";

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: siteUrl,
      images: [
        {
          url: seo.ogImageUrl || "/images/reza-portrait-standing.jpg",
          width: 1200,
          height: 1800,
          alt: data.personalInfo.fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [seo.ogImageUrl || "/images/reza-portrait-standing.jpg"],
    },
  };
}

export default async function HomePage() {
  const data = await getPublishedPortfolioData();

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" data={data} />,
    biography: <ExecutiveIntroduction key="biography" data={data} />,
    timeline: <CareerTimeline key="timeline" data={data} />,
    projects: <ProfessionalImpact key="projects" data={data} />,
    expertise: <ExpertiseGrid key="expertise" data={data} />,
    philosophy: <LeadershipPhilosophy key="philosophy" data={data} />,
    mentorship: <Mentorship key="mentorship" data={data} />,
    insights: <InsightsGrid key="insights" data={data} />,
    credentials: <Credentials key="credentials" data={data} />,
    personal: <PersonalDimension key="personal" data={data} />,
    contact: <ContactSection key="contact" data={data} />,
  };

  // Sort sections by sortOrder and filter by isVisible
  const activeSections = (data.sectionConfigs || [])
    .filter((sec) => sec.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((sec) => sectionMap[sec.sectionKey])
    .filter(Boolean);

  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col bg-[#070C14] text-slate-100 selection:bg-[#B79A63] selection:text-[#070C14] relative overflow-x-hidden"
      style={{
        "--accent-color": data.themeSettings?.accentColor || "#B79A63",
        "--accent-light": data.themeSettings?.accentLight || "#CBB077",
      } as React.CSSProperties}
    >
      {/* Architectural Navigation Bar */}
      <Navbar data={data} />

      {/* Render All Enabled Sections in Configured Order */}
      {activeSections.length > 0 ? (
        activeSections
      ) : (
        <>
          <Hero data={data} />
          <ExecutiveIntroduction data={data} />
          <CareerTimeline data={data} />
          <ProfessionalImpact data={data} />
          <ExpertiseGrid data={data} />
          <LeadershipPhilosophy data={data} />
          <Mentorship data={data} />
          <InsightsGrid data={data} />
          <Credentials data={data} />
          <PersonalDimension data={data} />
          <ContactSection data={data} />
        </>
      )}

      {/* Colophon & Index Footer */}
      <Footer data={data} />

      {/* Mobile Ergonomic Quick Dock */}
      <MobileQuickBar data={data} />
    </main>
  );
}
