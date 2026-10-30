import React from "react";
import { query } from "@/lib/db/client";
import { ScrollText, Activity, ShieldCheck, UserCheck, Clock } from "lucide-react";

export default async function AdminLogsPage() {
  const [logs, stats] = await Promise.all([
    query<any>(`SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 100`),
    query<any>(`
      SELECT
        COUNT(*) as total,
        COUNT(DISTINCT performed_by) as actors,
        SUM(CASE WHEN action = 'UPDATE' THEN 1 ELSE 0 END) as updates,
        SUM(CASE WHEN action = 'CREATE' THEN 1 ELSE 0 END) as creations,
        SUM(CASE WHEN action = 'DELETE' THEN 1 ELSE 0 END) as deletions
      FROM activity_logs
    `),
  ]);

  const stat = stats[0] || {};
  const total = parseInt(stat.total || "0", 10);
  const updates = parseInt(stat.updates || "0", 10);
  const creations = parseInt(stat.creations || "0", 10);
  const deletions = parseInt(stat.deletions || "0", 10);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B79A63] mb-1">
          <ScrollText className="w-4 h-4" />
          <span>Security & Governance</span>
        </div>
        <h1 className="text-3xl font-serif font-light text-white tracking-wide">
          Administrative Activity Logs
        </h1>
        <p className="text-sm text-white/50 mt-1 font-sans">
          Immutable audit trail recording every content mutation, layout adjustment, and administrative access event.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0B121E] border border-white/10 rounded-xl p-4">
          <div className="text-xs font-mono uppercase text-white/40 mb-1">Total Audit Entries</div>
          <div className="text-2xl font-mono text-white font-semibold">{total}</div>
        </div>
        <div className="bg-[#0B121E] border border-white/10 rounded-xl p-4">
          <div className="text-xs font-mono uppercase text-blue-400/70 mb-1">Updates</div>
          <div className="text-2xl font-mono text-blue-400 font-semibold">{updates}</div>
        </div>
        <div className="bg-[#0B121E] border border-white/10 rounded-xl p-4">
          <div className="text-xs font-mono uppercase text-emerald-400/70 mb-1">Creations</div>
          <div className="text-2xl font-mono text-emerald-400 font-semibold">{creations}</div>
        </div>
        <div className="bg-[#0B121E] border border-white/10 rounded-xl p-4">
          <div className="text-xs font-mono uppercase text-rose-400/70 mb-1">Deletions</div>
          <div className="text-2xl font-mono text-rose-400 font-semibold">{deletions}</div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0B121E] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#B79A63]" />
            <h2 className="text-sm font-mono uppercase tracking-wider text-white">
              Recent Transactions ({logs.length})
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40">Showing latest 100 actions</span>
        </div>

        {logs.length === 0 ? (
          <div className="p-12 text-center text-white/40 font-mono text-sm">
            No activity logged yet. All administrative actions will be recorded here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#070C14] text-white/40 border-b border-white/10 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">Target ID</th>
                  <th className="py-3 px-4">Operator</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log: any) => {
                  let badgeBg = "bg-white/10 text-white/70";
                  if (log.action === "CREATE") badgeBg = "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
                  if (log.action === "UPDATE") badgeBg = "bg-blue-500/20 text-blue-300 border border-blue-500/30";
                  if (log.action === "DELETE") badgeBg = "bg-rose-500/20 text-rose-300 border border-rose-500/30";

                  return (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 text-white/50 whitespace-nowrap">
                        {log.created_at ? new Date(log.created_at).toLocaleString() : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider ${badgeBg}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white font-medium">
                        {log.entity_type}
                      </td>
                      <td className="py-3 px-4 text-white/60 font-mono">
                        {log.entity_id || "—"}
                      </td>
                      <td className="py-3 px-4 text-[#B79A63]">
                        {log.performed_by || "admin"}
                      </td>
                      <td className="py-3 px-4 text-white/80 max-w-md truncate" title={log.details}>
                        {log.details || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
