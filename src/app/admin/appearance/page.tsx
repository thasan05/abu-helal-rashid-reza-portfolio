import React from "react";
import { queryOne } from "@/lib/db/client";
import { updateThemeSettings } from "../cms-actions";
import { Palette, Save, Check } from "lucide-react";

export default async function AppearanceAdminPage() {
  const theme = (await queryOne(`SELECT * FROM theme_settings WHERE id = 'default'`)) || {};

  const presets = [
    { label: "Champagne Gold (Brand Default)", color: "#B79A63", light: "#CBB077" },
    { label: "Architectural Bronze", color: "#A88350", light: "#BA9868" },
    { label: "Steel Blue", color: "#3B82F6", light: "#60A5FA" },
    { label: "Emerald Governance", color: "#10B981", light: "#34D399" },
    { label: "Warm Titanium", color: "#94A3B8", light: "#CBD5E1" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
          Website Customization
        </div>
        <h1 className="font-serif text-3xl font-normal text-white">Visual Appearance &amp; Accent Tokens</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
          Customize executive brand accent colors, button highlights, and typographic accents within the Architectural Monograph design system.
        </p>
      </div>

      <div className="bg-[#0B121E] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-white/10">
          <Palette className="w-4 h-4 text-[#B79A63]" />
          <h2 className="text-sm uppercase tracking-wider font-semibold text-white">
            Brand Accent Color Palette
          </h2>
        </div>

        <form action={updateThemeSettings} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-xs uppercase text-slate-400 font-medium">
              Curated Architectural Palette Presets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {presets.map((preset) => {
                const isSelected = (theme.accent_color || "#B79A63").toLowerCase() === preset.color.toLowerCase();
                return (
                  <label
                    key={preset.color}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#142236] border-[#B79A63]"
                        : "bg-[#070C14] border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: preset.color }} />
                      <span className="text-xs text-white font-medium">{preset.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#B79A63]" />}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-white/10">
            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-medium">Primary Accent (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="accentColorPicker"
                  defaultValue={theme.accent_color || "#B79A63"}
                  className="w-10 h-10 p-0 border border-white/10 rounded cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  name="accentColor"
                  defaultValue={theme.accent_color || "#B79A63"}
                  className="flex-1 px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-medium">Accent Light (Hover Hex)</label>
              <input
                type="text"
                name="accentLight"
                defaultValue={theme.accent_light || "#CBB077"}
                className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-medium">Surface Depth Tone</label>
              <select
                name="surfaceTone"
                defaultValue={theme.surface_tone || "midnight"}
                className="w-full px-3 py-2 bg-[#070C14] border border-white/15 rounded text-xs text-white"
              >
                <option value="midnight">Midnight Architectural Navy (#070C14)</option>
                <option value="pure_black">Obsidian Black (#04060A)</option>
                <option value="slate_deep">Deep Structural Slate (#090E17)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Apply Theme Tokens</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
