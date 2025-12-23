"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useSessions } from "../../../components/SessionProvider";

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { sessions } = useSessions();

  const id = params?.id as string;
  const session = sessions.find((s) => s.id === id);

  if (!session) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-300">
        <p className="text-sm">Session not found.</p>
        <button
          onClick={() => router.push("/")}
          className="rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 pb-10 pt-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-xs text-slate-400">
        <button
          onClick={() => router.push("/")}
          className="mr-2 text-sky-400 hover:text-sky-300"
        >
          Dashboard
        </button>
        <span>/</span>
        <span className="ml-2 text-slate-300">Session</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">
            {session.type} session – {session.player}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {session.date} · Quality:{" "}
            <span className="font-medium text-slate-200">{session.quality}</span>{" "}
            · Status:{" "}
            <span className="font-medium text-slate-200">{session.status}</span>
          </p>
        </div>

        <button
          onClick={() => router.push("/new-session")}
          className="rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/40 hover:bg-violet-400"
        >
          Analyze another clip
        </button>
      </div>

      {/* Pipeline steps */}
      <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Analysis pipeline
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          {[
            "Upload",
            "Pose estimation",
            "Physics & biomechanics",
            "AI coaching insights",
            "Trends & report",
          ].map((step, idx) => (
            <div key={step} className="flex items-center gap-2 text-slate-300">
              <div className="flex h-7 items-center rounded-full bg-slate-900/80 px-3">
                <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-violet-500/80 text-[10px] font-semibold text-white">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
              {idx < 4 && <span className="text-slate-600">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main content: placeholders for Pose / Physics / Insights */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr,1.1fr]">
        <div className="space-y-4">
          <div className="h-64 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium">Clip & pose overlay</span>
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-400">
                Placeholder
              </span>
            </div>
            <p className="max-w-md text-xs text-slate-400">
              Here we'll render the session video with a skeleton overlay,
              event markers (plant / impact), and basic playback controls.
              For now, this is a static placeholder so we can wire the rest of
              the UI.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium">Physics & biomechanics</span>
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-400">
                Coming soon
              </span>
            </div>
            <p className="max-w-md text-xs text-slate-400">
              This panel will show torque curves, approach speed, spin,
              trajectory previews, and fatigue indices powered by the PINNs
              engine.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              AI coaching insights (summary)
            </p>
            <p className="mb-3 text-sm text-slate-200">
              Once the backend is wired, this block will show a few headline
              insights for this session — e.g. power, control, and risk notes
              with suggested drills.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Power: placeholder summary.</li>
              <li>• Control: placeholder summary.</li>
              <li>• Risk: placeholder summary.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 text-xs text-slate-400">
            <p className="mb-1 font-semibold text-slate-200">
              Next steps in the build
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Connect this view to the backend session API.</li>
              <li>Add real pose & physics visualizations.</li>
              <li>Render LLM insights per session.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
