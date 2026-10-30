import React from "react";
import Image from "next/image";
import { query } from "@/lib/db/client";
import { deleteMediaAsset } from "../cms-actions";
import { uploadMediaFile } from "./actions";
import MediaUploadForm from "./MediaUploadForm";
import { Image as ImageIcon, Trash2, Copy, FileText, Check } from "lucide-react";

export default async function MediaAdminPage() {
  const assets = await query(`SELECT * FROM media_assets ORDER BY uploaded_at DESC`);

  const totalSizeMb = (
    assets.reduce((acc: number, curr: any) => acc + (curr.file_size || 0), 0) /
    (1024 * 1024)
  ).toFixed(2);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
            Media Management
          </div>
          <h1 className="font-serif text-3xl font-normal text-white">Media Library &amp; Assets</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
            Central repository for verified corporate portraits, site coordination photography, blueprints, and executive PDFs.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="px-3 py-1.5 rounded bg-[#142236] border border-white/10">
            Total Assets: <strong className="text-white">{assets.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded bg-[#142236] border border-white/10">
            Total Volume: <strong className="text-[#CBB077]">{totalSizeMb} MB</strong>
          </span>
        </div>
      </div>

      {/* Upload Dropzone Form */}
      <MediaUploadForm />

      {/* Media Grid */}
      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200">
          Registered Assets ({assets.length})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset: any) => {
            const isPdf = asset.mime_type === "application/pdf" || asset.filename.endsWith(".pdf");
            const sizeKb = Math.round((asset.file_size || 0) / 1024);

            return (
              <div
                key={asset.id}
                className="bg-[#0B121E] border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between group hover:border-[#B79A63]/50 transition-colors"
              >
                <div className="relative aspect-square w-full bg-[#070C14] flex items-center justify-center overflow-hidden">
                  {isPdf ? (
                    <FileText className="w-10 h-10 text-red-400" />
                  ) : (
                    <Image
                      src={asset.file_path}
                      alt={asset.alt_text || asset.filename}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <form action={deleteMediaAsset.bind(null, asset.id)}>
                      <button
                        type="submit"
                        className="p-1 rounded bg-black/80 hover:bg-red-950 text-slate-300 hover:text-red-400 transition-colors"
                        title="Delete asset from library"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <div className="font-mono text-[11px] text-white truncate" title={asset.filename}>
                    {asset.filename}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{sizeKb} KB</span>
                    <span className="uppercase">{asset.category || "General"}</span>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <code className="text-[10px] text-slate-400 truncate max-w-[110px]" title={asset.file_path}>
                      {asset.file_path}
                    </code>
                    <a
                      href={asset.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#CBB077] hover:underline"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
