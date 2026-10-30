"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, MapPin } from "lucide-react";
import { portfolioContent, CareerRole } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface CareerTimelineProps {
  data?: DatabasePortfolioData;
}

export default function CareerTimeline({ data }: CareerTimelineProps) {
  const careerTimeline = data?.careerTimeline && data.careerTimeline.length > 0
    ? data.careerTimeline
    : portfolioContent.careerTimeline;

  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    [careerTimeline[0]?.id || "edison-real-estate"]: true,
    [careerTimeline[1]?.id || "rangs-properties"]: true,
  });

  const toggleRole = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-32 bg-[#0B121E] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
            Chapter II &bull; Chronological Ledger
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            Seventeen years of operational progression.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            From foundational on-site structural execution and LEED high-rise coordination to C-suite executive governance and 160-katha condominium direction.
          </p>
        </div>

        {/* Executive Chronological Ledger with Structural Rail Guide */}
        <div className="border-t border-white/15 divide-y divide-white/10 relative">
          {careerTimeline.map((role: CareerRole) => {
            const isExpanded = !!expandedRoles[role.id];

            return (
              <div key={role.id} className="py-8 sm:py-10 transition-colors group">
                
                {/* Ledger Main Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                  
                  {/* Tenure Column */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${role.isCurrent ? "bg-[#B79A63] ring-4 ring-[#B79A63]/20" : "bg-slate-600"}`} />
                      <span className="text-xs sm:text-sm font-semibold tracking-[0.1em] text-[#CBB077] uppercase block">
                        {role.tenure}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-1.5 pl-4">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{role.location}</span>
                    </span>
                  </div>

                  {/* Title & Organization Column */}
                  <div className="lg:col-span-5">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#CBB077] transition-colors">
                        {role.roleTitle}
                      </h3>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
                      {role.organization}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 font-light mt-3 leading-relaxed">
                      {role.summary}
                    </p>

                    {/* Architectural Verification Tag */}
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-[#CBB077]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#B79A63]" />
                      <span className="font-mono text-xs">{role.verificationStatus}</span>
                    </div>
                  </div>

                  {/* Tags & Action Column */}
                  <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end gap-4 h-full">
                    <div className="flex flex-wrap gap-1.5 lg:justify-end">
                      {role.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2.5 py-1 rounded-[4px] text-xs bg-[#142236] text-slate-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CBB077] hover:text-[#E0CFA8] pt-2"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Collapse Scope" : "Expand Scope & Impact"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Collapsible Executive Impact Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/5 pl-4 sm:pl-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#070C14]/40 rounded-[6px] p-4 sm:p-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.12em] font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#B79A63] rounded-full" />
                        Key Executive Responsibilities
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-light">
                        {role.responsibilities.map((resp, respIdx) => (
                          <li key={respIdx} className="flex items-start gap-2">
                            <span className="text-[#B79A63] mt-1 text-xs">&bull;</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-[0.12em] font-medium text-[#CBB077] mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#B79A63] rounded-full" />
                        Verified Milestone Deliverables
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                        {role.keyAchievements.map((ach, achIdx) => (
                          <li key={achIdx} className="flex items-start gap-2">
                            <span className="text-[#CBB077] mt-1 text-xs">&bull;</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
