"use client";

import React from "react";
import Link from "next/link";
import { useSessions, mapTypeToDisplay, mapStatusToDisplay } from "@/components/SessionProvider";

export default function Home() {
  const { sessions, dashboardMetrics } = useSessions();

  return (
    <div>
      {/* Header */}
      <header className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">ORA · SPORTS INTELLIGENCE</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-50">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Review your latest sessions, track set-piece efficiency, and keep an eye on biomechanical risk indicators at a glance.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/new-session" className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-violet-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 mr-2" />New Session
          </Link>
          <Link href="/settings" className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300">Settings</Link>
        </div>
      </header>

      {/* KPI cards */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs font-medium text-slate-400">Sessions (7 days)</p>
          <p className="mt-3 text-2xl font-semibold">{dashboardMetrics.totalSessions}</p>
          <p className="mt-1 text-xs text-emerald-400">+{Math.max(0, dashboardMetrics.totalSessions - 9)} vs last week</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs font-medium text-slate-400">Avg. impact efficiency</p>
          <p className="mt-3 text-2xl font-semibold">{dashboardMetrics.avgImpactEfficiency}<span className="text-sm">/100</span></p>
          <p className="mt-1 text-xs text-emerald-300">Target: &gt; 80 / 100</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs font-medium text-slate-400">Biomechanical risk index</p>
          <p className="mt-3 text-2xl font-semibold text-amber-300 capitalize">{dashboardMetrics.riskLevel}</p>
          <p className="mt-1 text-xs text-amber-200">{dashboardMetrics.flaggedPlayers} players flagged for asymmetry &amp; valgus.</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs font-medium text-slate-400">Set-piece efficiency (last 10)</p>
          <p className="mt-3 text-2xl font-semibold">{dashboardMetrics.setPieceEfficiency}/10</p>
          <p className="mt-1 text-xs text-slate-300">Focus: wide free-kicks &amp; near-post corners.</p>
        </div>
      </section>

      {/* Main grid */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        {/* Left: recent sessions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Recent sessions</h2>
            <Link href="/trends" className="text-xs text-sky-300 hover:text-sky-200">View trends →</Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800/70">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Player</th>
                  <th className="px-4 py-3">Quality</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(0, 8).map((s) => (
                  <tr key={s.id} className="border-t border-slate-800/60 hover:bg-slate-900/40">
                    <td className="px-4 py-3 text-slate-300">{s.date}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-100">{mapTypeToDisplay(s.type)}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-200">{s.player}</td>
                    <td className="px-4 py-3"><QualityBadge quality={s.quality} /></td>
                    <td className="px-4 py-3 text-slate-300"><StatusBadge status={mapStatusToDisplay(s.status)} /></td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/sessions/${s.id}`} className="text-xs font-medium text-sky-400 hover:text-sky-300">Open →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: capture tips & quickstart */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-100">Capture quality preview</h3>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-400">Waiting for upload</span>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>• ORA auto-checks resolution, frame rate, brightness and subject size before running full physics.</li>
              <li>• Wide “TV camera” highlights may be limited to tactical insights only.</li>
              <li>• Close / mid-range clips of a single player give the most accurate biomechanics.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-5 text-sm">
            <h3 className="text-sm font-semibold text-slate-100">Capture tips</h3>
            <p className="mt-1 text-xs text-slate-400">Better footage → better physics → better insights.</p>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>• Keep the player filling ~30–50% of the frame.</li>
              <li>• Use landscape orientation and avoid heavy zoom.</li>
              <li>• Record at 60 fps if possible for set-pieces.</li>
              <li>• Avoid strong backlight – keep the subject well lit.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-violet-600/40 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-sky-500/10 p-4 text-xs text-slate-50 shadow-[0_0_25px_rgba(59,130,246,0.12)]">
            <p className="font-medium">Quick start</p>
            <p className="mt-1 text-[11px] text-violet-100/90">Start with a simple “free-kick drill”: 5–10 repetitions from the same spot. Upload the clip and track impact efficiency and spin over time.</p>
            <div className="mt-3">
              <Link href="/new-session" className="inline-block rounded-full bg-[#6b21a8] px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95">Start a set-piece session →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* helpers */
function QualityBadge({ quality }: { quality: "Good" | "OK" | "Retry" }) {
  if (quality === "Good") return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Good</span>;
  if (quality === "OK") return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />OK</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-300"><span className="h-1.5 w-1.5 rounded-full bg-rose-400" />Retry</span>;
}

function StatusBadge({ status }: { status: "Processed" | "Processing" | "Needs review" | "Not started" }) {
  if (status === "Processed") return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Processed</span>;
  if (status === "Processing") return <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-300"><span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />Processing</span>;
  if (status === "Not started") return <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2 py-0.5 text-[11px] font-medium text-slate-300"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" />Not started</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-300"><span className="h-1.5 w-1.5 rounded-full bg-rose-400" />Needs review</span>;
}