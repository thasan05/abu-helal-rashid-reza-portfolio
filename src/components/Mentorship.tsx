"use client";

import React from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";

export default function Mentorship() {
  const { mentorship } = portfolioContent;

  return (
    <section id="mentorship" className="py-20 sm:py-28 lg:py-32 bg-[#0B121E] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
            Chapter VI &bull; Community Leadership &amp; Mentorship
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            Elevating the next generation of engineers.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {mentorship.overview}
          </p>
        </div>

        {/* Documentary Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          <div className="rounded-[8px] overflow-hidden bg-[#142236] border border-white/10 shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/reza-lcb-panel.jpg"
                alt="Engr. Reza on stage at LinkedIn Community Bangladesh"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-xs">
              <div className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] mb-1">LCB Conference</div>
              <p className="text-slate-300 font-light leading-snug">
                Keynote panel speaker on transition from academic theory to corporate construction delivery.
              </p>
            </div>
          </div>

          <div className="rounded-[8px] overflow-hidden bg-[#142236] border border-white/10 shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/reza-pmi-speaker.jpg"
                alt="Engr. Reza speaking at PMI Bangladesh Chapter"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-xs">
              <div className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] mb-1">PMI Bangladesh</div>
              <p className="text-slate-300 font-light leading-snug">
                Guest session on Earned Value Management (EVM) and risk containment in mega-projects.
              </p>
            </div>
          </div>

          <div className="rounded-[8px] overflow-hidden bg-[#142236] border border-white/10 shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/reza-lcb-community.jpg"
                alt="Engr. Reza with young engineering community members"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-xs">
              <div className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] mb-1">Youth Mentorship</div>
              <p className="text-slate-300 font-light leading-snug">
                Coaching graduate engineers on professional licensure, ethics, and career roadmaps.
              </p>
            </div>
          </div>

          <div className="rounded-[8px] overflow-hidden bg-[#142236] border border-white/10 shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/reza-mentoring-youth.jpg"
                alt="Engr. Reza in mentorship coaching session"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-xs">
              <div className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] mb-1">Advisory Circles</div>
              <p className="text-slate-300 font-light leading-snug">
                Collaborative workshops elevating construction safety standards and site culture.
              </p>
            </div>
          </div>

        </div>

        {/* Structured Impact Initiatives */}
        <div className="border-t border-white/15 divide-y divide-white/10">
          {mentorship.activities.map((act) => (
            <div key={act.id} className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <div className="md:col-span-3">
                <span className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] block">
                  {act.timeframe}
                </span>
                <span className="text-sm font-medium text-white block mt-0.5">
                  {act.organization}
                </span>
              </div>

              <div className="md:col-span-6">
                <h4 className="text-base font-normal text-white mb-1">
                  {act.role}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="md:col-span-3 md:text-right text-xs uppercase tracking-[0.08em] font-medium text-[#E0CFA8]">
                {act.impactMetrics || act.focus}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
