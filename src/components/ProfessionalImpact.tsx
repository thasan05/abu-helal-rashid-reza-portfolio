"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { portfolioContent, ProjectShowcase } from "@/data/content";

const categories = [
  "All",
  "Master Planned & Condos",
  "High-Rise & Commercial",
  "Defense & Institutional",
  "Industrial & Infrastructure",
] as const;

type CategoryFilter = typeof categories[number];

export default function ProfessionalImpact() {
  const { projects } = portfolioContent;
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-[#101C2C] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-2 sm:mb-3">
              <span className="w-6 h-[1.5px] bg-[#B79A63]" />
              <span>Demonstrated Delivery</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
              Selected Projects &amp; Operational Impact
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed">
              A curated selection of landmark residential, commercial, defense, and civic developments managed across Bangladesh.
            </p>
          </div>

          {/* Role Integrity Disclaimer Badge */}
          <div className="self-start md:self-end px-3 py-1.5 sm:px-3.5 sm:py-2 rounded bg-[#18283E] border border-slate-700/80 text-[10px] sm:text-[11px] text-slate-400 max-w-sm">
            <span className="text-[#B79A63] font-semibold">Integrity Notice:</span> Roles reflect executive governance, project direction, and construction management.
          </div>
        </div>

        {/* Category Filters: Smooth horizontal touch scroll on mobile, flex-wrap on desktop */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 sm:mb-12 border-b border-slate-800 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-2 rounded text-xs font-medium uppercase tracking-wider transition-all duration-200 shrink-0 min-h-[40px] flex items-center ${
                activeCategory === cat
                  ? "bg-[#B79A63] text-[#101C2C] font-semibold shadow-md shadow-[#B79A63]/20"
                  : "bg-[#18283E]/80 text-slate-300 hover:text-white hover:bg-[#223753] active:bg-[#223753]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: ProjectShowcase) => (
            <div
              key={project.id}
              className="bg-[#18283E]/80 hover:bg-[#18283E] rounded-lg overflow-hidden border border-slate-800 hover:border-[#B79A63]/50 shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18283E] via-transparent to-black/30" />
                
                {/* Category Pill */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#0B131F]/90 backdrop-blur-sm text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#E0CFA8] border border-[#B79A63]/30">
                    {project.category}
                  </span>
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-200 bg-black/70 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 rounded">
                  <MapPin className="w-3 h-3 text-[#B79A63]" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  {/* Organization & Verified Role */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 sm:mb-2">
                    <span className="font-medium text-[#CBB077]">
                      {project.organization}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#CBB077] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Role Contribution */}
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300 mt-1 mb-2.5 sm:mb-3">
                    Role: <span className="text-[#E0CFA8]">{project.roleContribution}</span>
                  </p>

                  {/* Scope / Metrics */}
                  <div className="px-2.5 sm:px-3 py-1.5 rounded bg-[#101C2C] border border-slate-800 text-[10px] sm:text-[11px] font-mono text-[#D8C398] mb-3">
                    {project.metricsOrScope}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Verified Highlights list */}
                <div className="pt-3 sm:pt-4 border-t border-slate-800/80">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Key Project Highlights:
                  </p>
                  <ul className="space-y-1.5">
                    {project.verifiedHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B79A63] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Section footer info */}
        <div className="mt-8 sm:mt-12 text-center text-xs text-slate-400 px-2">
          <p>
            Additional executed portfolio works include: Shaheed Col Nafiz Auditorium (ACC&amp;S Majhira), Khurushkul Ashrayan Special Project (Cox&apos;s Bazar), Azimpur DCC Modern Market, Jashore Head Post Office, and multiple high-end Baridhara residences.
          </p>
        </div>

      </div>
    </section>
  );
}
