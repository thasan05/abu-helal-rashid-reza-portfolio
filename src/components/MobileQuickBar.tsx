"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare, FileText, Send, ChevronUp } from "lucide-react";
import { portfolioContent } from "@/data/content";

export default function MobileQuickBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { personalInfo } = portfolioContent;

  useEffect(() => {
    const handleScroll = () => {
      // Show floating quick bar once user scrolls past initial hero headline (approx 180px)
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  const cleanPhone = personalInfo.phone.replace(/[^0-9+]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}`;

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="sm:hidden fixed bottom-3 inset-x-3 z-40 transition-all duration-300 animate-fadeIn"
    >
      <div className="bg-[#0B131F]/95 backdrop-blur-md border border-[#B79A63]/40 rounded-2xl px-3 py-2 shadow-2xl shadow-black/60 flex items-center justify-between gap-1.5">
        
        {/* Direct Call */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 active:bg-white/10 active:text-[#CBB077] transition-colors"
          title="Call Engr. Reza directly"
        >
          <Phone className="w-4 h-4 text-[#B79A63]" />
          <span className="text-[10px] font-medium uppercase tracking-wider mt-0.5">Call</span>
        </a>

        {/* Direct WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 active:bg-white/10 active:text-emerald-400 transition-colors"
          title="Direct WhatsApp Message"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-medium uppercase tracking-wider mt-0.5">WhatsApp</span>
        </a>

        {/* Download Resume PDF */}
        <a
          href={personalInfo.resumePdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 active:bg-white/10 active:text-[#CBB077] transition-colors"
          title="Download Executive Resume"
        >
          <FileText className="w-4 h-4 text-[#B79A63]" />
          <span className="text-[10px] font-medium uppercase tracking-wider mt-0.5">Resume</span>
        </a>

        {/* Connect Action Button */}
        <Link
          href="#contact"
          className="flex-[1.2] flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[#B79A63] active:bg-[#CBB077] text-[#101C2C] font-bold shadow-md transition-transform active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="text-[11px] uppercase tracking-wider">Connect</span>
        </Link>

        {/* Quick Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="p-2 rounded-xl text-slate-400 hover:text-white active:bg-white/10"
          aria-label="Scroll to top of page"
        >
          <ChevronUp className="w-4 h-4 text-[#B79A63]" />
        </button>

      </div>
    </aside>
  );
}
