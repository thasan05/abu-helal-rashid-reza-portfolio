"use client";

import React from "react";
import {
  Compass,
  Building2,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Users,
  HardHat,
  ArrowRight,
} from "lucide-react";
import { portfolioContent, ExpertiseArea } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6 text-[#B79A63]" />,
  Building2: <Building2 className="w-6 h-6 text-[#B79A63]" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-[#B79A63]" />,
  Leaf: <Leaf className="w-6 h-6 text-[#B79A63]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#B79A63]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#B79A63]" />,
  Users: <Users className="w-6 h-6 text-[#B79A63]" />,
  HardHat: <HardHat className="w-6 h-6 text-[#B79A63]" />,
};

export default function ExpertiseGrid() {
  const { expertise } = portfolioContent;

  return (
    <section id="expertise" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] text-[#101C2C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-2 sm:mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Strategic Competencies</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#101C2C] leading-tight tracking-tight">
            Expertise &amp; Leadership Capabilities
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 font-light leading-relaxed">
            Eight core domains shaped by 17 years of on-site structural execution, corporate executive stewardship, and PMP® project governance.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {expertise.map((item: ExpertiseArea) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-5 sm:p-7 border border-slate-200 hover:border-[#B79A63]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon header */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#FAF8F5] border border-slate-200 group-hover:border-[#B79A63]/40 flex items-center justify-center mb-4 sm:mb-5 transition-colors">
                  {iconMap[item.iconName] || <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#B79A63]" />}
                </div>

                {/* Title & subtitle */}
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#101C2C] leading-snug group-hover:text-[#9E814B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider mt-1 mb-2.5 sm:mb-3">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4 sm:mb-5">
                  {item.description}
                </p>
              </div>

              {/* Capabilities checklist */}
              <div className="pt-3 sm:pt-4 border-t border-slate-100">
                <ul className="space-y-1.5">
                  {item.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1 h-1 rounded-full bg-[#B79A63] mt-1.5 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner connecting expertise to verified projects */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-lg bg-[#101C2C] text-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 shadow-xl">
          <div>
            <h4 className="font-serif text-lg sm:text-2xl font-normal text-white">
              Grounded in Tangible Project Execution
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-2xl">
              From 160-katha condominiums in Uttara Diyabari to 18-story LEED commercial towers on Gulshan Avenue and naval bases in Patuakhali.
            </p>
          </div>
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] active:bg-[#CBB077] transition-all shrink-0 min-h-[46px]"
          >
            <span>Explore Projects Showcase</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
