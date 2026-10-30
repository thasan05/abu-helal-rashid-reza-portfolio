import React from "react";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";
import { logoutAction } from "./actions";
import { purgeGlobalCache } from "./cms-actions";
import AdminNavClient from "./AdminNavClient";
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
  ExternalLink,
  LogOut,
  RefreshCw,
  Shield,
  Layers,
} from "lucide-react";

export const instant = false;

export const metadata = {
  title: "Admin CMS | Engr. Abu Helal Rashid Reza",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#070C14] text-slate-100 flex flex-col antialiased selection:bg-[#B79A63] selection:text-[#070C14]">
      {/* Top Administrative Header */}
      <header className="h-14 border-b border-white/10 bg-[#0B121E] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 text-white hover:text-[#CBB077] transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B79A63]" />
            <span className="font-serif text-lg tracking-tight font-medium">Reza Executive CMS</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-[#CBB077] hidden sm:inline-block">
              v1.0
            </span>
          </Link>
          <div className="h-4 w-px bg-white/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Database: Connected (Neon Serverless PostgreSQL)</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <form action={purgeGlobalCache}>
            <button
              type="submit"
              title="Purge Next.js cache and refresh live website immediately"
              className="px-2.5 py-1.5 rounded-[4px] bg-[#142236] hover:bg-[#1A2D47] border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#CBB077]" />
              <span className="hidden sm:inline">Refresh Cache</span>
            </button>
          </form>

          <Link
            href="/"
            target="_blank"
            className="px-2.5 py-1.5 rounded-[4px] bg-[#142236] hover:bg-[#1A2D47] border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#CBB077]" />
            <span className="hidden sm:inline">View Public Site</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {session && (
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-6 h-6 rounded-full bg-[#142236] border border-white/10 flex items-center justify-center font-mono text-[10px] text-[#CBB077]">
                {session.username.substring(0, 2).toUpperCase()}
              </span>
              <span className="font-medium hidden sm:inline">{session.username}</span>
            </div>
          )}

          <form action={logoutAction}>
            <button
              type="submit"
              className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors"
              title="Log out of CMS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Client Sidebar with Mobile Drawer support */}
        <AdminNavClient />

        {/* Workspace Body */}
        <main className="flex-1 overflow-y-auto bg-[#070C14] p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
