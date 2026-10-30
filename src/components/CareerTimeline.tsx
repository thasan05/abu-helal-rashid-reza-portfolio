"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, MapPin } from "lucide-react";
import { portfolioContent, CareerRole } from "@/data/content";

export default function CareerTimeline() {
  const { careerTimeline } = portfolioContent;
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    "edison-real-estate": true,
    "rangs-properties": true,
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
                    {role.isCurrent && (
                      <span className="inline-block mt-2.5 ml-4 px-2.5 py-0.5 rounded-[4px] text-xs font-semibold uppercase tracking-[0.08em] bg-[#B79A63]/20 text-[#E0CFA8] border border-[#B79A63]/40">
                        Active Project Directorate
                      </span>
                    )}
                  </div>

                  {/* Role Title & Organization */}
                  <div className="lg:col-span-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-1 group-hover:text-[#E0CFA8] transition-colors">
                      {role.roleTitle}
                    </h3>
                    <div className="text-sm font-medium text-[#B79A63] tracking-wide mb-3">
                      {role.organization}
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-4">
                      {role.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-[4px] text-xs bg-[#142236] text-slate-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expand / Details Action */}
                  <div className="lg:col-span-3 lg:text-right flex lg:flex-col justify-between items-start lg:items-end gap-2">
                    <span className="text-xs text-slate-400 uppercase tracking-[0.08em] font-medium">
                      {role.verificationStatus}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#CBB077] hover:text-white min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B79A63]"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Hide Responsibilities" : "View Responsibilities"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                </div>

                {/* Expanded Detailed Responsibilities & Key Outcomes */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 lg:pl-[25%]">
                    <div className="p-4 rounded-[4px] bg-[#142236]/60 border border-white/5">
                      <h4 className="text-xs uppercase tracking-[0.1em] text-[#CBB077] font-semibold mb-3">
                        Mandate &amp; Responsibilities
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                        {role.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B79A63] mt-2 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-[4px] bg-[#142236]/60 border border-white/5">
                      <h4 className="text-xs uppercase tracking-[0.1em] text-[#CBB077] font-semibold mb-3">
                        Key Operational Outcomes
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                        {role.keyAchievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#CBB077] mt-0.5 shrink-0" />
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
