import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#101C2C] text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded bg-[#18283E] text-[#B79A63] text-xs font-mono uppercase tracking-widest border border-[#B79A63]/30">
          404 &bull; Page Not Found
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white">
          Avenue Not Located
        </h1>

        <p className="text-slate-300 text-sm font-light leading-relaxed">
          The requested page or resource could not be found within this executive portfolio. Please return to the executive profile.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
