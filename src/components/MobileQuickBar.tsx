"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { portfolioContent } from "@/data/content";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface MobileQuickBarProps {
  data?: DatabasePortfolioData;
}

export default function MobileQuickBar({ data }: MobileQuickBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const personalInfo = data?.personalInfo || portfolioContent.personalInfo;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const cleanPhone = personalInfo.phone.replace(/[^0-9+]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}`;

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="sm:hidden fixed bottom-4 inset-x-4 z-40"
    >
      <div className="bg-[#070C14]/95 backdrop-blur-md border border-white/15 rounded-xl p-2 shadow-2xl flex items-center justify-between gap-2">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 min-h-[44px] rounded-lg bg-[#0B121E] border border-white/10 text-xs font-medium uppercase tracking-[0.08em] text-slate-200 active:bg-white/10"
        >
          <Phone className="w-3.5 h-3.5 text-[#B79A63]" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 min-h-[44px] rounded-lg bg-[#0B121E] border border-white/10 text-xs font-medium uppercase tracking-[0.08em] text-slate-200 active:bg-white/10"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="#contact"
          className="flex-1 flex items-center justify-center py-2.5 min-h-[44px] rounded-lg bg-[#B79A63] text-[#070C14] text-xs font-semibold uppercase tracking-wider"
        >
          Inquire
        </Link>
      </div>
    </aside>
  );
}
