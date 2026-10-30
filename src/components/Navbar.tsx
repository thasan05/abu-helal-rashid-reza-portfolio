"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { portfolioContent } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface NavbarProps {
  data?: DatabasePortfolioData;
}

const DEFAULT_NAV_ITEMS = [
  { label: "Biography", href: "#about", id: "about", sectionKey: "biography" },
  { label: "Experience", href: "#experience", id: "experience", sectionKey: "timeline" },
  { label: "Projects", href: "#projects", id: "projects", sectionKey: "projects" },
  { label: "Expertise", href: "#expertise", id: "expertise", sectionKey: "expertise" },
  { label: "Leadership", href: "#philosophy", id: "philosophy", sectionKey: "philosophy" },
  { label: "Community", href: "#mentorship", id: "mentorship", sectionKey: "mentorship" },
  { label: "Credentials", href: "#credentials", id: "credentials", sectionKey: "credentials" },
  { label: "Contact", href: "#contact", id: "contact", sectionKey: "contact" },
];

export default function Navbar({ data }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const personalInfo = data?.personalInfo || portfolioContent.personalInfo;
  const sectionConfigs = data?.sectionConfigs || [];

  // Filter navItems according to CMS visibility configurations
  const navItems = DEFAULT_NAV_ITEMS.filter((item) => {
    if (sectionConfigs.length === 0) return true;
    const config = sectionConfigs.find((c) => c.sectionKey === item.sectionKey);
    return config ? config.isVisible : true;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy observer for active navigation section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070C14]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Identity Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Engr. Abu Helal Rashid Reza Home"
          >
            <div className="w-9 h-9 rounded-[4px] bg-[#142236] border border-white/15 group-hover:border-[#B79A63] flex items-center justify-center transition-colors shadow-sm">
              <span className="font-serif text-sm font-semibold tracking-wider text-[#CBB077]">
                RR
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-[#CBB077] transition-colors leading-tight tracking-tight">
                {personalInfo.fullName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400 group-hover:text-slate-300 font-medium">
                {personalInfo.currentRole}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Ledger */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium tracking-[0.08em] uppercase"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-2 rounded-[4px] transition-all duration-200 ${
                    isActive
                      ? "text-[#CBB077] bg-white/[0.04] font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={personalInfo.resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-[#142236] hover:bg-[#18283E] border border-white/15 text-slate-200 hover:text-white text-xs font-medium uppercase tracking-wider transition-colors min-h-[40px]"
            >
              <FileText className="w-3.5 h-3.5 text-[#B79A63]" />
              <span>CV (PDF)</span>
            </a>

            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm min-h-[40px]"
            >
              <span>Consult</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-[4px] bg-[#142236] border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-[#070C14]/98 backdrop-blur-xl border-t border-white/10 z-40 flex flex-col justify-between p-6 overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            <span className="text-xs uppercase tracking-[0.14em] text-[#CBB077] font-semibold mb-3 px-3">
              Editorial Index
            </span>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-[4px] text-sm text-slate-200 hover:text-[#CBB077] hover:bg-white/[0.04] uppercase tracking-wider font-medium flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-600 font-mono">#</span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href={personalInfo.resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[4px] bg-[#142236] border border-white/10 text-slate-200 text-xs font-semibold uppercase tracking-wider"
            >
              <FileText className="w-4 h-4 text-[#B79A63]" />
              <span>Download Executive CV (PDF)</span>
            </a>

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[4px] bg-[#B79A63] text-[#070C14] text-xs font-bold uppercase tracking-wider"
            >
              <span>Initiate Executive Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
