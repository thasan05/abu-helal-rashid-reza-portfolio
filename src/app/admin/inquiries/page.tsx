import React from "react";
import { query } from "@/lib/db/client";
import { markInquiryRead, deleteInquiry } from "../cms-actions";
import { Mail, Check, Trash2, Clock, Building, User } from "lucide-react";

export default async function InquiriesAdminPage() {
  const inquiries = await query(`SELECT * FROM contact_inquiries ORDER BY created_at DESC`);
  const unreadCount = inquiries.filter((i: any) => !i.is_read).length;

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
            Communication Inbox
          </div>
          <h1 className="font-serif text-3xl font-normal text-white">Direct Consultation Inquiries</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
            Inquiries submitted by institutional developers, recruiters, and engineering partners via the website contact form.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-[#142236] border border-white/10 text-xs text-slate-300">
            Total: <strong className="text-white">{inquiries.length}</strong>
          </span>
          {unreadCount > 0 && (
            <span className="px-3 py-1 rounded bg-amber-950/40 border border-amber-500/30 text-xs text-amber-300 font-semibold">
              {unreadCount} Unread
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center bg-[#0B121E] border border-white/10 rounded-xl">
            <Mail className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-white">Inbox Clean</h3>
            <p className="text-xs text-slate-400 mt-1 font-light">
              No consultation inquiries have been received yet. Submissions from the public website contact form will appear here.
            </p>
          </div>
        ) : (
          inquiries.map((inq: any) => (
            <div
              key={inq.id}
              className={`p-6 rounded-xl border transition-all ${
                inq.is_read
                  ? "bg-[#0B121E] border-white/10"
                  : "bg-[#0E1726] border-[#B79A63]/40 shadow-lg"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  {!inq.is_read && (
                    <span className="w-2 h-2 rounded-full bg-[#B79A63] shrink-0" />
                  )}
                  <h3 className="font-serif text-lg font-medium text-white">{inq.subject}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(inq.created_at).toLocaleString()}
                  </span>

                  <div className="flex items-center gap-2">
                    {!inq.is_read && (
                      <form action={markInquiryRead.bind(null, inq.id)}>
                        <button
                          type="submit"
                          className="px-2.5 py-1 rounded bg-[#142236] hover:bg-[#1A2D47] text-[11px] text-[#CBB077] flex items-center gap-1 transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          <span>Mark Read</span>
                        </button>
                      </form>
                    )}
                    <form action={deleteInquiry.bind(null, inq.id)}>
                      <button
                        type="submit"
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sender: <strong className="text-white">{inq.name}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <a href={`mailto:${inq.email}`} className="text-[#CBB077] hover:underline">
                    {inq.email}
                  </a>
                </div>
                {inq.organization && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span>Org: <strong className="text-white">{inq.organization}</strong></span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-[4px] bg-[#070C14] border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed font-light whitespace-pre-wrap">
                {inq.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
