"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSessions } from "../../components/SessionProvider";
import { SessionType } from "../../lib/types";

export default function NewSessionPage() {
  const { createSession, runAnalysis } = useSessions();
  const router = useRouter();

  const [sessionType, setSessionType] = useState<SessionType>("set-piece");
  const [playerName, setPlayerName] = useState("");
  const [sessionDate, setSessionDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "queued" | "processing" | "done"
  >("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !fileName) {
      window.alert("Please enter a player name and choose a video file.");
      return;
    }

    setStatus("queued");

    // Create session
    const sessionId = createSession({
      player: playerName,
      type: sessionType,
      date: sessionDate,
      notes,
      videoFileName: fileName,
    });

    setTimeout(() => setStatus("processing"), 800);

    // Run ML analysis
    try {
      await runAnalysis(sessionId);
      setStatus("done");
      
      // Redirect to dashboard after successful analysis
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Analysis failed:", error);
      setStatus("idle");
    }
  };

  const statusLabel = {
    idle: "Not started",
    queued: "Queued for processing…",
    processing: "Analyzing pose & physics…",
    done: "Ready to review in Dashboard",
  }[status];

  const statusColor = {
    idle: "text-slate-400",
    queued: "text-amber-300",
    processing: "text-blue-300",
    done: "text-emerald-300",
  }[status];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">
            Ora · Sports Intelligence
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50">
            New Session
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Upload a new drill, set-piece, or highlight to analyze with pose,
            physics, and AI coaching insights.
          </p>
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs text-slate-300">
          Session status: <span className={statusColor}>{statusLabel}</span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 shadow-sm shadow-black/40">
          <h2 className="text-sm font-semibold text-slate-100">
            Session details
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Choose the clip type, player, and upload your footage.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col gap-5 text-sm text-slate-200"
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-400">
                Session type
              </label>
              <div className="inline-flex overflow-hidden rounded-full border border-slate-800 bg-slate-950/70 p-1 text-xs">
                {[
                  { id: "set-piece", label: "Set-piece" },
                  { id: "drill", label: "Drill" },
                  { id: "highlight", label: "Highlight" },
                ].map((opt) => {
                  const selected = sessionType === (opt.id as SessionType);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSessionType(opt.id as SessionType)}
                      className={`flex-1 rounded-full px-4 py-2 transition ${
                        selected
                          ? "bg-violet-500 text-slate-50 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                          : "text-slate-300 hover:bg-slate-900/70"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Player</label>
                <input
                  type="text"
                  placeholder="e.g. T. Mbappé"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Session date</label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-400">Upload video</label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 px-4 py-6 text-center text-xs text-slate-400 transition hover:border-violet-500 hover:bg-slate-900/60">
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-200">
                  Click to choose file
                </span>
                <span className="max-w-xs text-[11px]">
                  MP4 / MOV, 5–20 seconds recommended.
                  <br />
                  Close- to mid-range clips work best for biomechanics.
                </span>
                <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
              </label>
              {fileName && (
                <p className="mt-1 text-[11px] text-emerald-300">
                  Selected file: <span className="font-medium">{fileName}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-400">Notes (optional)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 10 free-kicks from left channel"
                className="resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-2.5 text-sm font-medium text-slate-50 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:shadow-none"
                disabled={status === "processing"}
              >
                {status === "idle" && "Start analysis"}
                {status === "queued" && "Queued…"}
                {status === "processing" && "Analyzing…"}
                {status === "done" && "Re-run analysis"}
              </button>

              <p className="text-[11px] text-slate-500">
                This simulates the pipeline for now. Backend integration comes next.
              </p>
            </div>
          </form>
        </section>

        {/* right column (tips and hints) */}
        <section className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-100">Capture quality preview</h2>
              <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                !fileName ? "bg-slate-900 text-slate-400" : status === "done" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/10 text-amber-300"
              }`}>
                {!fileName ? "Waiting for upload" : status === "done" ? "Good · Ready to review" : "Pending analysis"}
              </span>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>• ORA auto-checks resolution, frame rate and brightness before full physics.</li>
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

          <div className="rounded-2xl border border-violet-600/40 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-sky-500/10 p-4 text-xs text-slate-50 shadow-[0_0_25px_rgba(59,130,246,0.35)]">
            <p className="font-medium">Workflow hint</p>
            <p className="mt-1 text-[11px] text-violet-100/90">
              After processing, the session appears in the <span className="font-semibold">Dashboard</span>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}