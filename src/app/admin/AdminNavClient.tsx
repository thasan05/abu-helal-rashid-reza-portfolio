"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Sparkles,
  UserCheck,
  Briefcase,
  Building2,
  Wrench,
  Compass,
  Users2,
  BookOpen,
  Award,
  Activity,
  Mail,
  Image as ImageIcon,
  Sliders,
  Palette,
  ScrollText,
  Menu,
  X,
  Layers,
} from "lucide-react";

const NAV_GROUPS = [
  {
    title: "OVERVIEW",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "WEBSITE CONTENT",
    items: [
      { href: "/admin/settings", label: "General Identity", icon: Settings },
      { href: "/admin/hero", label: "Hero Monograph", icon: Sparkles },
      { href: "/admin/biography", label: "Executive Biography", icon: UserCheck },
      { href: "/admin/timeline", label: "Career Timeline", icon: Briefcase },
      { href: "/admin/projects", label: "Landmark Projects", icon: Building2 },
      { href: "/admin/expertise", label: "Capabilities Matrix", icon: Wrench },
      { href: "/admin/philosophy", label: "Leadership Philosophy", icon: Compass },
      { href: "/admin/mentorship", label: "Mentorship & Community", icon: Users2 },
      { href: "/admin/insights", label: "Publications & Insights", icon: BookOpen },
      { href: "/admin/credentials", label: "Academic Credentials", icon: Award },
      { href: "/admin/personal", label: "Endurance & Personal", icon: Activity },
      { href: "/admin/contact", label: "Contact & Dialogue", icon: Mail },
    ],
  },
  {
    title: "MEDIA & INBOX",
    items: [
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
      { href: "/admin/inquiries", label: "Consultation Inquiries", icon: Mail },
    ],
  },
  {
    title: "SYSTEM & CUSTOMIZATION",
    items: [
      { href: "/admin/layout-config", label: "Section Visibility & Order", icon: Sliders },
      { href: "/admin/appearance", label: "Visual Appearance", icon: Palette },
      { href: "/admin/logs", label: "Activity Logs", icon: ScrollText },
    ],
  },
];

export default function AdminNavClient() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button Trigger */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-full bg-[#B79A63] text-[#070C14] shadow-xl flex items-center justify-center font-bold"
          aria-label="Toggle Navigation Drawer"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-14 bottom-0 left-0 z-40 w-64 bg-[#090F1A] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="px-3 mb-2 text-[10px] uppercase font-semibold tracking-[0.14em] text-slate-400">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-[#B79A63]/15 text-[#E0CFA8] border-l-2 border-[#B79A63]"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#B79A63]" : "text-slate-500"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-white/10 text-[11px] text-slate-400 text-center font-mono">
          Engr. Abu Helal Rashid Reza &bull; CMS v1.0
        </div>
      </aside>
    </>
  );
}
