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
    <main id="main-content" className="min-h-screen flex flex-col bg-[#070C14] text-slate-100 selection:bg-[#B79A63] selection:text-[#070C14] relative overflow-x-hidden">
      {/* Architectural Navigation Bar */}
      <Navbar />

      {/* Hero Opening Monograph Spread */}
      <Hero />

      {/* Executive Biography */}
      <ExecutiveIntroduction />

      {/* Career Journey & Verified Progression Ledger */}
      <CareerTimeline />

      {/* Selected Landmark Developments */}
      <ProfessionalImpact />

      {/* Strategic Capabilities Matrix */}
      <ExpertiseGrid />

      {/* Principles of Governance & Stewardship */}
      <LeadershipPhilosophy />

      {/* Community Leadership & Mentorship */}
      <Mentorship />

      {/* Publications & Thought Leadership Insights */}
      <InsightsGrid />

      {/* Academic Pedigree & Licensure Register */}
      <Credentials />

      {/* The Discipline of Endurance */}
      <PersonalDimension />

      {/* Executive Consultation & Direct Dialogue */}
      <ContactSection />

      {/* Colophon & Index Footer */}
      <Footer />

      {/* Mobile Ergonomic Quick Dock */}
      <MobileQuickBar />
    </main>
  );
}
