// frontend/app/trends/page.tsx
import Link from "next/link";

export default function TrendsPage() {
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
              className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-800 text-slate-50"
            >
              <span>Trends</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
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
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto px-10 py-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Trends & Progress
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Longitudinal view of key performance and risk indicators.
              </p>
            </div>

            <div className="flex gap-2 text-xs">
              <select className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 outline-none focus:border-indigo-400">
                <option>Player A</option>
                <option>Player B</option>
                <option>Player C</option>
              </select>
              <select className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 outline-none focus:border-indigo-400">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* KPI tiles */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs text-slate-400">Impact efficiency</p>
              <p className="mt-2 text-3xl font-semibold">82</p>
              <p className="mt-1 text-xs text-emerald-400">+12% vs last month</p>
              <div className="mt-4 h-16 rounded-lg bg-slate-900/60" />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs text-slate-400">Spin stability</p>
              <p className="mt-2 text-3xl font-semibold">91%</p>
              <p className="mt-1 text-xs text-emerald-400">
                Volatility decreasing
              </p>
              <div className="mt-4 h-16 rounded-lg bg-slate-900/60" />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs text-slate-400">Risk index</p>
              <p className="mt-2 text-3xl font-semibold">0.36</p>
              <p className="mt-1 text-xs text-amber-400">
                Mild valgus trend on left side
              </p>
              <div className="mt-4 h-16 rounded-lg bg-slate-900/60" />
            </div>
          </div>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-200">
                Set-piece evolution
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Spin rpm, impact efficiency and placement deviation over time.
              </p>
              <div className="mt-4 h-56 rounded-xl bg-slate-900/60" />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-200">
                Form & load profile
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Knee valgus, asymmetry and decel load index.
              </p>
              <div className="mt-4 h-56 rounded-xl bg-slate-900/60" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}