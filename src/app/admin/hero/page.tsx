import React from "react";
import { query, queryOne } from "@/lib/db/client";
import { updateHeroSettings, saveHeadlineMetric, deleteHeadlineMetric } from "../cms-actions";
import DeleteActionButton from "../DeleteActionButton";
import { Sparkles, Save, Plus, ArrowUpDown, Eye, EyeOff } from "lucide-react";

export default async function HeroAdminPage() {
  const hero = (await queryOne(`SELECT * FROM hero_settings WHERE id = 'default'`)) || {};
  const metrics = await query(`SELECT * FROM headline_metrics ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Landing Monograph
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Hero Opening Spread</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Configure the hero monograph titles, volume edition tag, strategic headline, calls-to-action, and verified headline metrics.
        </p>
      </div>

      {/* Hero Monograph Form */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
          <Sparkles className="w-4 h-4 text-[#B79A63]" />
          <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
            Monograph Text &amp; Directives
          </h2>
        </div>

        <form action={updateHeroSettings} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Monograph Volume
              </label>
              <input
                type="text"
                name="monographVolume"
                defaultValue={hero.monograph_volume || "Vol. XVII"}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Monograph Edition Year
              </label>
              <input
                type="text"
                name="monographYear"
                defaultValue={hero.monograph_year || "2026 Edition"}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Executive Availability Status
              </label>
              <input
                type="text"
                name="availabilityStatus"
                defaultValue={hero.availability_status || "Open for Select Executive Leadership & Strategic Consultation"}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Dominant Hero Headline
            </label>
            <input
              type="text"
              name="headline"
              defaultValue={hero.headline || ""}
              required
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Hero Supporting Subheadline
            </label>
            <textarea
              name="subheadline"
              defaultValue={hero.subheadline || ""}
              rows={2}
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-white/10">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Primary CTA Label &amp; Destination
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="ctaPrimaryLabel"
                  defaultValue={hero.cta_primary_label || "Executive CV (PDF)"}
                  className="px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                />
                <input
                  type="text"
                  name="ctaPrimaryUrl"
                  defaultValue={hero.cta_primary_url || "/docs/Abu_Helal_Rashid_Reza_Executive_Resume.pdf"}
                  className="px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Secondary CTA Label &amp; Destination
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="ctaSecondaryLabel"
                  defaultValue={hero.cta_secondary_label || "Initiate Dialogue"}
                  className="px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                />
                <input
                  type="text"
                  name="ctaSecondaryUrl"
                  defaultValue={hero.cta_secondary_url || "#contact"}
                  className="px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Monograph</span>
            </button>
          </div>
        </form>
      </div>

      {/* Headline Metrics Management */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
              Headline Verified Metrics
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Numerical proof points displayed prominently underneath the monograph spread.
            </p>
          </div>
        </div>

        {/* List of Existing Metrics */}
        <div className="space-y-3 mb-8">
          {metrics.map((m: any) => (
            <form
              key={m.id}
              action={saveHeadlineMetric}
              className="p-4 bg-[#070C14] border border-white/10 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <input type="hidden" name="id" value={m.id} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full sm:w-auto">
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-mono">Value</label>
                  <input
                    type="text"
                    name="value"
                    defaultValue={m.value}
                    required
                    className="w-full px-2.5 py-1.5 bg-[#0B121E] border border-white/10 rounded text-sm font-semibold text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-mono">Label</label>
                  <input
                    type="text"
                    name="label"
                    defaultValue={m.label}
                    required
                    className="w-full px-2.5 py-1.5 bg-[#0B121E] border border-white/10 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-mono">Sublabel / Description</label>
                  <input
                    type="text"
                    name="sublabel"
                    defaultValue={m.sublabel || ""}
                    className="w-full px-2.5 py-1.5 bg-[#0B121E] border border-white/10 rounded text-xs text-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="w-16">
                  <label className="block text-[10px] text-slate-500 uppercase font-mono">Order</label>
                  <input
                    type="number"
                    name="sortOrder"
                    defaultValue={m.sort_order}
                    className="w-full px-2 py-1.5 bg-[#0B121E] border border-white/10 rounded text-xs text-center text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 uppercase font-mono">State</label>
                  <select
                    name="isPublished"
                    defaultValue={m.is_published ? "true" : "false"}
                    className="px-2 py-1.5 bg-[#0B121E] border border-white/10 rounded text-xs text-white"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-4 sm:pt-0">
                  <button
                    type="submit"
                    title="Save metric changes"
                    className="px-3 py-1.5 bg-[#142236] hover:bg-[#1C314E] border border-white/15 rounded text-xs text-[#CBB077] transition-colors"
                  >
                    Save
                  </button>
                  <DeleteActionButton
                    action={deleteHeadlineMetric}
                    id={m.id}
                    confirmMessage={`Delete headline metric "${m.label}" permanently?`}
                    title="Delete metric"
                  />
                </div>
              </div>
            </form>
          ))}
        </div>

        {/* Add New Metric Form */}
        <div className="pt-6 border-t border-white/10">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-3">
            Add New Headline Metric
          </h3>
          <form
            action={saveHeadlineMetric}
            className="p-4 bg-[#070C14] border border-dashed border-white/20 rounded-lg flex flex-col sm:flex-row items-end gap-3"
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <input
                type="text"
                name="value"
                placeholder="e.g. 50+"
                required
                className="px-3 py-2 bg-[#0B121E] border border-white/10 rounded text-xs text-white placeholder-slate-600"
              />
              <input
                type="text"
                name="label"
                placeholder="e.g. Completed Projects"
                required
                className="px-3 py-2 bg-[#0B121E] border border-white/10 rounded text-xs text-white placeholder-slate-600"
              />
              <input
                type="text"
                name="sublabel"
                placeholder="e.g. Delivered on Schedule"
                className="px-3 py-2 bg-[#0B121E] border border-white/10 rounded text-xs text-white placeholder-slate-600"
              />
            </div>
            <input type="hidden" name="sortOrder" value={(metrics.length + 1) * 10} />
            <input type="hidden" name="isPublished" value="true" />
            <button
              type="submit"
              className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Metric</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
