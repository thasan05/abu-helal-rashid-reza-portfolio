"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, FileText, ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { portfolioContent } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface HeroProps {
  data?: DatabasePortfolioData;
}

export default function Hero({ data }: HeroProps) {
  const personalInfo = data?.personalInfo || portfolioContent.personalInfo;
  const heroSettings = data?.heroSettings || {
    monographVolume: "Vol. XVII",
    monographYear: "2026 Edition",
    availabilityStatus: "Open for Select Executive Leadership & Strategic Consultation",
    headline: "Engineering skylines with structural rigor and executive stewardship.",
    subheadline: personalInfo.subHeadline,
    ctaPrimaryLabel: "Executive CV (PDF)",
    ctaPrimaryUrl: personalInfo.resumePdfPath,
    ctaSecondaryLabel: "Selected Landmark Projects",
    ctaSecondaryUrl: "#projects",
  };
  const metrics = data?.metrics && data.metrics.length > 0 ? data.metrics : portfolioContent.metrics;

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 bg-[#0B121E] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Datum Registration Header */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-8 sm:mb-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#B79A63] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.14em] text-[#CBB077] font-medium">
              {personalInfo.currentRole} &bull; {personalInfo.currentCompany}
            </span>
          </div>
          <div className="hidden sm:block text-xs uppercase tracking-[0.14em] text-slate-400 font-medium">
            Executive Monograph &bull; {heroSettings.monographVolume} &bull; {heroSettings.monographYear}
          </div>
        </div>

        {/* Main 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Monument */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Monumental Headline with Editorial Italic Cadence */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08] mb-6">
              {heroSettings.headline.includes("at landmark scale") ? (
                <>
                  Engineering rigor <br className="hidden sm:inline" />
                  <span className="italic font-light text-[#E0CFA8]">at landmark scale.</span>
                </>
              ) : (
                heroSettings.headline
              )}
            </h1>

            {/* Narrative Proposition */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mb-8">
              {heroSettings.subheadline || personalInfo.shortBio}
            </p>

            {/* Architectural Credential Seal Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-10 text-xs">
              <span className="px-3 py-1.5 rounded-[4px] bg-[#142236] border border-white/10 text-slate-200">
                BUET Civil &apos;08
              </span>
              <span className="px-3 py-1.5 rounded-[4px] bg-[#142236] border border-[#B79A63]/30 text-[#E0CFA8]">
                PMP® Certified #3867623
              </span>
              <span className="px-3 py-1.5 rounded-[4px] bg-[#142236] border border-white/10 text-slate-200">
                NSU EMBA &apos;24
              </span>
              <span className="px-3 py-1.5 rounded-[4px] bg-[#142236] border border-white/10 text-slate-300">
                Former COO (Rangs &amp; AWR)
              </span>
              <span className="px-3 py-1.5 rounded-[4px] bg-[#142236] border border-white/10 text-slate-300">
                Verona 160 Katha Director
              </span>
            </div>

            {/* Executive Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={heroSettings.ctaSecondaryUrl || "#projects"}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm min-h-[46px]"
              >
                <span>{heroSettings.ctaSecondaryLabel || "Selected Landmark Projects"}</span>
                <ArrowDownRight className="w-4 h-4" />
              </Link>

              <a
                href={heroSettings.ctaPrimaryUrl || personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[4px] bg-[#142236] hover:bg-[#18283E] border border-white/15 hover:border-[#B79A63]/60 text-slate-200 text-xs font-medium uppercase tracking-wider transition-all duration-200 min-h-[46px]"
              >
                <FileText className="w-4 h-4 text-[#B79A63]" />
                <span>{heroSettings.ctaPrimaryLabel || "Executive CV (PDF)"}</span>
              </a>

              <a
                href={personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-[4px] bg-[#142236] hover:bg-[#18283E] border border-white/15 text-slate-300 hover:text-white transition-colors min-h-[46px]"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#B79A63]" />
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Executive Portrait with Drafting Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[8px] overflow-hidden border border-white/15 bg-[#142236] shadow-2xl">
              
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={personalInfo.heroImagePath || "/images/reza-portrait-standing.jpg"}
                  alt={`${personalInfo.fullName} portrait`}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-top"
                />
              </div>

              {/* Architectural Metadata Plate */}
              <div className="p-4 sm:p-5 bg-[#0B131F] border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-serif text-sm font-medium text-white">
                    {personalInfo.fullName}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {personalInfo.location} &bull; {personalInfo.currentRole}
                  </div>
                </div>

                <div className="text-right text-xs uppercase tracking-[0.12em] font-medium text-[#CBB077]">
                  {personalInfo.currentCompany}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Baseline Landmark Metrics Ledger */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-2xl sm:text-3xl text-white font-normal tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-300 font-medium uppercase tracking-[0.08em]">
                  {metric.label}
                </div>
                {metric.sublabel && (
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {metric.sublabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
