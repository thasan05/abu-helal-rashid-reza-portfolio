"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { portfolioContent, MentorshipActivity } from "@/data/content";

export default function Mentorship() {
  const { mentorship, personalInfo } = portfolioContent;

  return (
    <section id="mentorship" className="py-24 bg-[#101C2C] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Community &amp; Next-Gen Elevation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
            Mentorship &amp; Industry Connect
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {mentorship.overview}
          </p>
        </div>

        {/* Featured Photographic Gallery of Verified Community Work */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Photo 1: LCB Stage Panel */}
          <div className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
            <Image
              src="/images/reza-lcb-panel.jpg"
              alt="Engr. Abu Helal Rashid Reza speaking on stage at LinkedIn Community Bangladesh"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E0CFA8] bg-black/60 px-2 py-0.5 rounded">
                LinkedIn Community Bangladesh (LCB)
              </span>
              <p className="text-xs text-slate-200 mt-1 font-medium line-clamp-2">
                Panel Speaker on &apos;From Campus to Career&apos; corporate transitions.
              </p>
            </div>
          </div>

          {/* Photo 2: PMI Bangladesh Chapter Speaker */}
          <div className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
            <Image
              src="/images/reza-pmi-speaker.jpg"
              alt="Engr. Abu Helal Rashid Reza speaking at PMI Bangladesh Chapter"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E0CFA8] bg-black/60 px-2 py-0.5 rounded">
                PMI Bangladesh Chapter
              </span>
              <p className="text-xs text-slate-200 mt-1 font-medium line-clamp-2">
                Member Engagement Series speaker on project risk &amp; governance.
              </p>
            </div>
          </div>

          {/* Photo 3: Candid Mentoring with Youth */}
          <div className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
            <Image
              src="/images/reza-mentoring-youth.jpg"
              alt="Engr. Abu Helal Rashid Reza in active discussion with young engineers"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E0CFA8] bg-black/60 px-2 py-0.5 rounded">
                One-on-One Youth Mentoring
              </span>
              <p className="text-xs text-slate-200 mt-1 font-medium line-clamp-2">
                Engaging in career coaching and industry guidance post-conference.
              </p>
            </div>
          </div>

        </div>

        {/* Detailed Mentorship Activities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mentorship.activities.map((act: MentorshipActivity) => (
            <div
              key={act.id}
              className="bg-[#18283E]/80 rounded-lg p-8 border border-slate-800 hover:border-[#B79A63]/50 shadow-lg flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-[#CBB077] uppercase tracking-wider">
                    {act.timeframe}
                  </span>
                  {act.impactMetrics && (
                    <span className="px-2.5 py-0.5 rounded bg-[#101C2C] text-[#E0CFA8] border border-slate-700 text-[11px] font-mono">
                      {act.impactMetrics}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-semibold text-white group-hover:text-[#CBB077] transition-colors leading-snug">
                  {act.organization}
                </h3>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 mt-1 mb-3">
                  Role: <span className="text-[#E0CFA8]">{act.role}</span>
                </p>

                <div className="px-3 py-1.5 rounded bg-[#101C2C] text-slate-300 text-xs font-medium mb-4 border border-slate-800">
                  Focus: {act.focus}
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {act.description}
                </p>
              </div>

              {act.imageCaption && (
                <div className="pt-4 mt-6 border-t border-slate-800/80 text-xs text-slate-400 italic">
                  Note: {act.imageCaption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Invitation Callout */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-[#18283E] to-[#101C2C] border border-[#B79A63]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-medium text-white">
              Seeking Career Mentorship or a Keynote Speaker?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Engr. Reza accepts select speaking invitations for engineering universities and professional youth development forums.
            </p>
          </div>
          <a
            href={personalInfo.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] transition-all shrink-0"
          >
            <span>Inquire on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
