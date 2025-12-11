"use client";
import React from "react";
import { useSessions } from "../components/SessionProvider";

export default function Home() {
  const { sessions } = useSessions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#050816] to-black text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        {/* header + KPI cards (keep your existing markup if different) */}
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              ORA · Sports Intelligence
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              Review your latest sessions, track set-piece efficiency, and keep
              an eye on biomechanical risk indicators at a glance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/40 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#050816]"
              onClick={() => {
                window.location.href = "/new-session";
              }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
              New Session
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/40"
              onClick={() => {
                window.location.href = "/settings";
              }}
            >
              Settings
            </button>
          </div>
        </header>

        {/* KPI cards — keep your existing cards if you have them */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm shadow-black/30 backdrop-blur">
            <p className="text-xs font-medium text-zinc-400">Sessions (7 days)</p>
            <p className="mt-3 text-2xl font-semibold">12</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              +3 vs last week
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm shadow-black/30 backdrop-blur">
            <p className="text-xs font-medium text-zinc-400">
              Avg. impact efficiency
            </p>
            <p className="mt-3 text-2xl font-semibold">78<span className="text-sm">/100</span></p>
            <p className="mt-1 text-xs text-emerald-300">
              Target: &gt; 80 / 100
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm shadow-black/30 backdrop-blur">
            <p className="text-xs font-medium text-zinc-400">
              Biomechanical risk index
            </p>
            <p className="mt-3 text-2xl font-semibold text-amber-300">Moderate</p>
            <p className="mt-1 text-xs text-amber-200">
              3 players flagged for asymmetry &amp; valgus.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm shadow-black/30 backdrop-blur">
            <p className="text-xs font-medium text-zinc-400">
              Set-piece efficiency (last 10)
            </p>
            <p className="mt-3 text-2xl font-semibold">6/10</p>
            <p className="mt-1 text-xs text-zinc-300">
              Focus: wide free-kicks &amp; near-post corners.
            </p>
          </div>
        </section>

        {/* Recent sessions */}
        <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm shadow-black/30 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-100">
                Recent sessions
              </h2>
              <button
                className="text-xs font-medium text-indigo-300 hover:text-indigo-200"
                onClick={() => {
                  window.location.href = "/trends";
                }}
              >
                View trends →
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-800/70">
              <table className="min-w-full border-collapse text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-400">
                  <tr>
                    <th className="px-3 py-2 font-medium">Date</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Player</th>
                    <th className="px-3 py-2 font-medium">Quality</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 bg-zinc-950/40">
                  {sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-zinc-900/60">
                      <td className="px-3 py-2 text-zinc-300">{session.date}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-300">
                          {session.type}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-zinc-200">
                        {session.player}
                      </td>
                      <td className="px-3 py-2">
                        <QualityBadge quality={session.quality} />
                      </td>
                      <td className="px-3 py-2">
                        <StatusBadge status={session.status} />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200">
                          Open →
                        </button>
                      </td>
                    </tr>
                  ))}
                  {sessions.length === 0 && (
                    <tr>
                      <td
                        className="px-3 py-4 text-center text-zinc-400"
                        colSpan={6}
                      >
                        No sessions yet. Start by creating your first{" "}
                        <span className="font-medium text-indigo-300">
                          New Session
                        </span>
                        .
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* right column (tips) — keep existing content or paste yours here */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm shadow-black/30 backdrop-blur">
              <h2 className="text-sm font-semibold text-zinc-100">
                Capture tips
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                Better footage → better physics → better insights.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function QualityBadge({ quality }: { quality: "Good" | "OK" | "Retry" }) {
  if (quality === "Good") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Good
      </span>
    );
  }
  if (quality === "OK") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        OK
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-300">
      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
      Retry
    </span>
  );
}

function StatusBadge({ status }: { status: "Processed" | "Processing" | "Needs review" }) {
  if (status === "Processed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Processed
      </span>
    );
  }
  if (status === "Processing") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-300">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
        Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-300">
      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
      Needs review
    </span>
  );
}