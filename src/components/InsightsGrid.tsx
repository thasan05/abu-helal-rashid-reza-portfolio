"use client";

import React from "react";
import { ArrowUpRight, BookOpen, Clock, Tag } from "lucide-react";
import { portfolioContent, InsightArticle } from "@/data/content";

export default function InsightsGrid() {
  const { insights } = portfolioContent;

  return (
    <section id="insights" className="py-24 bg-[#FAF8F5] text-[#101C2C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-3">
              <span className="w-6 h-[1.5px] bg-[#B79A63]" />
              <span>Thought Leadership</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#101C2C] leading-tight tracking-tight">
              Publications &amp; Industry Insights
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              Perspectives on sustainable urbanism, PMP® operational discipline, career development, and televised structural engineering commentary.
            </p>
          </div>

          <div className="self-start md:self-end">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Editorial Collection &bull; 4 Verified Features
            </span>
          </div>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insights.map((article: InsightArticle) => (
            <article
              key={article.id}
              className="bg-white rounded-xl p-8 border border-slate-200 hover:border-[#B79A63]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                  <span className="font-medium text-[#9E814B] uppercase tracking-wider">
                    {article.publicationOrPlatform}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101C2C] group-hover:text-[#9E814B] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div>
                {/* Topics / Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {article.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-slate-600 border border-slate-200"
                    >
                      <Tag className="w-2.5 h-2.5 text-[#B79A63]" />
                      {t}
                    </span>
                  ))}
                </div>

                {/* Read Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    {article.category}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#101C2C] group-hover:text-[#9E814B] transition-colors"
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
        <div className="mt-12 p-6 rounded-lg bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-slate-200 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#B79A63]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#101C2C]">
                Televised Structural Engineering &amp; Disaster Management Panels
              </h4>
              <p className="text-xs text-slate-600 font-light">
                Engaged on Channel i roundtable broadcasts discussing earthquake preparedness, soil mechanics, and urban structural safety in Dhaka.
              </p>
            </div>
          </div>
          <a
            href={portfolioContent.personalInfo.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-[#9E814B] hover:text-[#101C2C] transition-colors shrink-0 whitespace-nowrap"
          >
            View Media Updates &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
