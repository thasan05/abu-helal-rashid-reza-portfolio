import React from "react";
import { query } from "@/lib/db/client";
import { saveCredentialItem, deleteCredentialItem } from "../cms-actions";
import DeleteActionButton from "../DeleteActionButton";
import { Award, Plus, Save, GraduationCap, ShieldCheck } from "lucide-react";

export default async function CredentialsAdminPage() {
  const credentials = await query(`SELECT * FROM credential_items ORDER BY sort_order ASC`);

  const categories = ["Academic Degree", "Professional Certification", "Institutional Membership"];

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Chapter VIII &bull; Credentials
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Academic Pedigree &amp; Licensure</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage BUET civil engineering degree, NSU Executive MBA, PMI PMP® certification, and institutional memberships.
        </p>
      </div>

      {categories.map((cat) => {
        const items = credentials.filter((c: any) => c.category === cat);
        return (
          <div key={cat} className="space-y-4">
            <h2 className="text-sm uppercase tracking-wider font-semibold text-[#CBB077] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B79A63]" />
              <span>{cat}s ({items.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((cred: any) => (
                <div key={cred.id} className="bg-[#0B121E] border border-white/10 rounded-xl p-5 space-y-4 relative">
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-white/10">
                    <div>
                      <span className="font-serif text-base text-white">{cred.title}</span>
                      <div className="text-xs text-slate-400">{cred.issuer_institution} &bull; {cred.period_or_year}</div>
                    </div>
                    <DeleteActionButton
                      action={deleteCredentialItem}
                      id={cred.id}
                      confirmMessage={`Delete credential "${cred.title}"?`}
                      iconClassName="w-3.5 h-3.5"
                      className="p-1 text-slate-500 hover:text-red-400 cursor-pointer"
                    />
                  </div>

                  <form action={saveCredentialItem} className="space-y-3">
                    <input type="hidden" name="id" value={cred.id} />
                    <input type="hidden" name="category" value={cred.category} />

                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="title" defaultValue={cred.title} required placeholder="Title" className="px-2.5 py-1.5 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                      <input type="text" name="issuerInstitution" defaultValue={cred.issuer_institution} required placeholder="Institution" className="px-2.5 py-1.5 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="periodOrYear" defaultValue={cred.period_or_year} required placeholder="Period / Year" className="px-2.5 py-1.5 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                      <input type="text" name="badgeText" defaultValue={cred.badge_text || ""} placeholder="Badge Text" className="px-2.5 py-1.5 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                    </div>

                    <textarea name="details" defaultValue={cred.details} rows={2} required placeholder="Details / Description" className="w-full px-2.5 py-1.5 bg-[#070C14] border border-white/15 rounded text-xs text-white" />

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <input type="number" name="sortOrder" defaultValue={cred.sort_order} className="w-16 px-2 py-1 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
                        <select name="isPublished" defaultValue={cred.is_published ? "true" : "false"} className="px-2 py-1 bg-[#070C14] border border-white/15 rounded text-xs text-white">
                          <option value="true">Published</option>
                          <option value="false">Draft</option>
                        </select>
                      </div>
                      <button type="submit" className="px-3 py-1.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold rounded flex items-center gap-1">
                        <Save className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Add New Credential Form */}
      <div className="bg-[#0B121E] border border-dashed border-white/20 rounded-xl p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B79A63]" />
          <span>Add New Credential or License</span>
        </h2>
        <form action={saveCredentialItem} className="space-y-4">
          <input type="hidden" name="id" value="" />
          <input type="hidden" name="isPublished" value="true" />
          <input type="hidden" name="sortOrder" value={(credentials.length + 1) * 10} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" name="title" placeholder="Credential Title" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="issuerInstitution" placeholder="Issuer / University" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <select name="category" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white">
              <option value="Academic Degree">Academic Degree</option>
              <option value="Professional Certification">Professional Certification</option>
              <option value="Institutional Membership">Institutional Membership</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="periodOrYear" placeholder="Period (e.g. 2003 - 2008)" required className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
            <input type="text" name="badgeText" placeholder="Badge (e.g. BUET Civil)" className="px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          </div>
          <textarea name="details" placeholder="Curriculum & Highlights..." rows={2} required className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white" />
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Create Credential</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
