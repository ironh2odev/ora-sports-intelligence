// frontend/app/settings/page.tsx
import Link from "next/link";

export default function SettingsPage() {
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
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <span>New Session</span>
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
              className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-800 text-slate-50"
            >
              <span>Settings</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto px-10 py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
            <p className="mt-1 text-sm text-slate-400">
              Club branding, KPI thresholds and notification preferences.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Club branding */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
              <h2 className="text-sm font-semibold text-slate-200">
                Club profile
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                These details appear on reports and dashboards.
              </p>

              <div className="mt-4 space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Club name
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                    defaultValue="Aura Academy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Primary color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      defaultValue="#4f46e5"
                      className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-slate-900"
                    />
                    <input
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                      defaultValue="#4f46e5"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Logo (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-300">
                      ORA
                    </div>
                    <button className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800">
                      Upload logo
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* KPI thresholds */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
              <h2 className="text-sm font-semibold text-slate-200">
                KPI thresholds
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Define what counts as Green / Amber / Red for your squad.
              </p>

              <div className="mt-4 grid gap-3 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">Impact efficiency</span>
                  <input
                    className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-right outline-none focus:border-indigo-400"
                    defaultValue="75"
                  />
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">
                    Green ≥ 75
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">Risk index</span>
                  <input
                    className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-right outline-none focus:border-indigo-400"
                    defaultValue="0.4"
                  />
                  <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] text-amber-300">
                    Amber ≥ 0.4
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">Asymmetry</span>
                  <input
                    className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-right outline-none focus:border-indigo-400"
                    defaultValue="10"
                  />
                  <span className="rounded-full bg-rose-500/10 px-2 py-1 text-[10px] text-rose-300">
                    Red ≥ 10%
                  </span>
                </div>
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
            <h2 className="text-sm font-semibold text-slate-200">
              Notifications
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Control when ORA sends summary emails or risk alerts.
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-3 w-3 rounded border-slate-600 bg-slate-900" />
                <span>Weekly performance summary per player</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-3 w-3 rounded border-slate-600 bg-slate-900" />
                <span>Immediate alert when risk index goes Red</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-3 w-3 rounded border-slate-600 bg-slate-900" />
                <span>Notify analyst when new session is uploaded</span>
              </label>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="rounded-full bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400">
                Save changes
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}