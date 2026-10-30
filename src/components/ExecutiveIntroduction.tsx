"use client";

import React from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface ExecutiveIntroProps {
  data?: DatabasePortfolioData;
}

export default function ExecutiveIntroduction({ data }: ExecutiveIntroProps) {
  const executiveIntro = data?.executiveIntro || portfolioContent.executiveIntro;
  const personalInfo = data?.personalInfo || portfolioContent.personalInfo;
  const secondaryImage = personalInfo.secondaryImagePath || "/images/reza-window-reflection.jpg";

  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 bg-[#FCFBF9] text-[#1E293B] border-b border-[#E2DDD2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Headline */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#9E814B] mb-3">
            Chapter I &bull; Executive Biography
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#101C2C] tracking-tight leading-tight">
            {executiveIntro.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#334155] font-light leading-relaxed">
            {executiveIntro.subheading}
          </p>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Authentic Photography with Archival Documentary Plate */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[8px] overflow-hidden border border-[#E2DDD2] bg-[#F7F5F0] shadow-md">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={secondaryImage}
                  alt={`${personalInfo.fullName} executive discussion`}
                  fill
                  sizes="(max-width: 640px) 100vw, 450px"
                  className="object-cover object-top"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#F7F5F0] border-t border-[#E2DDD2] text-xs text-[#475569]">
                <span className="text-[#9E814B] font-semibold uppercase tracking-[0.12em] block mb-1">
                  Corporate Stewardship
                </span>
                Directing strategic real estate operations, contractor governance, and cross-functional team alignment.
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 text-[#334155] font-light text-base sm:text-lg leading-relaxed">
            {executiveIntro.paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}

            {/* Integrated Architectural Pull Quote */}
            {executiveIntro.quoteCallout?.statement && (
              <div className="my-8 py-8 px-6 sm:px-8 border-y border-[#E2DDD2] bg-[#F7F5F0] rounded-[4px]">
                <blockquote className="font-serif italic text-lg sm:text-xl text-[#101C2C] leading-snug">
                  &ldquo;{executiveIntro.quoteCallout.statement}&rdquo;
                </blockquote>
                {executiveIntro.quoteCallout.attribution && (
                  <cite className="block not-italic text-xs uppercase tracking-[0.14em] text-[#9E814B] font-semibold mt-3">
                    &mdash; {executiveIntro.quoteCallout.attribution}
                  </cite>
                )}
              </div>
            )}

            {/* Core Verification Register */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-[#475569]">
              <div className="p-4 rounded-[4px] bg-[#F7F5F0] border border-[#E2DDD2]">
                <span className="text-[#101C2C] font-semibold block mb-1">Technical Pedigree</span>
                BUET Civil Engineering (&apos;08) foundation with structural design, geotechnical due diligence, and QA/QC oversight.
              </div>
              <div className="p-4 rounded-[4px] bg-[#F7F5F0] border border-[#E2DDD2]">
                <span className="text-[#101C2C] font-semibold block mb-1">C-Suite Operations</span>
                Former Chief Operating Officer at Rangs Properties and AWR Developments with NSU Executive MBA (&apos;24).
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
