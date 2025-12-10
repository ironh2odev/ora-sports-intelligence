// frontend/app/reports/page.tsx
import Link from "next/link";

export default function ReportsPage() {
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
              className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-800 text-slate-50"
            >
              <span>Reports</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
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
                Reports
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Session summaries you can export or share with players & staff.
              </p>
            </div>

            <button className="rounded-full bg-slate-900 px-4 py-2 text-xs text-slate-200 ring-1 ring-slate-700 hover:bg-slate-800">
              Generate sample report
            </button>
          </header>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span>Recent reports</span>
              <div className="flex gap-2">
                <select className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-200 outline-none focus:border-indigo-400">
                  <option>All players</option>
                  <option>Player A</option>
                  <option>Player B</option>
                </select>
                <select className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-200 outline-none focus:border-indigo-400">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/40">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-950/80 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Player</th>
                    <th className="px-4 py-3">Session type</th>
                    <th className="px-4 py-3">Focus</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="px-4 py-3 text-xs text-slate-300">Dec 10</td>
                    <td className="px-4 py-3 text-xs text-slate-300">Player A</td>
                    <td className="px-4 py-3 text-xs text-slate-300">
                      Set-piece
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      Free-kick efficiency & spin stability
                    </td>
                    <td className="px-4 py-3 text-right text-xs">
                      <button className="rounded-full bg-slate-800 px-3 py-1 text-slate-100 hover:bg-slate-700">
                        View
                      </button>
                      <button className="ml-2 rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-800">
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-xs text-slate-300">Dec 8</td>
                    <td className="px-4 py-3 text-xs text-slate-300">Player B</td>
                    <td className="px-4 py-3 text-xs text-slate-300">Drill</td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      Decel load & valgus risk
                    </td>
                    <td className="px-4 py-3 text-right text-xs">
                      <button className="rounded-full bg-slate-800 px-3 py-1 text-slate-100 hover:bg-slate-700">
                        View
                      </button>
                      <button className="ml-2 rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-800">
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}