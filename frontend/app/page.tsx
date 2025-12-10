export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Performance Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            High-level view of recent sessions, efficiency and risk flags.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800">
          New Session
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="aura-card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Sessions (last 7 days)
          </p>
          <p className="mt-3 text-2xl font-semibold">14</p>
          <p className="mt-1 text-xs text-emerald-400">+18% vs previous week</p>
        </div>

        <div className="aura-card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Avg. Set-piece Efficiency
          </p>
          <p className="mt-3 text-2xl font-semibold">82</p>
          <p className="mt-1 text-xs text-slate-400">Impact score / 100</p>
        </div>

        <div className="aura-card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Risk Flags
          </p>
          <p className="mt-3 text-2xl font-semibold text-amber-300">3</p>
          <p className="mt-1 text-xs text-amber-400">
            Focus: knee valgus & asymmetry
          </p>
        </div>
      </div>

      {/* Recent sessions table (static demo for now) */}
      <div className="aura-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-100">
            Recent Sessions
          </h2>
          <span className="aura-badge">Demo data</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800/70">
          <table className="min-w-full divide-y divide-slate-800/90 text-sm">
            <thead className="bg-slate-950/70">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Type
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Player
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Quality
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
              <tr>
                <td className="px-3 py-2 text-slate-200">Dec 10</td>
                <td className="px-3 py-2 text-slate-200">Set-piece</td>
                <td className="px-3 py-2 text-slate-200">Player A</td>
                <td className="px-3 py-2">
                  <span className="aura-badge bg-emerald-500/20 text-emerald-300">
                    Good
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-200">Processed</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-200">Dec 9</td>
                <td className="px-3 py-2 text-slate-200">Drill</td>
                <td className="px-3 py-2 text-slate-200">Player B</td>
                <td className="px-3 py-2">
                  <span className="aura-badge bg-amber-500/20 text-amber-300">
                    OK
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-200">Needs review</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-200">Dec 8</td>
                <td className="px-3 py-2 text-slate-200">Highlight</td>
                <td className="px-3 py-2 text-slate-200">Player C</td>
                <td className="px-3 py-2">
                  <span className="aura-badge bg-slate-800 text-slate-300">
                    Retry
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-200">Pose only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}