import React from "react";
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

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#101C2C] text-slate-100 selection:bg-[#B79A63] selection:text-white relative overflow-x-hidden">
      {/* Sticky Executive Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Section C: Executive Introduction */}
      <ExecutiveIntroduction />

      {/* Section D: Career Journey & Verified Timeline */}
      <CareerTimeline />

      {/* Section E: Expertise & Strategic Capabilities */}
      <ExpertiseGrid />

      {/* Section F: Selected Projects & Professional Impact */}
      <ProfessionalImpact />

      {/* Section G: Leadership Philosophy */}
      <LeadershipPhilosophy />

      {/* Section H: Mentorship & Industry Community (LCB & PMI) */}
      <Mentorship />

      {/* Section I: Publications & Thought Leadership Insights */}
      <InsightsGrid />

      {/* Section J: Education, Certifications & Memberships */}
      <Credentials />

      {/* Section K: Personal Dimension (Athletics & Discipline) */}
      <PersonalDimension />

      {/* Section L: Executive Contact */}
      <ContactSection />

      {/* Executive Footer */}
      <Footer />

      {/* Floating Thumb-Friendly Mobile Quick Action Dock */}
      <MobileQuickBar />
    </main>
  );
}
