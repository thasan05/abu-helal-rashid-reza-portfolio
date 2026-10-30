"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, FileText } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { portfolioContent } from "@/data/content";

export default function Footer() {
  const { personalInfo } = portfolioContent;

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
              General Manager (Construction) &amp; Project Director at Edison Real Estate Limited. Over 17 years directing major residential condominiums, LEED commercial towers, and national infrastructure across Bangladesh.
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

              <a
                href={personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded bg-[#0B121E] border border-white/10 text-xs text-slate-300 hover:text-white hover:border-[#B79A63] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#B79A63]" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div>
            <div className="text-xs uppercase tracking-[0.1em] font-medium text-white mb-4">
              Sections
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  Executive Biography
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-white transition-colors">
                  Career Journey
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  Selected Projects
                </Link>
              </li>
              <li>
                <Link href="#expertise" className="hover:text-white transition-colors">
                  Strategic Capabilities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.1em] font-medium text-white mb-4">
              Leadership
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#philosophy" className="hover:text-white transition-colors">
                  Guiding Principles
                </Link>
              </li>
              <li>
                <Link href="#mentorship" className="hover:text-white transition-colors">
                  Community Mentorship
                </Link>
              </li>
              <li>
                <Link href="#insights" className="hover:text-white transition-colors">
                  Thought Leadership
                </Link>
              </li>
              <li>
                <Link href="#credentials" className="hover:text-white transition-colors">
                  Education &amp; Licensure
                </Link>
              </li>
            </ul>
          </div>

          {/* Colophon & Back to Top */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.1em] font-medium text-white mb-4">
                Colophon
              </div>
              <p className="text-slate-400 font-light text-xs leading-relaxed">
                Designed as an architectural monograph. Typeset in Playfair Display &amp; Inter. Built with Next.js &amp; Tailwind CSS.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] hover:text-white min-h-[44px] transition-colors self-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B79A63]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Notice & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <div>
            &copy; 2026 Engr. Abu Helal Rashid Reza. All rights reserved.
          </div>
          <div className="text-xs uppercase tracking-[0.08em] font-medium text-slate-500">
            Authentic Professional Record &bull; Dhaka, Bangladesh
          </div>
        </div>

      </div>
    </footer>
  );
}
