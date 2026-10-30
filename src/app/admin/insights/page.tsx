import React from "react";
import { query } from "@/lib/db/client";
import { saveInsightArticle, deleteInsightArticle } from "../cms-actions";
import DeleteActionButton from "../DeleteActionButton";
import { BookOpen, Plus, Save, ExternalLink } from "lucide-react";

export default async function InsightsAdminPage() {
  const articles = await query(`SELECT * FROM insight_articles ORDER BY sort_order ASC`);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter VII &bull; Insights
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Publications &amp; Thought Leadership</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage published articles, media features (The InCAP, Channel i), industry op-eds, and technical papers.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((art: any) => {
          const topics = Array.isArray(art.topics)
            ? art.topics.join(", ")
            : JSON.parse(art.topics || "[]").join(", ");

          return (
            <div key={art.id} className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="font-serif text-lg text-white">{art.title}</span>
                  <div className="text-xs text-slate-400">{art.publication_platform} &bull; {art.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  {art.url && (
                    <a href={art.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-[#CBB077]">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <DeleteActionButton
                    action={deleteInsightArticle}
                    id={art.id}
                    confirmMessage={`Delete article "${art.title}"?`}
                    className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                  />
                </div>
              </div>

              <form action={saveInsightArticle} className="space-y-4">
                <input type="hidden" name="id" value={art.id} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" name="title" defaultValue={art.title} required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  <input type="text" name="publicationPlatform" defaultValue={art.publication_platform} required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  <input type="text" name="category" defaultValue={art.category} required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                </div>

                <textarea name="summary" defaultValue={art.summary} rows={3} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" name="readTime" defaultValue={art.read_time || ""} placeholder="Read time (e.g. 6 min read)" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  <input type="text" name="url" defaultValue={art.url} required placeholder="URL destination" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
                  <select name="isExternal" defaultValue={art.is_external ? "true" : "false"} className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white">
                    <option value="true">External Link</option>
                    <option value="false">Internal Resource</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="topics" defaultValue={topics} placeholder="Topics (comma-separated)" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                  <div className="flex gap-2">
                    <input type="number" name="sortOrder" defaultValue={art.sort_order} className="w-24 px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                    <select name="isPublished" defaultValue={art.is_published ? "true" : "false"} className="flex-1 px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white">
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-4 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Article</span>
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>

      {/* Add New Article */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Publication or Media Feature</span>
        </h2>
        <form action={saveInsightArticle} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(articles.length + 1) * 10} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" name="title" placeholder="Article Title" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="publicationPlatform" placeholder="Platform (e.g. The InCAP)" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="category" placeholder="Category" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          </div>
          <textarea name="summary" placeholder="Executive Summary..." rows={3} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" name="url" placeholder="URL link" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono" />
            <input type="text" name="readTime" placeholder="Read Time (e.g. 5 min read)" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="topics" placeholder="Topics (comma-separated)" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
