"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Check, X, ArrowUpRight } from "lucide-react";
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
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const flagship = projects.find((p) => p.id === "verona-condominium") || projects[0];
  const remainingProjects = filteredProjects.filter((p) => p.id !== flagship.id);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  // Lock body scroll when project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 sm:py-28 lg:py-32 bg-[#070C14] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
              Chapter III &bull; Landmark Portfolio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
              Selected landmark developments.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Curated portfolio of master-planned residential condominiums, LEED-certified commercial towers, defense installations, and civic infrastructure managed across Bangladesh.
            </p>
          </div>

          <div className="text-xs uppercase tracking-[0.1em] text-slate-300 border border-white/10 px-3.5 py-2 rounded-[4px] bg-[#142236]">
            <span className="text-[#CBB077] font-medium">Scope:</span> Executive Direction &bull; Construction Management
          </div>
        </div>

        {/* Flagship Landmark Feature (Verona Condominium) */}
        {activeCategory === "All" || activeCategory === "Master Planned & Condos" ? (
          <div className="mb-14 p-6 sm:p-8 lg:p-10 rounded-xl bg-[#0B121E] border border-white/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <div
                  className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 cursor-pointer group"
                  onClick={() => setSelectedProject(flagship)}
                >
                  <Image
                    src={flagship.imageUrl}
                    alt={flagship.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-[4px] bg-[#070C14]/90 text-xs uppercase tracking-[0.1em] text-[#E0CFA8] border border-white/10 font-medium">
                    Flagship Project Direction
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-[4px] bg-[#070C14]/90 text-xs uppercase tracking-[0.08em] font-medium text-white/90 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    Inspect Specifications &rarr;
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.12em] text-[#CBB077] font-medium mb-2 block">
                  {flagship.category} &bull; {flagship.organization}
                </span>

                <h3
                  className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2 cursor-pointer hover:text-[#CBB077] transition-colors"
                  onClick={() => setSelectedProject(flagship)}
                >
                  {flagship.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#B79A63]" />
                  <span>{flagship.location}</span>
                  <span className="mx-1">&bull;</span>
                  <span className="text-white font-medium">{flagship.metricsOrScope}</span>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {flagship.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/10 mb-6">
                  {flagship.verifiedHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-[#CBB077] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(flagship)}
                  className="self-start inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-[4px] bg-[#101B2B] hover:bg-[#16243A] border border-white/15 text-xs font-medium uppercase tracking-[0.08em] text-slate-200 transition-colors"
                >
                  <span>View Architectural Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B79A63]" />
                </button>
              </div>

            </div>
          </div>
        ) : null}

        {/* Category Filters */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-10 pb-2 border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 min-h-[44px] flex items-center rounded text-xs uppercase tracking-wider transition-all duration-200 shrink-0 font-medium ${
                activeCategory === cat
                  ? "bg-[#B79A63] text-[#070C14] font-semibold"
                  : "bg-[#0B121E] text-slate-300 hover:text-white hover:bg-[#101B2B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Landmark Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(activeCategory === "All" ? remainingProjects : filteredProjects).map((project: ProjectShowcase) => (
            <div
              key={project.id}
              className="rounded-lg overflow-hidden bg-[#0B121E] border border-white/10 hover:border-[#B79A63]/50 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div
                  className="relative aspect-[16/10] w-full bg-[#101B2B] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[4px] bg-[#070C14]/85 text-xs uppercase tracking-[0.08em] font-medium text-slate-300">
                    {project.category}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#CBB077] mb-1">
                    {project.organization}
                  </div>
                  
                  <h4
                    className="font-serif text-xl font-normal text-white mb-2 cursor-pointer hover:text-[#CBB077] transition-colors"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="text-xs text-white/90 bg-[#101B2B] p-2.5 rounded-[4px] border border-white/5 mb-4">
                    <span className="text-slate-400 font-medium">Scale: </span>
                    <span className="tabular-nums">{project.metricsOrScope}</span>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-white/5">
                    {project.verifiedHighlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#B79A63] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-[#070C14] border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">{project.roleContribution}</span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="text-[#CBB077] hover:text-white uppercase tracking-[0.08em] font-medium transition-colors"
                >
                  Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Architectural Project Dossier Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#05080E]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div className="bg-[#0B121E] border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Header bar */}
            <div className="p-4 sm:p-5 bg-[#070C14] border-b border-white/10 flex items-center justify-between sticky top-0 z-10">
              <span className="text-xs uppercase tracking-[0.12em] font-medium text-[#CBB077]">
                Architectural Project Dossier &bull; {selectedProject.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-11 h-11 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close project dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-[#101B2B]">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 650px"
                className="object-cover"
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-[0.1em] font-medium">
                  {selectedProject.organization} &bull; {selectedProject.location}
                </span>
                <h3 id="modal-project-title" className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  {selectedProject.title}
                </h3>
                <div className="inline-block mt-2 px-2.5 py-1 rounded-[4px] bg-[#101B2B] border border-[#B79A63]/30 text-xs text-[#E0CFA8] font-medium">
                  Role: {selectedProject.roleContribution}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.1em] font-medium text-slate-400 mb-2">
                  Project Scope &amp; Scale
                </h4>
                <div className="p-3 rounded-[4px] bg-[#070C14] border border-white/10 text-xs text-white tabular-nums">
                  {selectedProject.metricsOrScope}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.1em] font-medium text-slate-400 mb-2">
                  Structural &amp; Operational Overview
                </h4>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.1em] font-medium text-slate-400 mb-3">
                  Verified Engineering Highlights
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.verifiedHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-[#CBB077] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Verified via Corporate &amp; Site Documentation
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-[4px] bg-[#B79A63] text-[#070C14] text-xs font-semibold uppercase tracking-wider hover:bg-[#CBB077] transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Close Dossier
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
