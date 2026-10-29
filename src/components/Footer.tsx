"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, FileText, ShieldCheck } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { portfolioContent } from "@/data/content";

export default function Footer() {
  const { personalInfo } = portfolioContent;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080E17] text-slate-400 text-xs border-t border-slate-800/80 pt-12 sm:pt-16 pb-28 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Executive Summary */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                {personalInfo.fullName}
              </span>
              <span className="block text-[10px] sm:text-[11px] font-sans tracking-widest text-[#B79A63] uppercase mt-0.5">
                Executive Leader &bull; Civil Engineer (BUET) &bull; PMP®
              </span>
            </div>

            <p className="text-slate-400 font-light text-xs leading-relaxed max-w-sm">
              General Manager (Construction) &amp; Project Director at Edison Real Estate Limited. Over 17 years directing major residential condominiums, LEED commercial towers, and national defense infrastructure across Bangladesh.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <a
                href={personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-8 sm:h-8 rounded bg-[#101C2C] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#B79A63] active:bg-[#18283E] transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 sm:w-8 sm:h-8 rounded bg-[#101C2C] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#B79A63] active:bg-[#18283E] transition-colors"
                title="Email Engr. Reza"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                className="w-10 h-10 sm:w-8 sm:h-8 rounded bg-[#101C2C] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#B79A63] active:bg-[#18283E] transition-colors"
                title="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded bg-[#101C2C] border border-slate-800 text-[11px] text-slate-300 hover:text-white hover:border-[#B79A63] active:bg-[#18283E] transition-colors min-h-[40px] sm:min-h-0"
                title="Official Executive Resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-[#B79A63]" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Sitemap */}
          <div>
            <h4 className="font-serif text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link href="#about" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Executive Biography
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Career Journey
                </Link>
              </li>
              <li>
                <Link href="#expertise" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Core Competencies
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Selected Projects
                </Link>
              </li>
              <li>
                <Link href="#philosophy" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Leadership Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Mentorship & Thought Leadership */}
          <div>
            <h4 className="font-serif text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Engagement
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link href="#mentorship" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  LCB Mentorship
                </Link>
              </li>
              <li>
                <Link href="#mentorship" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  PMI Bangladesh Chapter
                </Link>
              </li>
              <li>
                <Link href="#insights" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Publications &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="#credentials" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Academic Degrees (BUET)
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#CBB077] transition-colors py-1 inline-block">
                  Connect &amp; Inquire
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Verified Status & Pre-Publication Note */}
          <div>
            <h4 className="font-serif text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Authenticity
            </h4>
            <div className="p-3 sm:p-3.5 rounded bg-[#101C2C] border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Verified Career Portfolio</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-normal">
                Curated exclusively from verified public credentials, official resume documentation, and photographic records.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-300 hover:text-[#B79A63] transition-colors min-h-[44px] py-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#B79A63]" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-slate-500">
          <p>
            &copy; 2026 Abu Helal Rashid Reza. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed to executive editorial standards &bull; Built with Next.js &amp; TypeScript.
          </p>
        </div>

      </div>
    </footer>
  );
}
