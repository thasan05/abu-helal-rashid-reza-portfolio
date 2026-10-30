import React from "react";
import Image from "next/image";
import { query, queryOne } from "@/lib/db/client";
import { updatePersonalDimension, savePersonalInterest, deletePersonalInterest } from "../cms-actions";
import DeleteActionButton from "../DeleteActionButton";
import { Activity, Plus, Save } from "lucide-react";

export default async function PersonalAdminPage() {
  const dimension = (await queryOne(`SELECT * FROM personal_dimension WHERE id = 'default'`)) || {};
  const interests = await query(`SELECT * FROM personal_interests ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter IX &bull; Personal Dimension
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">The Discipline of Endurance</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage athletic endurance records (Bangabandhu 15K Marathon), continuous leadership education, and civic contributions.
        </p>
      </div>

      {/* Intro Form */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#B79A63]" />
          <span>Discipline &amp; Philosophy Narrative</span>
        </h2>
        <form action={updatePersonalDimension} className="space-y-4">
          <textarea
            name="intro"
            defaultValue={dimension.intro || ""}
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
              <span>Update Intro</span>
            </button>
          </div>
        </form>
      </div>

      {/* Interests List */}
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200">
          Personal Dimensions &bull; Athletic &amp; Civic Pursuits ({interests.length})
        </h2>

        {interests.map((pi: any) => (
          <div key={pi.id} className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                {pi.image_url && (
                  <div className="relative w-12 h-12 rounded overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <Image src={pi.image_url} alt={pi.title} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <span className="font-serif text-lg text-white">{pi.title}</span>
                  <div className="text-xs text-slate-400">{pi.highlight}</div>
                </div>
              </div>
              <DeleteActionButton
                action={deletePersonalInterest}
                id={pi.id}
                confirmMessage={`Delete interest "${pi.title}"?`}
                className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
              />
            </div>

            <form action={savePersonalInterest} className="space-y-4">
              <input type="hidden" name="id" value={pi.id} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" name="title" defaultValue={pi.title} required placeholder="Title" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                <input type="text" name="highlight" defaultValue={pi.highlight || ""} placeholder="Highlight summary" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                <input type="text" name="iconName" defaultValue={pi.icon_name} required placeholder="Icon name" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
              </div>

              <textarea name="description" defaultValue={pi.description} rows={2} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <input type="text" name="imageUrl" defaultValue={pi.image_url || ""} placeholder="Image path (e.g. /images/reza-marathon-finisher.jpg)" className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
                </div>
                <div className="flex gap-2">
                  <input type="number" name="sortOrder" defaultValue={pi.sort_order} className="w-20 px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  <select name="isPublished" defaultValue={pi.is_published ? "true" : "false"} className="flex-1 px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white">
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Dimension</span>
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>

      {/* Add New Interest */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Dimension Interest</span>
        </h2>
        <form action={savePersonalInterest} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(interests.length + 1) * 10} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" name="title" placeholder="Interest Title" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="highlight" placeholder="Highlight Summary" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="iconName" placeholder="Icon Name (e.g. Trophy, Zap)" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
          </div>
          <textarea name="description" placeholder="Description..." rows={2} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          <input type="text" name="imageUrl" placeholder="Image URL (e.g. /images/reza-marathon-run.jpg)" className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Create Dimension</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
