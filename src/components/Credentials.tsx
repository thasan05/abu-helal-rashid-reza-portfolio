"use client";

import React from "react";
import { portfolioContent } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface CredentialsProps {
  data?: DatabasePortfolioData;
}

export default function Credentials({ data }: CredentialsProps) {
  const credentials = data?.credentials || portfolioContent.credentials;

  return (
    <section id="credentials" className="py-20 sm:py-28 lg:py-32 bg-[#0B121E] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
            Chapter VIII &bull; Institutional Pedigree &amp; Licensure
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            Academic pedigree &amp; institutional licensure.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Technical rigor anchored in BUET civil engineering foundations, executive business governance from NSU, and global PMP® professional certification.
          </p>
        </div>

        {/* 3 Categories Layout */}
        <div className="space-y-14">
          
          {/* 1. Academic Degrees */}
          {credentials.academic && credentials.academic.length > 0 && (
            <div>
              <div className="text-xs text-[#CBB077] uppercase tracking-[0.12em] font-medium mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Academic Foundations</span>
                <span className="text-slate-400">Degree Conferred</span>
              </div>

              <div className="divide-y divide-white/5">
                {credentials.academic.map((item) => (
                  <div key={item.id} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
                    <div className="md:col-span-2 text-xs text-slate-400 font-medium tabular-nums">
                      {item.periodOrYear}
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-lg font-normal text-white">
                        {item.title}
                      </h3>
                      <div className="text-xs text-[#CBB077] mt-0.5">
                        {item.issuerOrInstitution}
                      </div>
                    </div>
                    <div className="md:col-span-5 text-xs text-slate-300 font-light leading-relaxed">
                      {item.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Professional Licensure & Certifications */}
          {credentials.certifications && credentials.certifications.length > 0 && (
            <div>
              <div className="text-xs text-[#CBB077] uppercase tracking-[0.12em] font-medium mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Professional Licensure &amp; Certifications</span>
                <span className="text-slate-400">Institutional Registry</span>
              </div>

              <div className="divide-y divide-white/5">
                {credentials.certifications.map((item) => (
                  <div key={item.id} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
                    <div className="md:col-span-2 text-xs text-slate-400 font-medium tabular-nums">
                      {item.periodOrYear}
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-lg font-normal text-white">
                        {item.title}
                      </h3>
                      <div className="text-xs text-[#CBB077] mt-0.5">
                        {item.issuerOrInstitution}
                      </div>
                    </div>
                    <div className="md:col-span-5 text-xs text-slate-300 font-light leading-relaxed">
                      {item.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Professional Memberships */}
          {credentials.memberships && credentials.memberships.length > 0 && (
            <div>
              <div className="text-xs text-[#CBB077] uppercase tracking-[0.12em] font-medium mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Professional Societies &amp; Memberships</span>
                <span className="text-slate-400">Standing</span>
              </div>

              <div className="divide-y divide-white/5">
                {credentials.memberships.map((item) => (
                  <div key={item.id} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
                    <div className="md:col-span-2 text-xs text-slate-400 font-medium tabular-nums">
                      {item.periodOrYear}
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-lg font-normal text-white">
                        {item.title}
                      </h3>
                      <div className="text-xs text-[#CBB077] mt-0.5">
                        {item.issuerOrInstitution}
                      </div>
                    </div>
                    <div className="md:col-span-5 text-xs text-slate-300 font-light leading-relaxed">
                      {item.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
