"use client";

import { useState } from "react";
import { getMockTrendData } from "@/lib/mockML";

type MetricType = "impactEfficiency" | "spinStability" | "riskIndex" | "asymmetry";

export default function TrendsPage() {
  const [selectedPlayer, setSelectedPlayer] = useState("Player A");
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("impactEfficiency");
  const [days, setDays] = useState(30);

  // Fetch mock trend data
  const trendData = getMockTrendData(selectedPlayer, selectedMetric, days);

  // Format metric name for display
  const formatMetricName = (metric: MetricType): string => {
    switch (metric) {
      case "impactEfficiency":
        return "Impact Efficiency";
      case "spinStability":
        return "Spin Stability";
      case "riskIndex":
        return "Risk Index";
      case "asymmetry":
        return "Asymmetry";
    }
  };

  // Format date for display
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

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
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="rounded-md bg-slate-800/40 px-3 py-2 text-sm text-slate-200"
          >
            <option>Player A</option>
            <option>Player B</option>
            <option>Player C</option>
            <option>T. Mbappe</option>
            <option>A. Silva</option>
            <option>J. Alvarez</option>
          </select>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-md bg-slate-800/40 px-3 py-2 text-sm text-slate-200"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Metric selector */}
      <div className="mb-6">
        <label className="mb-2 block text-sm text-slate-400">Select Metric</label>
        <div className="flex gap-2">
          {(["impactEfficiency", "spinStability", "riskIndex", "asymmetry"] as MetricType[]).map(
            (metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                  selectedMetric === metric
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800/40 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {formatMetricName(metric)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Trend data display */}
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-200">
          {formatMetricName(selectedMetric)} - {selectedPlayer}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Session ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {trendData.dataPoints.map((point, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20">
                  <td className="px-4 py-3 text-slate-300">{formatDate(point.timestamp)}</td>
                  <td className="px-4 py-3 text-slate-100 font-semibold">{point.value}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{point.sessionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {trendData.dataPoints.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">
            No trend data available for the selected period.
          </p>
        )}
      </div>
    </div>
  );
}