"use client";

import React from "react";
import Image from "next/image";
import { Flame, BookOpen, Activity, Medal, Check } from "lucide-react";
import { portfolioContent, PersonalInterest } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-5 h-5 text-[#B79A63]" />,
  BookOpen: <BookOpen className="w-5 h-5 text-[#B79A63]" />,
  Activity: <Activity className="w-5 h-5 text-[#B79A63]" />,
};

export default function PersonalDimension() {
  const { personalDimension } = portfolioContent;

  return (
    <section className="py-24 bg-[#FAF8F5] text-[#101C2C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Discipline &amp; Perspective</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#101C2C] leading-tight tracking-tight">
            The Personal Dimension: Discipline &amp; Endurance
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            {personalDimension.intro}
          </p>
        </div>

        {/* 3 Pillars Grid with Authentic Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personalDimension.interests.map((item: PersonalInterest, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-[#B79A63]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {item.imageUrl && (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/95 backdrop-blur-sm text-[11px] font-mono font-medium text-[#101C2C]">
                    <Medal className="w-3.5 h-3.5 text-[#B79A63]" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center mb-4">
                    {iconMap[item.iconName] || <Activity className="w-5 h-5 text-[#B79A63]" />}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#101C2C] mb-2 leading-snug group-hover:text-[#9E814B] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-[#9E814B]">
                  <Check className="w-4 h-4 text-[#B79A63]" />
                  <span>Disciplined Habit &bull; Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
