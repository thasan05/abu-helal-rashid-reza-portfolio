"use client";

import React from "react";
import { ArrowUpRight, BookOpen, Clock, Tag } from "lucide-react";
import { portfolioContent, InsightArticle } from "@/data/content";

export default function InsightsGrid() {
  const { insights } = portfolioContent;

  return (
    <section id="insights" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] text-[#101C2C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-2 sm:mb-3">
              <span className="w-6 h-[1.5px] bg-[#B79A63]" />
              <span>Thought Leadership</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#101C2C] leading-tight tracking-tight">
              Publications &amp; Industry Insights
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 font-light leading-relaxed">
              Perspectives on sustainable urbanism, PMP® operational discipline, career development, and televised structural engineering commentary.
            </p>
          </div>

          <div className="self-start md:self-end">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-500">
              Editorial Collection &bull; 4 Verified Features
            </span>
          </div>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {insights.map((article: InsightArticle) => (
            <article
              key={article.id}
              className="bg-white rounded-xl p-5 sm:p-8 border border-slate-200 hover:border-[#B79A63]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-slate-100">
                  <span className="font-medium text-[#9E814B] uppercase tracking-wider text-[11px] sm:text-xs">
                    {article.publicationOrPlatform}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#101C2C] group-hover:text-[#9E814B] transition-colors leading-snug mb-2 sm:mb-3">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4 sm:mb-6">
                  {article.summary}
                </p>
              </div>

              <div>
                {/* Topics / Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                  {article.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-slate-600 border border-slate-200"
                    >
                      <Tag className="w-2.5 h-2.5 text-[#B79A63]" />
                      {t}
                    </span>
                  ))}
                </div>

                {/* Read Link: Touch target optimization */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    {article.category}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#101C2C] group-hover:text-[#9E814B] transition-colors py-2 px-1 min-h-[44px]"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 text-[#B79A63]" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Media / Channel i Television Mention Banner */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg bg-white border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAF8F5] border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#B79A63]" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#101C2C]">
                Televised Structural Engineering &amp; Disaster Management Panels
              </h4>
              <p className="text-xs text-slate-600 font-light mt-0.5">
                Engaged on Channel i roundtable broadcasts discussing earthquake preparedness, soil mechanics, and urban structural safety in Dhaka.
              </p>
            </div>
          </div>
          <a
            href={portfolioContent.personalInfo.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center sm:text-right text-xs font-semibold uppercase tracking-wider text-[#9E814B] hover:text-[#101C2C] transition-colors shrink-0 py-2.5 px-3 rounded sm:rounded-none bg-[#FAF8F5] sm:bg-transparent min-h-[40px] flex items-center justify-center"
          >
            <span>View Media Updates &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
