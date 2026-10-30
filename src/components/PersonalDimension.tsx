"use client";

import React from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface PersonalDimensionProps {
  data?: DatabasePortfolioData;
}

export default function PersonalDimension({ data }: PersonalDimensionProps) {
  const personalDimension = data?.personalDimension || portfolioContent.personalDimension;
  const interests = personalDimension.interests && personalDimension.interests.length > 0
    ? personalDimension.interests
    : portfolioContent.personalDimension.interests;

  // Find images from interests or default to authentic marathon images
  const runImage = interests.find((i) => i.imageUrl && i.imageUrl.includes("run"))?.imageUrl || "/images/reza-marathon-run.jpg";
  const medalImage = interests.find((i) => i.imageUrl && i.imageUrl.includes("finisher"))?.imageUrl || "/images/reza-marathon-finisher.jpg";

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070C14] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
            Chapter IX &bull; Endurance &amp; Discipline
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            The discipline of endurance.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {personalDimension.intro}
          </p>
        </div>

        {/* 2-Column Photojournalistic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Dual Imagery */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0B121E]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={runImage}
                  alt="Engr. Reza running in the Inspiring Bangladesh Marathon"
                  fill
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-3 bg-[#0B121E] text-xs uppercase tracking-[0.08em] font-medium text-slate-400">
                On-Course 15K Pace &bull; Inspiring Bangladesh
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0B121E]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={medalImage}
                  alt="Engr. Reza holding 15K finisher medal Bib 75767"
                  fill
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-3 bg-[#0B121E] text-xs uppercase tracking-[0.08em] font-medium text-[#CBB077]">
                Official 15K Finisher &bull; Bib #75767
              </div>
            </div>
          </div>

          {/* Editorial Pillars */}
          <div className="lg:col-span-5 space-y-6">
            {interests.map((item, idx) => (
              <div key={idx} className="p-5 rounded-[6px] bg-[#0B121E] border border-white/10">
                <div className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] mb-1">
                  {item.highlight}
                </div>
                <h3 className="font-serif text-lg font-normal text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
