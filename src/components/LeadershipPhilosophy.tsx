"use client";

import React from "react";
import { portfolioContent, LeadershipPrinciple } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface LeadershipPhilosophyProps {
  data?: DatabasePortfolioData;
}

export default function LeadershipPhilosophy({ data }: LeadershipPhilosophyProps) {
  const philosophy = data?.philosophy || portfolioContent.philosophy;

  return (
    <section id="philosophy" className="py-20 sm:py-28 lg:py-32 bg-[#FCFBF9] text-[#1E293B] border-b border-[#E2DDD2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Architectural Monograph Ivory Manifesto) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#9E814B] mb-3">
            Chapter V &bull; Governance Manifesto
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#101C2C] tracking-tight leading-tight">
            Principles of governance &amp; stewardship.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#334155] font-light leading-relaxed">
            {philosophy.leadStatement}
          </p>
        </div>

        {/* Central Manifest Reflection */}
        <div className="mb-14 p-8 sm:p-10 lg:p-12 rounded-[8px] bg-[#F7F5F0] border border-[#E2DDD2] shadow-sm">
          <blockquote className="font-serif italic text-xl sm:text-3xl text-[#101C2C] leading-relaxed max-w-4xl">
            &ldquo;{philosophy.leadStatement || "Strong leadership is not only about delivering results. It is also about how people grow, how decisions are made, and what remains after the work is done."}&rdquo;
          </blockquote>
          <div className="mt-5 text-xs uppercase tracking-[0.14em] font-semibold text-[#9E814B]">
            Core Operating Philosophy &bull; Engr. Abu Helal Rashid Reza
          </div>
        </div>

        {/* Five Tenets Ledger */}
        <div className="border-t border-[#E2DDD2] divide-y divide-[#E2DDD2]">
          {philosophy.principles.map((principle: LeadershipPrinciple) => (
            <div key={principle.id} className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
              
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-[0.14em] font-bold text-[#9E814B] block">
                  {principle.coreValue}
                </span>
                <span className="text-xs text-[#64748B] mt-1 block font-light">
                  Governance Principle
                </span>
              </div>

              <div className="lg:col-span-9">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#101C2C] mb-2">
                  {principle.headline}
                </h3>
                {principle.quote && (
                  <p className="font-serif italic text-sm text-[#9E814B] mb-2">
                    &ldquo;{principle.quote}&rdquo;
                  </p>
                )}
                <p className="text-sm sm:text-base text-[#334155] font-light leading-relaxed">
                  {principle.reflection}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
