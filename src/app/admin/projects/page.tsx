import React from "react";
import Image from "next/image";
import { query } from "@/lib/db/client";
import { saveProject, deleteProject } from "../cms-actions";
import DeleteActionButton from "../DeleteActionButton";
import { Building2, Plus, Save, Star, MapPin, CheckCircle2 } from "lucide-react";

export default async function ProjectsAdminPage() {
  const projects = await query(`SELECT * FROM projects ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
            Chapter III &bull; Landmark Portfolio
          </div>
          <h1 className="font-serif text-3xl font-normal text-white">Landmark Projects Showcase</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
            Manage landmark high-rise commercial towers, master-planned condominiums, defense installations, and industrial zones.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {projects.map((proj: any) => {
          const highlights = Array.isArray(proj.verified_highlights)
            ? proj.verified_highlights.join("\n")
            : JSON.parse(proj.verified_highlights || "[]").join("\n");

          return (
            <div
              key={proj.id}
              className={`bg-[#0B121E] border rounded-xl p-6 sm:p-8 space-y-6 relative transition-colors ${
                proj.is_flagship ? "border-[#B79A63]/60 bg-[#0B1322]" : "border-white/10"
              }`}
            >
              {/* Header with image preview thumbnail */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-10 rounded overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    {proj.image_url ? (
                      <Image
                        src={proj.image_url}
                        alt={proj.image_alt || proj.title}
                        fill
                        className={`object-cover ${proj.image_position || "object-top"}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                        No Img
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-medium text-white">{proj.title}</span>
                      {proj.is_flagship && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#B79A63]/20 border border-[#B79A63]/40 text-[10px] uppercase font-semibold text-[#E0CFA8]">
                          <Star className="w-3 h-3 fill-[#B79A63] text-[#B79A63]" />
                          <span>Flagship Feature</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      {proj.category} &bull; {proj.organization} &bull; {proj.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <DeleteActionButton
                    action={deleteProject}
                    id={proj.id}
                    confirmMessage={`Delete project "${proj.title}" permanently?`}
                    title="Delete project"
                  />
                </div>
              </div>

              {/* Edit Form */}
              <form action={saveProject} className="space-y-5">
                <input type="hidden" name="id" value={proj.id} />
                <input type="hidden" name="slug" value={proj.slug || proj.id} />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={proj.title}
                      required
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Client / Authority
                    </label>
                    <input
                      type="text"
                      name="organization"
                      defaultValue={proj.organization}
                      required
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Sector Category
                    </label>
                    <select
                      name="category"
                      defaultValue={proj.category}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    >
                      <option value="High-Rise & Commercial">High-Rise &amp; Commercial</option>
                      <option value="Master Planned & Condos">Master Planned &amp; Condos</option>
                      <option value="Defense & Institutional">Defense &amp; Institutional</option>
                      <option value="Industrial & Infrastructure">Industrial &amp; Infrastructure</option>
                    </select>
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
                      defaultValue={proj.location || ""}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Scale / Metrics
                    </label>
                    <input
                      type="text"
                      name="metricsOrScope"
                      defaultValue={proj.metrics_or_scope || ""}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Role / Contribution
                    </label>
                    <input
                      type="text"
                      name="roleContribution"
                      defaultValue={proj.role_contribution || ""}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Flagship Feature?
                    </label>
                    <select
                      name="isFlagship"
                      defaultValue={proj.is_flagship ? "true" : "false"}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    >
                      <option value="false">Standard Grid Card</option>
                      <option value="true">Flagship Hero Feature</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                    Detailed Architectural &amp; Engineering Narrative
                  </label>
                  <textarea
                    name="description"
                    defaultValue={proj.description}
                    rows={3}
                    required
                    className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                    Verified Highlights (One highlight per line)
                  </label>
                  <textarea
                    name="verifiedHighlights"
                    defaultValue={highlights}
                    rows={3}
                    className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Image URL / Asset Path
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      defaultValue={proj.image_url}
                      required
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      name="imageAlt"
                      defaultValue={proj.image_alt}
                      required
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Object Position (CSS)
                    </label>
                    <select
                      name="imagePosition"
                      defaultValue={proj.image_position || "object-center"}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    >
                      <option value="object-center">Center (object-center)</option>
                      <option value="object-top">Top (object-top)</option>
                      <option value="object-bottom">Bottom (object-bottom)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Display Sort Order
                    </label>
                    <input
                      type="number"
                      name="sortOrder"
                      defaultValue={proj.sort_order}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-medium">
                      Publishing State
                    </label>
                    <select
                      name="isPublished"
                      defaultValue={proj.is_published ? "true" : "false"}
                      className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
                    >
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Project</span>
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>

      {/* Add New Project */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Landmark Project</span>
        </h2>

        <form action={saveProject} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(projects.length + 1) * 10} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              required
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <input
              type="text"
              name="organization"
              placeholder="Client / Organization"
              required
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <select
              name="category"
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            >
              <option value="High-Rise & Commercial">High-Rise &amp; Commercial</option>
              <option value="Master Planned & Condos">Master Planned &amp; Condos</option>
              <option value="Defense & Institutional">Defense &amp; Institutional</option>
              <option value="Industrial & Infrastructure">Industrial &amp; Infrastructure</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. Dhaka, Bangladesh)"
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <input
              type="text"
              name="roleContribution"
              placeholder="Executive Role (e.g. Chief Operating Officer)"
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <input
              type="text"
              name="metricsOrScope"
              placeholder="Scope / Scale Metrics"
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
          </div>

          <textarea
            name="description"
            placeholder="Project Description..."
            rows={3}
            required
            className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
          />

          <textarea
            name="verifiedHighlights"
            placeholder="Verified Highlights (One per line)..."
            rows={3}
            className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (e.g. /images/reza-site-team.jpg)"
              required
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
            <input
              type="text"
              name="imageAlt"
              placeholder="Image Alt Description"
              required
              className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
