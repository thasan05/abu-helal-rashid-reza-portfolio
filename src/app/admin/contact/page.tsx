import React from "react";
import { queryOne } from "@/lib/db/client";
import { updateContactSettings } from "../cms-actions";
import { Mail, Save, MapPin, Clock } from "lucide-react";

export default async function ContactAdminPage() {
  const contact = (await queryOne(`SELECT * FROM contact_settings WHERE id = 'default'`)) || {};

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter X &bull; Direct Dialogue
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Executive Consultation Settings</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Configure direct inquiry headlines, corporate office address, and executive availability notes.
        </p>
      </div>

      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#B79A63]" />
          <span>Consultation Directives</span>
        </h2>

        <form action={updateContactSettings} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Section Headline
              </label>
              <input
                type="text"
                name="headline"
                defaultValue={contact.headline || "Initiate direct executive dialogue."}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Subheadline / Callout
              </label>
              <input
                type="text"
                name="subheadline"
                defaultValue={contact.subheadline || "Strictly confidential executive communication."}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Office Location Address
              </label>
              <input
                type="text"
                name="officeLocation"
                defaultValue={contact.office_location || "135 Shantibag (1st Floor), Dhaka-1217"}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Direct Contact Email
              </label>
              <input
                type="email"
                name="emailText"
                defaultValue={contact.email_text || "adit.eng@gmail.com"}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Availability Note / Response SLA
            </label>
            <textarea
              name="availabilityNote"
              defaultValue={contact.availability_note || "Available for select advisory, board-level inquiries, and enterprise project leadership."}
              rows={3}
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Contact Information</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
