import React from "react";
import Image from "next/image";
import { query, queryOne } from "@/lib/db/client";
import { updateMentorshipSettings, saveMentorshipActivity, deleteMentorshipActivity } from "../cms-actions";
import DeleteActionButton from "../DeleteActionButton";
import { Users2, Plus, Save } from "lucide-react";

export default async function MentorshipAdminPage() {
  const settings = (await queryOne(`SELECT * FROM mentorship_settings WHERE id = 'default'`)) || {};
  const activities = await query(`SELECT * FROM mentorship_activities ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter VI &bull; Community
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Community Leadership &amp; Mentorship</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage executive mentorship initiatives, PMI Bangladesh chapter contributions, and youth career transitions.
        </p>
      </div>

      {/* Overview Form */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-white mb-4 flex items-center gap-2">
          <Users2 className="w-4 h-4 text-[#B79A63]" />
          <span>Mentorship Philosophy &amp; Overview</span>
        </h2>
        <form action={updateMentorshipSettings} className="space-y-4">
          <textarea
            name="overview"
            defaultValue={settings.overview || ""}
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
              <span>Update Overview</span>
            </button>
          </div>
        </form>
      </div>

      {/* Activities List */}
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200">
          Community Initiatives ({activities.length})
        </h2>

        {activities.map((act: any) => (
          <div key={act.id} className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                {act.image_url && (
                  <div className="relative w-12 h-12 rounded overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <Image src={act.image_url} alt={act.role} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <span className="font-serif text-lg text-white">{act.role}</span>
                  <div className="text-xs text-slate-400">{act.organization} &bull; {act.timeframe}</div>
                </div>
              </div>
              <DeleteActionButton
                action={deleteMentorshipActivity}
                id={act.id}
                confirmMessage={`Delete activity "${act.role}"?`}
                className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
              />
            </div>

            <form action={saveMentorshipActivity} className="space-y-4">
              <input type="hidden" name="id" value={act.id} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" name="organization" defaultValue={act.organization} required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                <input type="text" name="role" defaultValue={act.role} required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                <input type="text" name="timeframe" defaultValue={act.timeframe} required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="focus" defaultValue={act.focus || ""} placeholder="Focus area" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                <input type="text" name="impactMetrics" defaultValue={act.impact_metrics || ""} placeholder="Impact metrics" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
              </div>

              <textarea name="description" defaultValue={act.description} rows={2} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="imageUrl" defaultValue={act.image_url || ""} placeholder="Image path (e.g. /images/reza-lcb-panel.jpg)" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
                <input type="text" name="imageCaption" defaultValue={act.image_caption || ""} placeholder="Image caption" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="number" name="sortOrder" defaultValue={act.sort_order} className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                <select name="isPublished" defaultValue={act.is_published ? "true" : "false"} className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white">
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Activity</span>
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>

      {/* Add New Activity */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Mentorship Initiative</span>
        </h2>
        <form action={saveMentorshipActivity} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(activities.length + 1) * 10} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" name="organization" placeholder="Organization" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="role" placeholder="Role / Position" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="timeframe" placeholder="Timeframe (e.g. 2026 - Present)" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          </div>
          <textarea name="description" placeholder="Description..." rows={2} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="imageUrl" placeholder="Image URL (e.g. /images/reza-lcb-panel.jpg)" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
            <input type="text" name="imageCaption" placeholder="Image Caption" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Create Initiative</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
