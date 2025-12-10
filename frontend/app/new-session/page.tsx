// frontend/app/new-session/page.tsx
import Link from "next/link";

export default function NewSessionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950/80 px-5 py-6">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 text-xs font-semibold">
              ORA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide">
                Sports Intelligence
              </span>
              <span className="text-xs text-slate-400">Demo club</span>
            </div>
          </div>

          <nav className="space-y-2 text-sm">
            <Link
              href="/"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <span>Dashboard</span>
            </Link>
            <Link
              href="/new-session"
              className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-800 text-slate-50"
            >
              <span>New Session</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </Link>
            <Link
              href="/trends"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <span>Trends</span>
            </Link>
            <Link
              href="/reports"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <span>Reports</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <span>Settings</span>
            </Link>
          </nav>

          <div className="mt-auto pt-8 text-xs text-slate-500">
            <p>Demo coach: Aura Academy</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-10 py-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                New Session
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Upload a drill, set-piece or highlight clip to analyze.
              </p>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Capture guide v1
            </span>
          </header>

          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            {/* Upload + metadata */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
              <h2 className="mb-4 text-sm font-semibold text-slate-200">
                Session details
              </h2>

              <form className="space-y-4 text-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Session type
                    </label>
                    <select className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-indigo-400">
                      <option>Set-piece</option>
                      <option>Drill</option>
                      <option>Highlight</option>
                    </select>
                    <p className="text-[11px] text-slate-500">
                      We bias analysis toward set-pieces & close-range drills.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Player
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                      placeholder="e.g. Player A"
                    />
                    <p className="text-[11px] text-slate-500">
                      In a real app this would be a roster dropdown.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Camera notes (optional)
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                    placeholder="Side angle, 18-yard box, 60 fps…"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Video file
                  </label>
                  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-8 text-center">
                    <p className="text-sm text-slate-200">
                      Drop a clip here or{" "}
                      <span className="cursor-pointer text-indigo-400 underline underline-offset-2">
                        browse files
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      MP4 / MOV · 5–10s recommended · player should fill at
                      least 15–20% of the frame.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>Capture quality checker will run automatically</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      If the clip is too wide, we&apos;ll still allow pose +
                      basic insights, but gate advanced physics.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400"
                  >
                    Upload & queue analysis
                  </button>
                </div>
              </form>
            </section>

            {/* Capture tips / requirements */}
            <section className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs">
                <h2 className="mb-2 text-sm font-semibold text-slate-200">
                  Capture tips
                </h2>
                <ul className="space-y-2 text-slate-400">
                  <li>• 60 fps or higher where possible.</li>
                  <li>• Player should occupy ≥ 15% of frame height.</li>
                  <li>• Keep the full run-up + follow-through in view.</li>
                  <li>• Avoid heavy motion blur or camera shake.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400">
                <h2 className="mb-2 text-sm font-semibold text-slate-200">
                  What happens next?
                </h2>
                <ol className="space-y-1 list-decimal pl-4">
                  <li>Pose model tracks joints frame-by-frame.</li>
                  <li>PINNs engine estimates forces & ball physics.</li>
                  <li>LLM converts metrics into coach-ready insights.</li>
                  <li>
                    Session appears in your dashboard, trends & reports.
                  </li>
                </ol>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}