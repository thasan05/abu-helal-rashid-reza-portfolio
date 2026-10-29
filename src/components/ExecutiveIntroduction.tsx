"use client";

import React from "react";
import Image from "next/image";
import { Quote, CheckCircle, ArrowRight } from "lucide-react";
import { portfolioContent } from "@/data/content";

export default function ExecutiveIntroduction() {
  const { executiveIntro } = portfolioContent;

  return (
    <section id="about" className="py-24 bg-[#FAF8F5] text-[#101C2C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Executive Biography</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#101C2C] leading-tight tracking-tight">
            {executiveIntro.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            {executiveIntro.subheading}
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual: Authentic Window Office Photograph */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-3 border border-[#B79A63]/30 rounded-lg pointer-events-none -translate-x-2 -translate-y-2 hidden sm:block" />
              
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl bg-slate-200">
                <Image
                  src="/images/reza-window-reflection.jpg"
                  alt="Engr. Abu Helal Rashid Reza in executive discussion"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top hover:scale-102 transition-transform duration-500"
                />
                
                {/* Subtle caption overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#101C2C]/90 via-[#101C2C]/50 to-transparent text-white">
                  <p className="text-xs font-medium">
                    Engr. Abu Helal Rashid Reza
                  </p>
                  <p className="text-[11px] text-[#CBB077]">
                    Civil Engineer (BUET) • General Manager & Project Director
                  </p>
                </div>
              </div>

              {/* Callout Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-lg shadow-xl border border-slate-200 hidden sm:block max-w-[240px]">
                <p className="text-2xl font-serif font-bold text-[#101C2C]">17+</p>
                <p className="text-xs font-medium text-slate-700 mt-1">
                  Years of disciplined delivery across high-density urban developments.
                </p>
              </div>
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-slate-700 leading-relaxed font-normal text-base sm:text-lg">
            {executiveIntro.paragraphs.map((p, idx) => (
              <p key={idx} className="text-slate-700">
                {p}
              </p>
            ))}

            {/* Philosophy Pull-Quote */}
            <div className="mt-8 p-6 rounded-lg bg-white border-l-4 border-[#B79A63] shadow-sm">
              <Quote className="w-8 h-8 text-[#B79A63]/40 mb-2" />
              <p className="font-serif italic text-base sm:text-lg text-[#101C2C] leading-snug">
                &ldquo;{executiveIntro.quoteCallout.statement}&rdquo;
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-[#9E814B] font-semibold">
                — {executiveIntro.quoteCallout.attribution}
              </p>
            </div>

            {/* Core Pillars Bulleted */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B79A63] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-[#101C2C]">
                  Technical BUET Civil Foundation
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B79A63] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-[#101C2C]">
                  Global PMP® Standard Rigor
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B79A63] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-[#101C2C]">
                  C-Level Operations Governance
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#B79A63] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-[#101C2C]">
                  Nationwide Mentorship & LCB
                </span>
              </div>
            </div>

            {/* Link to Experience */}
            <div className="pt-4">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#101C2C] hover:text-[#B79A63] transition-colors"
              >
                <span>Review detailed career milestones</span>
                <ArrowRight className="w-4 h-4 text-[#B79A63]" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
