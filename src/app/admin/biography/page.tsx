import React from "react";
import { queryOne } from "@/lib/db/client";
import { updateExecutiveIntro } from "../cms-actions";
import { UserCheck, Save, Quote } from "lucide-react";

export default async function BiographyAdminPage() {
  const intro = (await queryOne(`SELECT * FROM executive_intro WHERE id = 'default'`)) || {};

  const paragraphsArray = Array.isArray(intro.paragraphs)
    ? intro.paragraphs
    : typeof intro.paragraphs === "string"
    ? JSON.parse(intro.paragraphs || "[]")
    : [];
  const paragraphsText = paragraphsArray.join("\n\n");

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter I &bull; Biography
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Executive Biography &amp; Narrative</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage the long-form biographical spread, corporate governance narrative, and authoritative executive pull-quote.
        </p>
      </div>

      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
          <UserCheck className="w-4 h-4 text-[#B79A63]" />
          <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
            Biographical Monograph Narrative
          </h2>
        </div>

        <form action={updateExecutiveIntro} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Chapter Label
              </label>
              <input
                type="text"
                name="chapterLabel"
                defaultValue={intro.chapter_label || "Chapter I • Executive Biography"}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Section Headline
              </label>
              <input
                type="text"
                name="headline"
                defaultValue={intro.headline || ""}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Subheading / Positioning Summary
            </label>
            <textarea
              name="subheading"
              defaultValue={intro.subheading || ""}
              rows={2}
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                Full Narrative Spread (Separate paragraphs with a blank line)
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {paragraphsArray.length} paragraphs loaded
              </span>
            </div>
            <textarea
              name="paragraphs"
              defaultValue={paragraphsText}
              rows={10}
              required
              className="w-full px-3.5 py-2.5 bg-[#070C14] border border-white/15 rounded text-sm text-slate-200 leading-relaxed font-light focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          {/* Pull Quote Box */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Quote className="w-4 h-4 text-[#B79A63]" />
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                Authoritative Executive Pull-Quote
              </h3>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Statement / Axiom
              </label>
              <textarea
                name="quoteStatement"
                defaultValue={intro.quote_statement || ""}
                rows={3}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Attribution &amp; Credentials
              </label>
              <input
                type="text"
                name="quoteAttribution"
                defaultValue={intro.quote_attribution || "Engr. Abu Helal Rashid Reza, PMP®"}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Biography Spread</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
