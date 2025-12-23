"use client";

import { useSessions, mapTypeToDisplay, mapStatusToDisplay } from "@/components/SessionProvider";

export default function ReportsPage() {
  const { sessions } = useSessions();

  // Generate full report from all sessions
  const handleGenerateReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      club: "Aura Academy",
      totalSessions: sessions.length,
      sessions: sessions.map((session) => ({
        id: session.id,
        date: session.date,
        type: mapTypeToDisplay(session.type),
        player: session.player,
        status: mapStatusToDisplay(session.status),
        quality: session.quality,
        metrics: session.mlResult
          ? {
              impactEfficiency: session.mlResult.physics.impactEfficiency,
              spinStability: session.mlResult.physics.spinStability,
              approachSpeed: session.mlResult.physics.approachSpeed,
              loadIndex: session.mlResult.physics.loadIndex,
              riskIndex: session.mlResult.risk.riskIndex,
              asymmetry: session.mlResult.risk.asymmetry,
              riskLevel: session.mlResult.risk.level,
              riskFlags: session.mlResult.risk.flags,
            }
          : null,
        aiSummary: session.mlResult?.aiInsights.summary,
        coachingPoints: session.mlResult?.aiInsights.coachingPoints,
        createdAt: session.createdAt?.toISOString(),
        processedAt: session.processedAt?.toISOString(),
      })),
    };

    downloadJSON(report, "ora-report.json");
  };

  // Generate report for a single session
  const handleDownloadSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    const report = {
      generatedAt: new Date().toISOString(),
      club: "Aura Academy",
      session: {
        id: session.id,
        date: session.date,
        type: mapTypeToDisplay(session.type),
        player: session.player,
        status: mapStatusToDisplay(session.status),
        quality: session.quality,
        metrics: session.mlResult
          ? {
              impactEfficiency: session.mlResult.physics.impactEfficiency,
              spinStability: session.mlResult.physics.spinStability,
              approachSpeed: session.mlResult.physics.approachSpeed,
              loadIndex: session.mlResult.physics.loadIndex,
              peakTorque: session.mlResult.physics.peakTorque,
              riskIndex: session.mlResult.risk.riskIndex,
              asymmetry: session.mlResult.risk.asymmetry,
              riskLevel: session.mlResult.risk.level,
              riskFlags: session.mlResult.risk.flags,
            }
          : null,
        aiSummary: session.mlResult?.aiInsights.summary,
        coachingPoints: session.mlResult?.aiInsights.coachingPoints,
        suggestedDrills: session.mlResult?.aiInsights.suggestedDrills,
        timeline: session.mlResult?.timeline,
        createdAt: session.createdAt?.toISOString(),
        processedAt: session.processedAt?.toISOString(),
      },
    };

    downloadJSON(report, `ora-session-${sessionId}.json`);
  };

  // Helper to download JSON
  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Session summaries you can export or share with players & staff.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          className="rounded-full bg-slate-900 px-4 py-2 text-xs text-slate-200 ring-1 ring-slate-700 hover:bg-slate-800"
        >
          Generate sample report
        </button>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
          <span>Recent reports ({sessions.length} sessions)</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/40">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950/80 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Session type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-4 py-3 text-xs text-slate-300">{formatDate(session.date)}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">{session.player}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    {mapTypeToDisplay(session.type)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {mapStatusToDisplay(session.status)}
                  </td>
                  <td className="px-4 py-3 text-right text-xs">
                    <button
                      onClick={() => window.open(`/sessions/${session.id}`, "_blank")}
                      className="rounded-full bg-slate-800 px-3 py-1 text-slate-100 hover:bg-slate-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDownloadSession(session.id)}
                      className="ml-2 rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-800"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sessions.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">No sessions available yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}