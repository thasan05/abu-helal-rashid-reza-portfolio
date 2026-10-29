"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Award, Building, CheckCircle, Shield, FileText } from "lucide-react";
import { portfolioContent } from "@/data/content";

export default function Hero() {
  const { personalInfo, metrics } = portfolioContent;

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 pb-14 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 bg-[#101C2C] overflow-hidden">
      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]" />
      
      {/* Architectural ambient glow */}
      <div className="absolute -top-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-[#B79A63]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-[#263C5B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Executive Typography & Strategic Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            
            {/* Executive Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18283E] border border-[#B79A63]/30 w-fit mb-4 sm:mb-6 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#B79A63] shrink-0 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider sm:tracking-widest text-[#E0CFA8] truncate">
                {personalInfo.currentRole} • {personalInfo.currentCompany}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.18] sm:leading-[1.15] mb-5 sm:mb-6">
              Building with <span className="italic font-light text-[#CBB077]">Purpose.</span>
              <br />
              Leading with <span className="text-white">Perspective.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mb-6 sm:mb-8">
              Bringing together 17+ years of BUET civil engineering insight, C-suite operational governance, and rigorous PMP® discipline to deliver landmark real estate condominiums and national infrastructure across Bangladesh.
            </p>

            {/* Key Verified Credential Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-10 text-[11px] sm:text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#18283E]/80 border border-slate-700/80">
                <Award className="w-3.5 h-3.5 text-[#B79A63] shrink-0" />
                <span>PMP® Certified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#18283E]/80 border border-slate-700/80">
                <Building className="w-3.5 h-3.5 text-[#B79A63] shrink-0" />
                <span>BUET Civil &apos;08</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#18283E]/80 border border-slate-700/80">
                <Shield className="w-3.5 h-3.5 text-[#B79A63] shrink-0" />
                <span>Former COO (Rangs &amp; AWR)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#18283E]/80 border border-slate-700/80">
                <CheckCircle className="w-3.5 h-3.5 text-[#B79A63] shrink-0" />
                <span>Verona 160 Katha Director</span>
              </span>
            </div>

            {/* Call to Actions: Fully responsive and thumb-friendly */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] active:bg-[#CBB077] transition-all duration-200 shadow-lg shadow-[#B79A63]/15 min-h-[46px] active:scale-98"
              >
                <span>Explore Career Journey</span>
                <ArrowDown className="w-4 h-4" />
              </Link>

              <a
                href={personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-200 bg-[#18283E] hover:bg-[#223753] active:bg-[#223753] border border-slate-700 hover:border-[#B79A63]/60 transition-all duration-200 min-h-[46px] active:scale-98"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-[#B79A63]" />
              </a>

              <a
                href={personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-300 hover:text-white transition-colors min-h-[44px]"
                title="Download Executive Resume"
              >
                <FileText className="w-4 h-4 text-[#B79A63]" />
                <span className="underline underline-offset-4 decoration-slate-600 hover:decoration-[#B79A63]">Download CV</span>
              </a>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-6 mt-6 sm:pt-8 sm:mt-8 border-t border-slate-800/80">
              {metrics.slice(0, 4).map((m, idx) => (
                <div key={idx} className="flex flex-col p-2.5 sm:p-0 rounded-lg bg-[#18283E]/30 sm:bg-transparent border border-slate-800/40 sm:border-0">
                  <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#CBB077] mt-0.5">
                    {m.label}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                    {m.sublabel}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Architectural Executive Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[320px] sm:max-w-md mx-auto">
              
              {/* Outer Geometric Frame Accent */}
              <div className="absolute -inset-2 sm:-inset-3 border border-[#B79A63]/30 rounded-lg pointer-events-none translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3" />
              
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#18283E] shadow-2xl border border-slate-800">
                <Image
                  src={personalInfo.heroImagePath}
                  alt="Abu Helal Rashid Reza - Executive Leader & Civil Engineer"
                  fill
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 480px"
                  className="object-cover object-top hover:scale-102 transition-transform duration-700"
                />
                
                {/* Subtle Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B131F] via-transparent to-transparent opacity-85" />
                
                {/* Floating Lower Card with Verified Status */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded bg-[#101C2C]/90 backdrop-blur-md border border-[#B79A63]/30 shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-serif text-xs sm:text-sm font-semibold text-white truncate">
                        {personalInfo.fullName}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-[#CBB077] truncate">
                        General Manager &amp; Project Director
                      </p>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#18283E] text-slate-300 border border-slate-700 whitespace-nowrap">
                        17 Yrs Industry
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Leadership Pin */}
              <div className="flex absolute -top-3 -left-3 sm:-top-4 sm:-left-4 items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded bg-[#0B131F]/95 backdrop-blur-sm border border-[#B79A63]/40 shadow-xl">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B79A63]" />
                <span className="text-[11px] sm:text-xs font-medium text-slate-200">BUET Civil &bull; PMP®</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator (Desktop only) */}
        <div className="hidden md:flex justify-center mt-12">
          <Link
            href="#about"
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#B79A63] transition-colors group"
            aria-label="Scroll to Executive Biography"
          >
            <span className="text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-[#B79A63]">
              Scroll to explore
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#B79A63]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
