"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { portfolioContent } from "@/data/content";

const navItems = [
  { label: "Biography", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Expertise", href: "#expertise", id: "expertise" },
  { label: "Leadership", href: "#philosophy", id: "philosophy" },
  { label: "Community", href: "#mentorship", id: "mentorship" },
  { label: "Credentials", href: "#credentials", id: "credentials" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personalInfo } = portfolioContent;

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
  }, []);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to Main Content Accessibility Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#B79A63] focus:text-[#070C14] focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider focus:rounded shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#070C14]/94 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/50 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Architectural Wordmark */}
            <Link
              href="#"
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B79A63]"
              aria-label="Engr. Abu Helal Rashid Reza Home"
            >
              <span className="font-serif text-base sm:text-lg font-normal tracking-wide text-white group-hover:text-[#CBB077] transition-colors">
                Abu Helal Rashid Reza
              </span>
              <span className="text-xs tracking-[0.16em] uppercase text-[#B79A63] font-medium">
                BUET Civil &bull; PMP® &bull; Project Director
              </span>
            </Link>

            {/* Desktop Navigation with Active Scroll-Spy */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs uppercase tracking-wider transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B79A63] ${
                      isActive
                        ? "text-[#CBB077] font-medium"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#B79A63]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-white border-b border-slate-700 hover:border-[#B79A63] pb-0.5 transition-colors min-h-[44px]"
                title="Download Official Executive Resume (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-[#B79A63]" />
                <span>Resume PDF</span>
              </a>

              <Link
                href="#contact"
                className="px-4 py-2 min-h-[44px] flex items-center justify-center rounded bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm"
              >
                Inquire
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B79A63]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#070C14]/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-24 pb-12 px-6"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-slate-200 hover:text-[#CBB077] tracking-tight transition-colors py-1.5 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href={personalInfo.resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded border border-white/15 text-xs uppercase tracking-wider text-white"
            >
              <FileText className="w-4 h-4 text-[#B79A63]" />
              <span>Download Executive Resume (PDF)</span>
            </a>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 rounded bg-[#B79A63] text-[#070C14] text-xs font-semibold uppercase tracking-wider shadow"
            >
              <span>Contact Engr. Reza</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
