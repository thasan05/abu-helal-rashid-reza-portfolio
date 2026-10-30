import React from "react";
import { query } from "@/lib/db/client";
import { saveCareerRole, deleteCareerRole } from "../cms-actions";
import DeleteActionButton from "../DeleteActionButton";
import { Briefcase, Plus, Save, MapPin, CheckCircle2 } from "lucide-react";

export default async function TimelineAdminPage() {
  const roles = await query(`SELECT * FROM career_roles ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
            Chapter II &bull; Career Ledger
          </div>
          <h1 className="font-serif text-3xl font-normal text-white">Career Journey &amp; Timeline</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
            Manage the chronological 17-year progression across Edison Real Estate, Rangs Properties, AWR Developments, VOLUMEZERO, and Apan Builders.
          </p>
        </div>
      </div>

      {/* Existing Roles List with Accordion / Edit Cards */}
      <div className="space-y-6">
        {roles.map((role: any) => {
          const resp = Array.isArray(role.responsibilities)
            ? role.responsibilities.join("\n")
            : JSON.parse(role.responsibilities || "[]").join("\n");
          const ach = Array.isArray(role.key_achievements)
            ? role.key_achievements.join("\n")
            : JSON.parse(role.key_achievements || "[]").join("\n");
          const tags = Array.isArray(role.tags)
            ? role.tags.join(", ")
            : JSON.parse(role.tags || "[]").join(", ");

          return (
            <div
              key={role.id}
              className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B79A63]" />
                  <span className="font-serif text-xl font-normal text-white">
                    {role.role_title} &bull; {role.organization}
                  </span>
                  {role.is_current && (
                    <span className="px-2 py-0.5 rounded bg-[#142236] text-[10px] uppercase font-semibold text-[#CBB077] border border-white/10">
                      Active Tenure
                    </span>
                  )}
                </div>

                <DeleteActionButton
                  action={deleteCareerRole}
                  id={role.id}
                  confirmMessage={`Delete role at ${role.organization} permanently?`}
                  title="Delete role"
                />
              </div>

              <form action={saveCareerRole} className="space-y-5">
                <input type="hidden" name="id" value={role.id} />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      defaultValue={role.organization}
                      required
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Executive Role Title
                    </label>
                    <input
                      type="text"
                      name="roleTitle"
                      defaultValue={role.role_title}
                      required
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Tenure Years / Span
                    </label>
                    <input
                      type="text"
                      name="tenure"
                      defaultValue={role.tenure}
                      required
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={role.location || ""}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Current Position?
                    </label>
                    <select
                      name="isCurrent"
                      defaultValue={role.is_current ? "true" : "false"}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    >
                      <option value="false">Past Role</option>
                      <option value="true">Current Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Display Sort Order
                    </label>
                    <input
                      type="number"
                      name="sortOrder"
                      defaultValue={role.sort_order}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Publishing State
                    </label>
                    <select
                      name="isPublished"
                      defaultValue={role.is_published ? "true" : "false"}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    >
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                    Executive Role Summary
                  </label>
                  <textarea
                    name="summary"
                    defaultValue={role.summary || ""}
                    rows={2}
                    className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Core Responsibilities (One per line)
                    </label>
                    <textarea
                      name="responsibilities"
                      defaultValue={resp}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Key Verified Achievements (One per line)
                    </label>
                    <textarea
                      name="keyAchievements"
                      defaultValue={ach}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Tags / Skill Chips (Comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      defaultValue={tags}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Verification Ledger Status
                    </label>
                    <input
                      type="text"
                      name="verificationStatus"
                      defaultValue={role.verification_status || "Verified via Resume & Public Records"}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Role</span>
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>

      {/* Add New Career Role Form */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Career Role to Timeline</span>
        </h2>

        <form action={saveCareerRole} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(roles.length + 1) * 10} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="organization"
              placeholder="Organization Name"
              required
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <input
              type="text"
              name="roleTitle"
              placeholder="Executive Role Title"
              required
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <input
              type="text"
              name="tenure"
              placeholder="Tenure (e.g. 2026 - Present)"
              required
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. Dhaka, Bangladesh)"
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <select
              name="isCurrent"
              defaultValue="false"
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            >
              <option value="false">Past Role</option>
              <option value="true">Active Role</option>
            </select>
          </div>

          <textarea
            name="summary"
            placeholder="Role Executive Summary..."
            rows={2}
            className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <textarea
              name="responsibilities"
              placeholder="Responsibilities (One per line)..."
              rows={3}
              className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <textarea
              name="keyAchievements"
              placeholder="Key Achievements (One per line)..."
              rows={3}
              className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Career Role</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
