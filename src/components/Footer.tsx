"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, FileText } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { portfolioContent } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface FooterProps {
  data?: DatabasePortfolioData;
}

export default function Footer({ data }: FooterProps) {
  const personalInfo = data?.personalInfo || portfolioContent.personalInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05080E] text-slate-400 text-xs border-t border-white/10 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Colophon Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-xl font-normal text-white">
                {personalInfo.fullName}
              </span>
              <span className="block text-xs font-medium tracking-[0.1em] text-[#CBB077] uppercase mt-1">
                BUET Civil &bull; PMP® &bull; Project Director
              </span>
            </div>

            <p className="text-slate-400 font-light text-xs leading-relaxed max-w-sm">
              {personalInfo.currentRole} &amp; Project Director at {personalInfo.currentCompany}. Over 17 years directing major residential condominiums, LEED commercial towers, and national infrastructure across Bangladesh.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded bg-[#0B121E] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#B79A63] transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="w-11 h-11 rounded bg-[#0B121E] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#B79A63] transition-colors"
                title="Email Engr. Reza"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, "")}`}
                className="w-11 h-11 rounded bg-[#0B121E] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#B79A63] transition-colors"
                title="Telephone Direct"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.12em] font-semibold text-[#CBB077] block">
              Monograph Index
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">Chapter I: Biography</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">Chapter II: Career Ledger</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Chapter III: Selected Works</a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-white transition-colors">Chapter IV: Capabilities</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">Chapter V: Governance</a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.12em] font-semibold text-[#CBB077] block">
              Registry &amp; Discourse
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#mentorship" className="hover:text-white transition-colors">Chapter VI: Mentorship</a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors">Chapter VII: Publications</a>
              </li>
              <li>
                <a href="#credentials" className="hover:text-white transition-colors">Chapter VIII: Licensure</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Chapter X: Consultation</a>
              </li>
              <li>
                <a
                  href={personalInfo.resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CBB077] hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Executive CV (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Verification Registry */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.12em] font-semibold text-[#CBB077] block">
              Institutional Badges
            </span>
            <div className="space-y-2 text-[11px] text-slate-400 font-light">
              <div className="p-2.5 rounded bg-[#0B121E] border border-white/5">
                <span className="text-slate-200 font-medium block">PMI PMP® #3867623</span>
                Project Management Professional
              </div>
              <div className="p-2.5 rounded bg-[#0B121E] border border-white/5">
                <span className="text-slate-200 font-medium block">IEB Member M-25703</span>
                Institution of Engineers, Bangladesh
              </div>
              <div className="p-2.5 rounded bg-[#0B121E] border border-white/5">
                <span className="text-slate-200 font-medium block">BUET Civil &apos;08</span>
                Bangladesh Univ. of Eng &amp; Tech
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.fullName}. Architectural Portfolio Monograph. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-slate-600 hover:text-slate-400 transition-colors">
              CMS Portal
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Scroll to top of monograph"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#B79A63]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
