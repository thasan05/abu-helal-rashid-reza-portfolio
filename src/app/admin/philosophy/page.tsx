import React from "react";
import { query, queryOne } from "@/lib/db/client";
import { updateLeadershipPhilosophy, saveLeadershipPrinciple, deleteLeadershipPrinciple } from "../cms-actions";
import { Compass, Plus, Trash2, Save, Quote } from "lucide-react";

export default async function PhilosophyAdminPage() {
  const philo = (await queryOne(`SELECT * FROM leadership_philosophy WHERE id = 'default'`)) || {};
  const principles = await query(`SELECT * FROM leadership_principles ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter V &bull; Governance
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Leadership Philosophy &amp; Principles</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage core ethical axioms, structural integrity governance, and human-centric corporate stewardship.
        </p>
      </div>

      {/* Lead Statement */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-white mb-4 flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#B79A63]" />
          <span>Core Governance Lead Statement</span>
        </h2>
        <form action={updateLeadershipPhilosophy} className="space-y-4">
          <textarea
            name="leadStatement"
            defaultValue={philo.lead_statement || ""}
            rows={3}
            required
            className="w-full px-3.5 py-2.5 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Statement</span>
            </button>
          </div>
        </form>
      </div>

      {/* Principles List */}
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200">
          Core Operating Principles ({principles.length})
        </h2>

        {principles.map((pr: any) => (
          <div key={pr.id} className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-serif text-lg text-white">{pr.headline}</span>
              <button
                type="button"
                onClick={async () => {
                  if (confirm(`Delete principle "${pr.headline}"?`)) {
                    await deleteLeadershipPrinciple(pr.id);
                  }
                }}
                className="p-1.5 text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <form action={saveLeadershipPrinciple} className="space-y-4">
              <input type="hidden" name="id" value={pr.id} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Headline</label>
                  <input type="text" name="headline" defaultValue={pr.headline} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Core Value</label>
                  <input type="text" name="coreValue" defaultValue={pr.core_value} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 mb-1">Philosophical Reflection</label>
                <textarea name="reflection" defaultValue={pr.reflection} rows={3} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase text-slate-400 mb-1">Optional Axiom / Quote</label>
                  <input type="text" name="quote" defaultValue={pr.quote || ""} className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Sort Order</label>
                  <input type="number" name="sortOrder" defaultValue={pr.sort_order} className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                </div>
              </div>
              <input type="hidden" name="isPublished" value="true" />

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Principle</span>
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>

      {/* Add New Principle */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Leadership Principle</span>
        </h2>
        <form action={saveLeadershipPrinciple} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(principles.length + 1) * 10} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="headline" placeholder="Principle Headline" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="coreValue" placeholder="Core Value (e.g. Ethical Governance)" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          </div>
          <textarea name="reflection" placeholder="Philosophical Reflection..." rows={3} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          <input type="text" name="quote" placeholder="Optional Quote / Axiom" className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Create Principle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
