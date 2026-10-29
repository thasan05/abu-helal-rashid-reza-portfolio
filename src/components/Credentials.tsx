"use client";

import React, { useState } from "react";
import { GraduationCap, Award, Building, ShieldCheck } from "lucide-react";
import { portfolioContent, CredentialItem } from "@/data/content";

export default function Credentials() {
  const { credentials } = portfolioContent;
  const [activeTab, setActiveTab] = useState<"all" | "academic" | "certifications" | "memberships">("all");

  const allItems = [
    ...credentials.certifications,
    ...credentials.academic,
    ...credentials.memberships,
  ];

  const displayedItems = activeTab === "all"
    ? allItems
    : activeTab === "academic"
    ? credentials.academic
    : activeTab === "certifications"
    ? credentials.certifications
    : credentials.memberships;

  return (
    <section id="credentials" className="py-16 sm:py-20 lg:py-24 bg-[#101C2C] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-2 sm:mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Academic Rigor &amp; Professional Licensure</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
            Education, Certifications &amp; Memberships
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed">
            A comprehensive foundation in civil engineering from BUET, executive business mastery from NSU, global PMP® credentials, and key professional memberships.
          </p>
        </div>

        {/* Filter Tabs: Horizontal swipeable on mobile */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 sm:mb-12 border-b border-slate-800 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 sm:px-4 py-2 rounded text-xs font-medium uppercase tracking-wider transition-all duration-200 shrink-0 min-h-[40px] flex items-center ${
              activeTab === "all"
                ? "bg-[#B79A63] text-[#101C2C] font-semibold"
                : "bg-[#18283E] text-slate-300 hover:text-white active:bg-[#223753]"
            }`}
          >
            All Credentials ({allItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("certifications")}
            className={`px-3.5 sm:px-4 py-2 rounded text-xs font-medium uppercase tracking-wider transition-all duration-200 shrink-0 min-h-[40px] flex items-center ${
              activeTab === "certifications"
                ? "bg-[#B79A63] text-[#101C2C] font-semibold"
                : "bg-[#18283E] text-slate-300 hover:text-white active:bg-[#223753]"
            }`}
          >
            Certifications ({credentials.certifications.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("academic")}
            className={`px-3.5 sm:px-4 py-2 rounded text-xs font-medium uppercase tracking-wider transition-all duration-200 shrink-0 min-h-[40px] flex items-center ${
              activeTab === "academic"
                ? "bg-[#B79A63] text-[#101C2C] font-semibold"
                : "bg-[#18283E] text-slate-300 hover:text-white active:bg-[#223753]"
            }`}
          >
            Academic Degrees ({credentials.academic.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("memberships")}
            className={`px-3.5 sm:px-4 py-2 rounded text-xs font-medium uppercase tracking-wider transition-all duration-200 shrink-0 min-h-[40px] flex items-center ${
              activeTab === "memberships"
                ? "bg-[#B79A63] text-[#101C2C] font-semibold"
                : "bg-[#18283E] text-slate-300 hover:text-white active:bg-[#223753]"
            }`}
          >
            Memberships ({credentials.memberships.length})
          </button>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedItems.map((item: CredentialItem) => {
            const isCert = item.category === "Professional Certification";
            const isDegree = item.category === "Academic Degree";

            return (
              <div
                key={item.id}
                className={`rounded-lg p-5 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  isCert
                    ? "bg-gradient-to-b from-[#18283E] to-[#142236] border-[#B79A63]/60 shadow-xl shadow-[#B79A63]/10"
                    : "bg-[#18283E]/70 hover:bg-[#18283E] border-slate-800 hover:border-slate-700 shadow-md"
                }`}
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between text-xs mb-3 sm:mb-4">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#CBB077]">
                      {item.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px] sm:text-[11px]">
                      {item.periodOrYear}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base sm:text-xl font-bold text-white leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Institution */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#E0CFA8] mb-3 sm:mb-4">
                    {isDegree ? (
                      <GraduationCap className="w-4 h-4 text-[#B79A63] shrink-0" />
                    ) : isCert ? (
                      <Award className="w-4 h-4 text-[#B79A63] shrink-0" />
                    ) : (
                      <Building className="w-4 h-4 text-[#B79A63] shrink-0" />
                    )}
                    <span>{item.issuerOrInstitution}</span>
                  </div>

                  {/* Details */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4 sm:mb-6">
                    {item.details}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  {item.badgeText && (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#101C2C] text-[#D8C398] text-[9px] sm:text-[10px] font-mono border border-slate-700">
                      {item.badgeText}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono ml-auto">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
