import React from "react";
import Link from "next/link";
import { query } from "@/lib/db/client";
import {
  Building2,
  Briefcase,
  Award,
  BookOpen,
  Image as ImageIcon,
  Mail,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";

export default async function AdminDashboardPage() {
  // Query live real metrics from database
  const [
    projectsStats,
    careerStats,
    credentialsStats,
    insightsStats,
    mediaStats,
    inquiryStats,
    recentLogs,
    siteSettings,
  ] = await Promise.all([
    query(`SELECT COUNT(*) as total, SUM(CASE WHEN is_published THEN 1 ELSE 0 END) as published FROM projects`),
    query(`SELECT COUNT(*) as total, SUM(CASE WHEN is_current THEN 1 ELSE 0 END) as active FROM career_roles`),
    query(`SELECT COUNT(*) as total, SUM(CASE WHEN category = 'Academic Degree' THEN 1 ELSE 0 END) as academic, SUM(CASE WHEN category = 'Professional Certification' THEN 1 ELSE 0 END) as certifications FROM credential_items`),
    query(`SELECT COUNT(*) as total FROM insight_articles`),
    query(`SELECT COUNT(*) as total, COALESCE(SUM(file_size), 0) as total_bytes FROM media_assets`),
    query(`SELECT COUNT(*) as total, SUM(CASE WHEN NOT is_read THEN 1 ELSE 0 END) as unread FROM contact_inquiries`),
    query(`SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 8`),
    query(`SELECT full_name, professional_headline, updated_at FROM site_settings WHERE id = 'default'`),
  ]);

  const totalProjects = parseInt(projectsStats[0]?.total || "0", 10);
  const publishedProjects = parseInt(projectsStats[0]?.published || "0", 10);
  const totalCareer = parseInt(careerStats[0]?.total || "0", 10);
  const totalCredentials = parseInt(credentialsStats[0]?.total || "0", 10);
  const totalCertifications = parseInt(credentialsStats[0]?.certifications || "0", 10);
  const totalInsights = parseInt(insightsStats[0]?.total || "0", 10);
  const totalMedia = parseInt(mediaStats[0]?.total || "0", 10);
  const mediaSizeMb = (parseInt(mediaStats[0]?.total_bytes || "0", 10) / (1024 * 1024)).toFixed(2);
  const unreadInquiries = parseInt(inquiryStats[0]?.unread || "0", 10);
  const totalInquiries = parseInt(inquiryStats[0]?.total || "0", 10);

  const stats = [
    {
      title: "Landmark Projects",
      value: totalProjects,
      sublabel: `${publishedProjects} Published`,
      href: "/admin/projects",
      icon: Building2,
      accent: "text-[#B79A63]",
    },
    {
      title: "Career Journey",
      value: totalCareer,
      sublabel: "Verified Executive Roles",
      href: "/admin/timeline",
      icon: Briefcase,
      accent: "text-blue-400",
    },
    {
      title: "Credentials & Licensure",
      value: totalCredentials,
      sublabel: `${totalCertifications} Certifications (PMP®)`,
      href: "/admin/credentials",
      icon: Award,
      accent: "text-amber-400",
    },
    {
      title: "Publications & Insights",
      value: totalInsights,
      sublabel: "Thought Leadership",
      href: "/admin/insights",
      icon: BookOpen,
      accent: "text-purple-400",
    },
    {
      title: "Media Assets",
      value: totalMedia,
      sublabel: `${mediaSizeMb} MB Storage Tracked`,
      href: "/admin/media",
      icon: ImageIcon,
      accent: "text-emerald-400",
    },
    {
      title: "Consultation Inquiries",
      value: unreadInquiries,
      sublabel: `${totalInquiries} Total Received`,
      href: "/admin/inquiries",
      icon: Mail,
      accent: unreadInquiries > 0 ? "text-amber-300" : "text-slate-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-1">
            Executive Command Console
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Portfolio Management Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
            Live database-driven overview for {siteSettings[0]?.full_name || "Engr. Abu Helal Rashid Reza"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] bg-[#142236] hover:bg-[#1A2D47] border border-white/10 text-xs font-medium text-slate-200 transition-colors"
          >
            <span>Edit Identity</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B79A63]" />
          </Link>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            <span>+ New Project</span>
          </Link>
        </div>
      </div>

      {/* Grid of Real Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.title}
              href={s.href}
              className="bg-[#0B121E] border border-white/10 hover:border-[#B79A63]/50 p-4 rounded-lg transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                  {s.title}
                </span>
                <Icon className={`w-4 h-4 ${s.accent}`} />
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {s.value}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 truncate">
                  {s.sublabel}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Management Section Shortcuts */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xs uppercase tracking-[0.12em] font-semibold text-slate-300">
            Content Modules &amp; Editorial Registers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Hero Monograph", desc: "Monograph edition, volume, headline & CTAs", href: "/admin/hero" },
              { label: "Executive Biography", desc: "Narrative spread, chapter title & pull quote", href: "/admin/biography" },
              { label: "Career Ledger", desc: "17-year progression, responsibilities & badges", href: "/admin/timeline" },
              { label: "Landmark Projects", desc: "Verona Condos, Naval base, Commercial towers", href: "/admin/projects" },
              { label: "Capabilities Matrix", desc: "Engineering & governance expertise domains", href: "/admin/expertise" },
              { label: "Governance Philosophy", desc: "Stewardship principles & ethical reflections", href: "/admin/philosophy" },
              { label: "Community Leadership", desc: "LCB, PMI Bangladesh & youth mentorship", href: "/admin/mentorship" },
              { label: "Thought Leadership", desc: "Publications, guest articles & DOI links", href: "/admin/insights" },
              { label: "Pedigree & Credentials", desc: "BUET, NSU EMBA, PMP®, IEB licenses", href: "/admin/credentials" },
              { label: "Endurance & Personal", desc: "15K marathon athletic discipline records", href: "/admin/personal" },
              { label: "Section Visibility", desc: "Toggle sections & reorder page presentation", href: "/admin/layout-config" },
              { label: "Visual Appearance", desc: "Accent colors, theme tokens & styling", href: "/admin/appearance" },
            ].map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="p-3.5 rounded-lg bg-[#0B121E] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-xs text-white group-hover:text-[#CBB077] transition-colors">
                    {m.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#CBB077] transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                  {m.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Activity & Audit Log */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[0.12em] font-semibold text-slate-300">
              Audit Ledger &bull; Recent Operations
            </h2>
            <Link href="/admin/logs" className="text-xs text-[#CBB077] hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="bg-[#0B121E] border border-white/10 rounded-lg divide-y divide-white/5 overflow-hidden">
            {recentLogs.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No recent activity recorded.
              </div>
            ) : (
              recentLogs.map((log: any) => (
                <div key={log.id} className="p-3.5 text-xs flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B79A63] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase font-semibold text-[#CBB077]">
                        {log.action} &bull; {log.entity_type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs mt-0.5 line-clamp-2">
                      {log.details || `Operation on ${log.entity_id}`}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-1">
                      By: <span className="text-slate-400 font-medium">{log.performed_by}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
