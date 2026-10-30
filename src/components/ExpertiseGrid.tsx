"use client";

import React from "react";
import { portfolioContent } from "@/data/content";

export default function ExpertiseGrid() {
  const { expertise } = portfolioContent;

  const pillarGroups = [
    {
      pillarName: "Civil & Structural Engineering Rigor",
      focus: "Foundational civil engineering mastery, geotechnical due diligence, and building code compliance.",
      domains: expertise.filter((e) =>
        ["civil-structural-engineering", "quality-assurance-safety", "sustainable-construction"].includes(e.id)
      ),
    },
    {
      pillarName: "Executive Portfolio & Operational Governance",
      focus: "PMP® project governance, multi-project execution, cross-functional P&L stewardship, and supply chain integrity.",
      domains: expertise.filter((e) =>
        ["project-management-pmp", "corporate-operations", "supply-chain-contracts"].includes(e.id)
      ),
    },
    {
      pillarName: "Stakeholder Alignment & Urban Stewardship",
      focus: "Landowner joint-venture negotiation, statutory approvals, and nationwide professional mentorship.",
      domains: expertise.filter((e) =>
        ["stakeholder-joint-venture", "team-mentorship"].includes(e.id)
      ),
    },
  ];

  return (
    <section id="expertise" className="py-20 sm:py-28 lg:py-32 bg-[#0B121E] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
            Chapter IV &bull; Operational Capabilities Matrix
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            Strategic capabilities &amp; core discipline.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Eight operational disciplines forged across 17 years of on-site structural engineering, executive corporate governance, and certified PMP® delivery.
          </p>
        </div>

        {/* 3-Pillar Architectural Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {pillarGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="p-6 sm:p-8 rounded-[8px] bg-[#142236] border border-white/10 flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="text-xs text-[#CBB077] uppercase tracking-[0.12em] font-medium block mb-2">
                  Strategic Domain
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-3">
                  {group.pillarName}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 pb-4 border-b border-white/10">
                  {group.focus}
                </p>

                <div className="space-y-6">
                  {group.domains.map((domain) => (
                    <div key={domain.id} className="space-y-2">
                      <h4 className="text-sm font-medium text-white flex items-center justify-between">
                        <span>{domain.title}</span>
                      </h4>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {domain.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {domain.capabilities.map((cap, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2 py-0.5 rounded-[4px] text-xs bg-[#0B121E] text-slate-300 border border-white/5"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 text-xs uppercase tracking-[0.08em] font-medium text-slate-400">
                Ground-Verified Competency
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
