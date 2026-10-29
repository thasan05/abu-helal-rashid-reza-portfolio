"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
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
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#101C2C]/95 backdrop-blur-md border-b border-[#B79A63]/20 shadow-xl shadow-black/20 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark */}
            <Link
              href="#"
              className="group flex flex-col focus:outline-none"
              onClick={closeMenu}
            >
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#CBB077] transition-colors">
                {portfolioContent.personalInfo.fullName}
              </span>
              <span className="text-[11px] font-sans tracking-widest text-[#B79A63] uppercase">
                Executive Leader & Civil Engineer
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-slate-300 hover:text-[#CBB077] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B79A63] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions: Resume & Let's Connect */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href={portfolioContent.personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-white px-3.5 py-2 rounded border border-slate-700 hover:border-[#B79A63]/50 transition-all"
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

            {/* Mobile menu trigger */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link
                href="#contact"
                className="text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] px-3 py-1.5 rounded sm:hidden"
              >
                Connect
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#B79A63]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={closeMenu}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0B131F] border-l border-[#B79A63]/20 p-6 flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <span className="font-serif text-lg font-bold text-white">Navigation</span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-1.5 text-slate-400 hover:text-white rounded"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-sm uppercase tracking-wider text-slate-300 hover:text-[#B79A63] py-1 border-b border-slate-800/60"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <a
                href={portfolioContent.personalInfo.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs uppercase tracking-wider font-medium text-slate-200 border border-slate-700 rounded hover:border-[#B79A63]"
              >
                <FileText className="w-4 h-4 text-[#B79A63]" />
                <span>Download Resume (PDF)</span>
              </a>

              <Link
                href="#contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs uppercase tracking-wider font-semibold text-[#101C2C] bg-[#B79A63] rounded"
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
