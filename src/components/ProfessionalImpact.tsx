"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Check, X, ArrowUpRight } from "lucide-react";
import { portfolioContent, ProjectShowcase } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface ProfessionalImpactProps {
  data?: DatabasePortfolioData;
}

const getObjectPositionClass = (position?: string) => {
  switch (position) {
    case "object-top":
      return "object-top";
    case "object-bottom":
      return "object-bottom";
    case "object-center":
      return "object-center";
    default:
      return "object-top";
  }
};

export default function ProfessionalImpact({ data }: ProfessionalImpactProps) {
  const projects = data?.projects && data.projects.length > 0
    ? data.projects
    : portfolioContent.projects;

  // Extract unique categories dynamically
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categories = ["All", ...uniqueCategories];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const flagship = projects.find((p) => p.id === "verona-condominium") || projects[0];
  const remainingProjects = filteredProjects.filter((p) => p.id !== flagship?.id);

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

  if (!flagship) return null;

  return (
    <section id="projects" className="py-20 sm:py-28 lg:py-32 bg-[#070C14] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
              Chapter III &bull; Selected Landmark Developments
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
              Civil execution at monumental scale.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Curated masterworks spanning 160-katha residential condominiums, high-rise corporate towers, LEED green architecture, and national security infrastructure.
            </p>
          </div>

          {/* Editorial Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-[0.08em] uppercase rounded-[4px] transition-all ${
                  activeCategory === cat
                    ? "bg-[#B79A63] text-[#070C14] font-semibold shadow-sm"
                    : "bg-[#101B2B] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Flagship Hero Feature Spread (Verona Condominium 160 Katha) */}
        {(activeCategory === "All" || activeCategory === flagship.category) && (
          <div className="mb-14 sm:mb-20 rounded-[8px] overflow-hidden border border-white/15 bg-[#0B131F] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Flagship Media Frame */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-full bg-[#142236]">
                <Image
                  src={flagship.imageUrl}
                  alt={flagship.imageAlt || flagship.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className={`object-cover ${getObjectPositionClass(flagship.imagePosition)}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B131F] via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-[4px] bg-[#070C14]/90 backdrop-blur-md border border-[#B79A63]/40 text-[#E0CFA8] text-xs font-semibold uppercase tracking-wider">
                    Flagship Masterwork
                  </span>
                </div>
              </div>

              {/* Flagship Monograph Description */}
              <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#CBB077] uppercase tracking-[0.12em] font-medium mb-2">
                    <span>{flagship.category}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {flagship.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-3">
                    {flagship.title}
                  </h3>

                  <div className="text-xs sm:text-sm font-medium text-[#CBB077] mb-4">
                    {flagship.roleContribution} &bull; {flagship.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {flagship.description}
                  </p>

                  <div className="p-3.5 rounded-[4px] bg-[#142236] border border-white/10 mb-6 text-xs text-slate-300">
                    <span className="text-[#CBB077] font-semibold uppercase tracking-[0.08em] block mb-1">
                      Monumental Scope
                    </span>
                    {flagship.metricsOrScope}
                  </div>

                  {/* Highlights Bullet Ledger */}
                  <div className="space-y-2 mb-8">
                    {flagship.verifiedHighlights.slice(0, 3).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400 font-light">
                        <Check className="w-3.5 h-3.5 text-[#B79A63] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(flagship)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider transition-all min-h-[46px]"
                >
                  <span>Examine Verona Full Technical Dossier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Secondary Selected Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {remainingProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-[8px] overflow-hidden border border-white/10 bg-[#0B131F] flex flex-col justify-between group hover:border-[#B79A63]/50 transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Project Image Frame */}
                <div className="relative aspect-[16/10] w-full bg-[#142236] overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt || project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover ${getObjectPositionClass(project.imagePosition)} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#070C14]/80 backdrop-blur-sm text-xs font-medium text-slate-300 border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <MapPin className="w-3 h-3 text-[#B79A63]" />
                    <span>{project.location}</span>
                    <span>&bull;</span>
                    <span className="text-[#CBB077]">{project.organization}</span>
                  </div>

                  <h4 className="font-serif text-xl font-normal text-white mb-2 group-hover:text-[#CBB077] transition-colors">
                    {project.title}
                  </h4>

                  <div className="text-xs text-[#CBB077] font-medium mb-3">
                    {project.roleContribution}
                  </div>

                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="text-xs text-slate-300 font-medium border-t border-white/10 pt-3">
                    {project.metricsOrScope}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-[4px] bg-[#142236] hover:bg-[#18283E] border border-white/10 text-xs font-medium uppercase tracking-wider text-slate-200 hover:text-white transition-all min-h-[42px]"
                >
                  <span>View Project Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B79A63]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Accessible Full Technical Dossier Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0B131F] border border-white/20 rounded-[8px] p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#142236] hover:bg-[#1C2F4B] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Close Technical Dossier Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="pr-8">
              <span className="text-xs uppercase tracking-[0.12em] font-medium text-[#CBB077] block mb-1">
                {selectedProject.category} &bull; {selectedProject.location}
              </span>
              <h3 id="modal-project-title" className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
                {selectedProject.title}
              </h3>
              <div className="text-xs sm:text-sm font-medium text-[#CBB077] mb-4">
                {selectedProject.roleContribution} &bull; {selectedProject.organization}
              </div>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full rounded-[6px] overflow-hidden my-6 border border-white/10 bg-[#142236]">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.imageAlt || selectedProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className={`object-cover ${getObjectPositionClass(selectedProject.imagePosition)}`}
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              <p>{selectedProject.description}</p>
              <div className="p-4 rounded-[4px] bg-[#142236] border border-white/10 text-xs">
                <span className="text-[#CBB077] font-semibold uppercase tracking-[0.08em] block mb-1">
                  Scope &amp; Technical Specifications
                </span>
                {selectedProject.metricsOrScope}
              </div>
            </div>

            {/* Modal Highlights */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-white mb-3">
                Key Deliverables &amp; Verified Engineering Highlights
              </h4>
              <div className="space-y-2">
                {selectedProject.verifiedHighlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                    <Check className="w-4 h-4 text-[#B79A63] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
