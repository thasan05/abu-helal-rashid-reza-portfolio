import React from "react";
import { query } from "@/lib/db/client";
import { saveSectionConfig } from "../cms-actions";
import { Sliders, Eye, EyeOff, Save, ArrowUpDown } from "lucide-react";

export default async function LayoutConfigAdminPage() {
  const sections = await query(`SELECT * FROM section_configurations ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Website Structure
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Section Visibility &amp; Ordering</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Customize the monograph reading experience by toggling section visibility on or off and adjusting display order.
        </p>
      </div>

      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#B79A63]" />
            <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
              Homepage Section Directives ({sections.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Changes reflect immediately upon save
          </span>
        </div>

        <div className="space-y-3">
          {sections.map((sec: any) => (
            <form
              key={sec.section_key}
              action={saveSectionConfig}
              className="p-4 bg-[#070C14] border border-white/10 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <input type="hidden" name="sectionKey" value={sec.section_key} />
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${sec.is_visible ? "bg-emerald-500" : "bg-slate-600"}`} />
                <div>
                  <span className="font-serif text-base text-white">{sec.display_name}</span>
                  <div className="text-[11px] text-slate-400 font-mono">ID: #{sec.section_key}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="flex items-center gap-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Order</label>
                  <input
                    type="number"
                    name="sortOrder"
                    defaultValue={sec.sort_order}
                    className="w-16 px-2 py-1 bg-[#0B121E] border border-white/15 rounded text-xs text-center text-white"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Visibility</label>
                  <select
                    name="isVisible"
                    defaultValue={sec.is_visible ? "true" : "false"}
                    className="px-2.5 py-1 bg-[#0B121E] border border-white/15 rounded text-xs text-white"
                  >
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-3 py-1 bg-[#142236] hover:bg-[#1C314E] border border-white/15 rounded text-xs text-[#CBB077] transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
