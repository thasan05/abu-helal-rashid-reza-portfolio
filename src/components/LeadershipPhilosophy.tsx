"use client";

import React from "react";
import { Quote, Sparkles, Scale, HeartHandshake, Eye, Award } from "lucide-react";
import { portfolioContent, LeadershipPrinciple } from "@/data/content";

const principleIcons: Record<string, React.ReactNode> = {
  "ethics-governance": <Scale className="w-5 h-5 text-[#B79A63]" />,
  "engineering-strategy": <Eye className="w-5 h-5 text-[#B79A63]" />,
  "empathy-teamwork": <HeartHandshake className="w-5 h-5 text-[#B79A63]" />,
  "sustainable-future": <Sparkles className="w-5 h-5 text-[#B79A63]" />,
  "continuous-learning": <Award className="w-5 h-5 text-[#B79A63]" />,
};

export default function LeadershipPhilosophy() {
  const { philosophy } = portfolioContent;

  return (
    <section id="philosophy" className="py-28 bg-[#FAF8F5] text-[#101C2C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-4">
            <span className="w-8 h-[1.5px] bg-[#B79A63]" />
            <span>Guiding Principles</span>
            <span className="w-8 h-[1.5px] bg-[#B79A63]" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#101C2C] leading-tight tracking-tight mb-8">
            Leadership Grounded in Purpose &amp; Empathy
          </h2>

          {/* Central Editorial Statement Callout */}
          <div className="relative p-8 sm:p-12 rounded-xl bg-white border border-slate-200/80 shadow-xl max-w-3xl mx-auto">
            <Quote className="w-10 h-10 text-[#B79A63]/30 mx-auto mb-4" />
            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#101C2C] leading-relaxed">
              &ldquo;Strong leadership is not only about delivering results. It is also about how people grow, how decisions are made, and what remains after the work is done.&rdquo;
            </blockquote>
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-[#9E814B]">
              Proposed Editorial Philosophy &bull; Inspired by 17 Years of Engineering &amp; Executive Practice
            </p>
          </div>
        </div>

        {/* 5 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {philosophy.principles.map((principle: LeadershipPrinciple) => (
            <div
              key={principle.id}
              className="bg-white rounded-xl p-8 border border-slate-200 hover:border-[#B79A63]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center group-hover:border-[#B79A63]/40">
                    {principleIcons[principle.id] || <Sparkles className="w-5 h-5 text-[#B79A63]" />}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#F7F5F0] text-[#9E814B] font-semibold border border-[#B79A63]/20">
                    {principle.coreValue}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#101C2C] leading-snug mb-4 group-hover:text-[#9E814B] transition-colors">
                  {principle.headline}
                </h3>

                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {principle.reflection}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] font-mono tracking-wider text-[#B79A63]">
                  Value #{principle.id.slice(0, 4)}
                </span>
                <span className="text-[11px] text-slate-400">
                  Built Environment Ethics
                </span>
              </div>
            </div>
          ))}

          {/* 6th Card: Mentorship CTA Card */}
          <div className="bg-[#101C2C] text-white rounded-xl p-8 shadow-xl flex flex-col justify-between border border-[#B79A63]/30">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#18283E] text-[#E0CFA8] font-semibold border border-slate-700">
                Next Generation
              </span>
              <h3 className="font-serif text-2xl font-normal text-white mt-5 mb-3 leading-snug">
                Nurturing Future Leaders
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                Active involvement in student coaching, university-to-corporate transitional workshops, and professional project management mentoring.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <a
                href="#mentorship"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#CBB077] hover:text-white transition-colors"
              >
                <span>Discover Mentorship Initiatives</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
