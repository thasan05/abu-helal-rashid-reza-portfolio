"use client";

import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { portfolioContent, CareerRole } from "@/data/content";

export default function CareerTimeline() {
  const { careerTimeline } = portfolioContent;
  const [expandedId, setExpandedId] = useState<string | null>("edison-real-estate");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-24 bg-[#101C2C] text-slate-100 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#B79A63]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#18283E]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Chronological Narrative</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
            Career Journey &amp; Executive Leadership
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Seventeen years of verified progression from on-site structural engineering to C-level operational governance and master-planned condominium direction.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 md:ml-32 space-y-12">
          
          {careerTimeline.map((role: CareerRole) => {
            const isExpanded = expandedId === role.id;

            return (
              <div key={role.id} className="relative pl-6 sm:pl-10 group">
                
                {/* Timeline Dot Indicator */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    role.isCurrent
                      ? "bg-[#B79A63] border-white ring-4 ring-[#B79A63]/30"
                      : "bg-[#101C2C] border-[#B79A63] group-hover:bg-[#B79A63]"
                  }`}
                />

                {/* Left Desktop Tenure Label */}
                <div className="hidden md:block absolute -left-36 top-1 text-right w-28">
                  <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                    role.isCurrent ? "text-[#CBB077]" : "text-slate-400"
                  }`}>
                    {role.tenure}
                  </span>
                  {role.isCurrent && (
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-[#B79A63] mt-0.5">
                      Current Role
                    </span>
                  )}
                </div>

                {/* Main Card */}
                <div className="bg-[#18283E]/70 hover:bg-[#18283E] transition-all duration-300 rounded-lg p-6 sm:p-8 border border-slate-800 hover:border-[#B79A63]/40 shadow-lg">
                  
                  {/* Mobile Tenure / Status */}
                  <div className="flex md:hidden items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#CBB077]">
                      <Calendar className="w-3.5 h-3.5" />
                      {role.tenure}
                    </span>
                    {role.isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#B79A63]/20 text-[#E0CFA8] border border-[#B79A63]/40">
                        Present
                      </span>
                    )}
                  </div>

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-tight">
                        {role.roleTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm">
                        <span className="font-medium text-[#CBB077]">
                          {role.organization}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                          <MapPin className="w-3 h-3 text-[#B79A63]" />
                          {role.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/40">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                    {role.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {role.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#101C2C] text-slate-400 border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Key Responsibilities & Achievements */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                      
                      {/* Responsibilities */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-[#E0CFA8] mb-3 flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-[#B79A63]" />
                          <span>Core Responsibilities</span>
                        </h4>
                        <ul className="space-y-2">
                          {role.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B79A63] mt-2 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Achievements */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-[#E0CFA8] mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Key Documented Achievements</span>
                        </h4>
                        <ul className="space-y-2">
                          {role.keyAchievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-normal leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  )}

                  {/* Toggle button */}
                  <div className="mt-5 pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => toggleExpand(role.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CBB077] hover:text-white transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Collapse Details" : "View Responsibilities & Achievements"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
