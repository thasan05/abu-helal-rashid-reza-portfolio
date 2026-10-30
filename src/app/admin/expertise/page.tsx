import React from "react";
import { query } from "@/lib/db/client";
import { saveExpertiseArea, deleteExpertiseArea } from "../cms-actions";
import { Wrench, Plus, Trash2, Save } from "lucide-react";

export default async function ExpertiseAdminPage() {
  const areas = await query(`SELECT * FROM expertise_areas ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter IV &bull; Capabilities Matrix
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Strategic Expertise Domains</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage core competencies spanning Structural Engineering Rigor, C-Suite Corporate P&amp;L Stewardship, and Mega-Project Governance.
        </p>
      </div>

      <div className="space-y-6">
        {areas.map((area: any) => {
          const caps = Array.isArray(area.capabilities)
            ? area.capabilities.join("\n")
            : JSON.parse(area.capabilities || "[]").join("\n");

          return (
            <div key={area.id} className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B79A63]" />
                  <span className="font-serif text-xl text-white">{area.title}</span>
                  <span className="text-xs text-slate-400 font-mono">({area.icon_name})</span>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    if (confirm(`Delete capability "${area.title}"?`)) {
                      await deleteExpertiseArea(area.id);
                    }
                  }}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <form action={saveExpertiseArea} className="space-y-4">
                <input type="hidden" name="id" value={area.id} />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">Domain Title</label>
                    <input type="text" name="title" defaultValue={area.title} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">Subtitle</label>
                    <input type="text" name="subtitle" defaultValue={area.subtitle || ""} className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">Icon Name (Lucide)</label>
                    <input type="text" name="iconName" defaultValue={area.icon_name} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">Executive Description</label>
                  <textarea name="description" defaultValue={area.description} rows={2} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">Specific Capabilities (One per line)</label>
                  <textarea name="capabilities" defaultValue={caps} rows={3} className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">Sort Order</label>
                    <input type="number" name="sortOrder" defaultValue={area.sort_order} className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">State</label>
                    <select name="isPublished" defaultValue={area.is_published ? "true" : "false"} className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white">
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Area</span>
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>

      {/* Add New Area */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Expertise Area</span>
        </h2>
        <form action={saveExpertiseArea} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(areas.length + 1) * 10} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" name="title" placeholder="Domain Title" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="subtitle" placeholder="Subtitle" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="iconName" placeholder="Icon Name (e.g. Shield, Scale, HardHat)" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          </div>
          <textarea name="description" placeholder="Description..." rows={2} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          <textarea name="capabilities" placeholder="Capabilities (One per line)..." rows={3} className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Create Capability Area</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
