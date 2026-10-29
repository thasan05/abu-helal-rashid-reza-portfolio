"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText, Phone, Mail, ChevronRight } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { portfolioContent } from "@/data/content";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Expertise", href: "#expertise" },
  { name: "Projects", href: "#projects" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Mentorship", href: "#mentorship" },
  { name: "Insights", href: "#insights" },
  { name: "Credentials", href: "#credentials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#101C2C]/95 backdrop-blur-md border-b border-[#B79A63]/20 shadow-xl shadow-black/25 py-3 sm:py-3.5"
            : "bg-transparent py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Wordmark */}
            <Link
              href="#"
              className="group flex flex-col focus:outline-none min-w-0"
              onClick={closeMenu}
            >
              <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-white group-hover:text-[#CBB077] transition-colors truncate">
                {portfolioContent.personalInfo.fullName}
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-wider sm:tracking-widest text-[#B79A63] uppercase truncate">
                Executive Leader &bull; Civil Engineer
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
              {navLinks.slice(0, 8).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-slate-300 hover:text-[#CBB077] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B79A63] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions: Resume & Let's Connect */}
            <div className="hidden sm:flex items-center space-x-3 shrink-0">
              <a
                href={portfolioContent.personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-white px-3.5 py-2 rounded border border-slate-700 hover:border-[#B79A63]/50 transition-all active:scale-95"
                title="Download Executive Resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-[#B79A63]" />
                <span>Resume</span>
              </a>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] px-4 py-2.5 rounded shadow-sm hover:shadow-md hover:shadow-[#B79A63]/20 transition-all transform active:scale-95"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile menu trigger & Quick Connect */}
            <div className="flex items-center space-x-2 lg:hidden shrink-0">
              <Link
                href="#contact"
                className="text-[11px] font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] active:bg-[#CBB077] px-3 py-2 rounded sm:hidden min-h-[38px] flex items-center justify-center shadow-sm"
              >
                Connect
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-slate-300 hover:text-white active:bg-white/10 rounded-lg focus:outline-none transition-colors"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#B79A63]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Enhanced Touch Usability */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop with fade animation */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer content: slides in smoothly, thumb-friendly */}
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#0B131F] border-l border-[#B79A63]/30 p-5 sm:p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                <div>
                  <span className="font-serif text-lg font-bold text-white block">
                    {portfolioContent.personalInfo.fullName}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#B79A63]">
                    Navigation Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white active:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-[#B79A63]" />
                </button>
              </div>

              {/* Navigation Links with large tap targets */}
              <nav className="flex flex-col space-y-1 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between text-sm uppercase tracking-wider text-slate-200 hover:text-[#B79A63] active:bg-[#18283E] px-3 py-3 rounded-lg border-b border-slate-800/40 transition-colors min-h-[48px]"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </Link>
                ))}
              </nav>

              {/* Direct Quick Communication Bar inside Drawer */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Direct Channels
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${portfolioContent.personalInfo.phone.replace(/\s+/g, "")}`}
                    className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#18283E] border border-slate-800 hover:border-[#B79A63] text-slate-300 min-h-[48px] active:bg-[#223753]"
                    title="Direct Phone Call"
                  >
                    <Phone className="w-4 h-4 text-[#B79A63] mb-1" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Call</span>
                  </a>
                  <a
                    href={`mailto:${portfolioContent.personalInfo.email}`}
                    className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#18283E] border border-slate-800 hover:border-[#B79A63] text-slate-300 min-h-[48px] active:bg-[#223753]"
                    title="Direct Email"
                  >
                    <Mail className="w-4 h-4 text-[#B79A63] mb-1" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Email</span>
                  </a>
                  <a
                    href={portfolioContent.personalInfo.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#18283E] border border-slate-800 hover:border-[#B79A63] text-slate-300 min-h-[48px] active:bg-[#223753]"
                    title="LinkedIn Profile"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[#B79A63] mb-1" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-5 mt-6 border-t border-slate-800 space-y-2.5">
              <a
                href={portfolioContent.personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-xs uppercase tracking-wider font-semibold text-slate-200 border border-slate-700 rounded-lg hover:border-[#B79A63] active:bg-[#18283E] transition-colors min-h-[48px]"
              >
                <FileText className="w-4 h-4 text-[#B79A63]" />
                <span>Download Resume (PDF)</span>
              </a>

              <Link
                href="#contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-xs uppercase tracking-wider font-bold text-[#101C2C] bg-[#B79A63] active:bg-[#CBB077] rounded-lg shadow-md transition-colors min-h-[48px]"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
