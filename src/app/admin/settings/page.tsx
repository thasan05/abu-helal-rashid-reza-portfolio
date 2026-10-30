import React from "react";
import { queryOne } from "@/lib/db/client";
import { updateSiteSettings, updateSeoSettings } from "../cms-actions";
import { Save, User, Globe, FileText, Image as ImageIcon } from "lucide-react";

export default async function SettingsPage() {
  const site = (await queryOne(`SELECT * FROM site_settings WHERE id = 'default'`)) || {};
  const seo = (await queryOne(`SELECT * FROM seo_settings WHERE id = 'default'`)) || {};

  const keywordsString = Array.isArray(seo.keywords)
    ? seo.keywords.join(", ")
    : typeof seo.keywords === "string"
    ? JSON.parse(seo.keywords || "[]").join(", ")
    : "";

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Website Settings
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">General Identity &amp; SEO</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Manage core executive credentials, contact information, profile imagery, and search engine optimization.
        </p>
      </div>

      {/* General Identity Form */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
          <User className="w-4 h-4 text-[#B79A63]" />
          <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
            Executive Personal Identity
          </h2>
        </div>

        <form action={updateSiteSettings} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                defaultValue={site.full_name || ""}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Honorific Prefix
              </label>
              <input
                type="text"
                name="honorificPrefix"
                defaultValue={site.honorific_prefix || ""}
                placeholder="Engr."
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Professional Headline
            </label>
            <input
              type="text"
              name="professionalHeadline"
              defaultValue={site.professional_headline || ""}
              required
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Current Role Title
              </label>
              <input
                type="text"
                name="currentRoleTitle"
                defaultValue={site.current_role_title || ""}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Current Company
              </label>
              <input
                type="text"
                name="currentCompany"
                defaultValue={site.current_company || ""}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Executive Sub-Headline (Core Proposition)
            </label>
            <textarea
              name="subHeadline"
              defaultValue={site.sub_headline || ""}
              rows={2}
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Short Summary Bio
            </label>
            <textarea
              name="shortBio"
              defaultValue={site.short_bio || ""}
              rows={3}
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Primary Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={site.email || ""}
                required
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Direct Phone
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={site.phone || ""}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={site.location || ""}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Office / Corporate Address
              </label>
              <input
                type="text"
                name="officeLocation"
                defaultValue={site.office_location || ""}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                defaultValue={site.linkedin_url || ""}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#B79A63]" />
              <span>Core Image &amp; Document Paths</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">
                  Executive CV PDF Path
                </label>
                <input
                  type="text"
                  name="resumePdfPath"
                  defaultValue={site.resume_pdf_path || ""}
                  className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white focus:outline-none focus:border-[#B79A63]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">
                  Avatar / Headshot Image Path
                </label>
                <input
                  type="text"
                  name="avatarImagePath"
                  defaultValue={site.avatar_image_path || ""}
                  className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white focus:outline-none focus:border-[#B79A63]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">
                  Hero Monograph Image Path
                </label>
                <input
                  type="text"
                  name="heroImagePath"
                  defaultValue={site.hero_image_path || ""}
                  className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white focus:outline-none focus:border-[#B79A63]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">
                  Secondary Biography Image Path
                </label>
                <input
                  type="text"
                  name="secondaryImagePath"
                  defaultValue={site.secondary_image_path || ""}
                  className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white focus:outline-none focus:border-[#B79A63]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Identity Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* SEO Configuration Form */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
          <Globe className="w-4 h-4 text-[#B79A63]" />
          <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
            Search Engine Optimization &amp; Social Sharing
          </h2>
        </div>

        <form action={updateSeoSettings} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Meta Title (Browser Tab &amp; Google Result Title)
            </label>
            <input
              type="text"
              name="metaTitle"
              defaultValue={seo.meta_title || ""}
              required
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Meta Description (Search Snippet)
            </label>
            <textarea
              name="metaDescription"
              defaultValue={seo.meta_description || ""}
              rows={3}
              required
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
              Keywords (Comma-separated)
            </label>
            <input
              type="text"
              name="keywords"
              defaultValue={keywordsString}
              className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Open Graph / Social Sharing Image URL
              </label>
              <input
                type="text"
                name="ogImageUrl"
                defaultValue={seo.og_image_url || ""}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Canonical URL
              </label>
              <input
                type="url"
                name="canonicalUrl"
                defaultValue={seo.canonical_url || ""}
                className="w-full px-3.5 py-2 bg-[#070C14] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-[#B79A63]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save SEO Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
