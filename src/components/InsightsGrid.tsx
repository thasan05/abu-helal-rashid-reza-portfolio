"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioContent, InsightArticle } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface InsightsGridProps {
  data?: DatabasePortfolioData;
}

export default function InsightsGrid({ data }: InsightsGridProps) {
  const insights = data?.insights && data.insights.length > 0
    ? data.insights
    : portfolioContent.insights;

  return (
    <section id="insights" className="py-20 sm:py-28 lg:py-32 bg-[#070C14] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
              Chapter VII &bull; Publications &amp; Media Insights
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
              Publications &amp; public discourse.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Perspectives on sustainable urbanism, televised structural safety commentary, PMP® operational discipline, and executive transition.
            </p>
          </div>

          <div className="text-xs uppercase tracking-[0.1em] font-medium text-slate-400 border border-white/10 px-3.5 py-2 rounded-[4px] bg-[#142236]">
            Archival Index &bull; {insights.length} Verified Features
          </div>
        </div>

        {/* Editorial Press Register */}
        <div className="border-t border-white/15 divide-y divide-white/10">
          {insights.map((article: InsightArticle) => (
            <article key={article.id} className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline group">
              
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-[0.12em] font-medium text-[#CBB077] block">
                  {article.publicationOrPlatform}
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  {article.category} &bull; {article.readTime}
                </span>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2 group-hover:text-[#CBB077] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                  {article.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {article.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-[4px] text-xs bg-[#101B2B] text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 lg:text-right">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CBB077] hover:text-[#E0CFA8] transition-colors"
                >
                  <span>{article.isExternal ? "Read External" : "Examine Article"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
