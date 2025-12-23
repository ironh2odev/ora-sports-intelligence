export default function TrendsPage() {
  return (
    <div className="px-6 pb-10 pt-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Trends & Progress</h1>
          <p className="mt-1 text-sm text-slate-400">
            Longitudinal view of key performance and risk indicators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select className="rounded-md bg-slate-800/40 px-3 py-2 text-sm text-slate-200">
            <option>Player A</option>
            <option>Player B</option>
            <option>Player C</option>
          </select>
          <select className="rounded-md bg-slate-800/40 px-3 py-2 text-sm text-slate-200">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* KPI cards with micro-visualization placeholders */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
          <p className="text-xs text-slate-400">Impact efficiency</p>
          <div className="mt-3 text-3xl font-semibold text-white">82</div>
          <p className="mt-1 text-sm text-emerald-400">+12% vs last month</p>

          {/* micro-visualization placeholder (sparkline / mini chart) */}
          <div className="mt-4 h-12 rounded-lg bg-slate-900/40 flex items-center px-3">
            <div className="h-6 w-full bg-gradient-to-r from-violet-600/20 to-sky-400/10 rounded" aria-hidden />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
          <p className="text-xs text-slate-400">Spin stability</p>
          <div className="mt-3 text-3xl font-semibold text-white">91%</div>
          <p className="mt-1 text-sm text-emerald-400">Volatility decreasing</p>

          <div className="mt-4 h-12 rounded-lg bg-slate-900/40 flex items-center px-3">
            <div className="h-6 w-full bg-gradient-to-r from-emerald-400/20 to-teal-300/10 rounded" aria-hidden />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
          <p className="text-xs text-slate-400">Risk index</p>
          <div className="mt-3 text-3xl font-semibold text-white">0.36</div>
          <p className="mt-1 text-sm text-amber-400">Mild valgus trend on left side</p>

          <div className="mt-4 h-12 rounded-lg bg-slate-900/40 flex items-center px-3">
            <div className="h-6 w-full bg-gradient-to-r from-amber-400/20 to-amber-600/10 rounded" aria-hidden />
          </div>
        </div>
      </div>

      {/* Panels with descriptive text */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
          <h2 className="text-sm font-semibold text-slate-200">Set-piece evolution</h2>
          <p className="mt-1 text-xs text-slate-400">
            Spin rpm, impact efficiency and placement deviation over time.
          </p>
          <div className="mt-4 h-56 rounded-xl bg-slate-900/40" />
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
          <h2 className="text-sm font-semibold text-slate-200">Form & load profile</h2>
          <p className="mt-1 text-xs text-slate-400">
            Knee valgus, asymmetry and decel load index.
          </p>
          <div className="mt-4 h-56 rounded-xl bg-slate-900/40" />
        </div>
      </div>
    </div>
  );
}