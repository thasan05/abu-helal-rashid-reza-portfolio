"use client";

import React, { useState, useTransition } from "react";
import { uploadMediaFile } from "./actions";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";

export default function MediaUploadForm() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ success?: string; error?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await uploadMediaFile(formData);
      if (res?.error) {
        setFeedback({ error: res.error });
      } else if (res?.success) {
        setFeedback({ success: res.message });
        form.reset();
      }
    });
  };

  return (
    <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <UploadCloud className="w-4 h-4 text-[#B79A63]" />
        <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
          Upload New Asset
        </h2>
      </div>

      {feedback?.error && (
        <div className="mb-4 p-3 rounded bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{feedback.error}</span>
        </div>
      )}

      {feedback?.success && (
        <div className="mb-4 p-3 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback.success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-medium">Select File</label>
            <input
              type="file"
              name="file"
              required
              accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
              className="w-full text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#142236] file:text-[#CBB077] hover:file:bg-[#1A2D47] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-medium">Alt Description</label>
            <input
              type="text"
              name="altText"
              placeholder="e.g. Engr. Reza site inspection at Verona"
              className="w-full px-3 py-1.5 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-medium">Category</label>
            <select
              name="category"
              className="w-full px-3 py-1.5 bg-[#070C14] border border-white/15 rounded text-xs text-white"
            >
              <option value="photography">Photography</option>
              <option value="projects">Project Imagery</option>
              <option value="press">Press &amp; Media</option>
              <option value="documents">Executive Documents</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider rounded transition-colors disabled:opacity-50"
          >
            {isPending ? "Uploading Asset..." : "Upload Asset to Library"}
          </button>
        </div>
      </form>
    </div>
  );
}
