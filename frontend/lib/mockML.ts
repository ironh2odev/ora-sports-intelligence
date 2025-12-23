// frontend/lib/mockML.ts
// Mock ML adapter - simulates backend responses
// THIS FILE WILL BE REPLACED by real backend calls

import { MLSessionResult, MLTrendData, MLDashboardSummary } from "./ml-contract";
import { SessionType } from "./types";

/**
 * Simulate ML processing for a session
 */
export function getMockSessionResult(
  sessionId: string,
  sessionType: SessionType,
  playerName: string
): MLSessionResult {
  // Vary results based on session type
  const baseEfficiency = sessionType === "set-piece" ? 78 : sessionType === "drill" ? 72 : 65;
  const variance = Math.random() * 15 - 7.5;
  const impactEfficiency = Math.max(0, Math.min(100, baseEfficiency + variance));

  const riskValue = Math.random() * 100;
  const riskLevel: "low" | "moderate" | "high" = 
    riskValue < 30 ? "low" : riskValue < 60 ? "moderate" : "high";

  const asymmetry = Math.random() * 20;
  const flags: string[] = [];
  if (asymmetry > 10) flags.push("asymmetry");
  if (riskValue > 60) flags.push("valgus");
  if (Math.random() > 0.7) flags.push("decel_load");

  return {
    sessionId,
    pose: {
      keypointsAvailable: true,
      confidence: 0.85 + Math.random() * 0.1,
    },
    physics: {
      impactEfficiency: Math.round(impactEfficiency),
      spinStability: Math.round(70 + Math.random() * 25),
      approachSpeed: 4.2 + Math.random() * 1.5,
      loadIndex: Math.round(50 + Math.random() * 30),
      peakTorque: 120 + Math.random() * 40,
    },
    risk: {
      riskIndex: Math.round(riskValue),
      asymmetry: Math.round(asymmetry),
      flags,
      level: riskLevel,
    },
    aiInsights: {
      summary: generateInsightSummary(sessionType, impactEfficiency, riskLevel),
      coachingPoints: generateCoachingPoints(sessionType),
      suggestedDrills: generateSuggestedDrills(sessionType),
    },
    timeline: {
      impactFrame: Math.floor(45 + Math.random() * 15),
      plantFrame: Math.floor(25 + Math.random() * 10),
      releaseFrame: Math.floor(50 + Math.random() * 10),
    },
    meta: {
      processedAt: new Date().toISOString(),
      processingTimeMs: Math.round(1200 + Math.random() * 800),
      modelVersion: "v1.2.0-mock",
    },
  };
}

/**
 * Generate mock trend data for a player
 */
export function getMockTrendData(
  playerId: string,
  metric: "impactEfficiency" | "riskIndex" | "asymmetry" | "spinStability",
  days: number = 30
): MLTrendData {
  const dataPoints = [];
  const now = new Date();
  
  for (let i = days; i > 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic trend with some variance
    let baseValue = 0;
    if (metric === "impactEfficiency") baseValue = 75 + Math.random() * 15;
    if (metric === "riskIndex") baseValue = 35 + Math.random() * 25;
    if (metric === "asymmetry") baseValue = 5 + Math.random() * 10;
    if (metric === "spinStability") baseValue = 70 + Math.random() * 20;
    
    dataPoints.push({
      timestamp: date.toISOString(),
      value: Math.round(baseValue),
      sessionId: `session-${i}`,
    });
  }
  
  return {
    playerId,
    metric,
    dataPoints,
  };
}

/**
 * Generate mock dashboard summary
 */
export function getMockDashboardSummary(): MLDashboardSummary {
  const avgEfficiency = Math.round(75 + Math.random() * 10);
  
  return {
    totalSessions: 12,
    avgImpactEfficiency: avgEfficiency,
    riskSummary: {
      level: "moderate",
      flaggedPlayers: ["Player A", "Player C"],
    },
    setPieceStats: {
      efficiency: 6,
      total: 10,
    },
    recentChange: {
      sessions: 3,
      trend: "up",
    },
  };
}

// Helper functions for generating realistic mock content
function generateInsightSummary(
  type: SessionType,
  efficiency: number,
  risk: "low" | "moderate" | "high"
): string {
  if (type === "set-piece") {
    return efficiency > 80
      ? `Strong ${type} execution with good power transfer. Risk level: ${risk}.`
      : `Moderate ${type} performance. Focus on approach consistency. Risk level: ${risk}.`;
  }
  if (type === "drill") {
    return `Drill shows ${risk} risk markers. Impact efficiency at ${Math.round(efficiency)}%. Consider load management.`;
  }
  return `Highlight analyzed. Performance metrics captured for tactical review.`;
}

function generateCoachingPoints(type: SessionType): string[] {
  const points = [
    "Maintain consistent approach speed",
    "Focus on plant leg stability",
    "Optimize striking angle for spin",
  ];
  
  if (type === "drill") {
    points.push("Monitor fatigue levels");
    points.push("Ensure bilateral symmetry");
  }
  
  return points.slice(0, 3);
}

function generateSuggestedDrills(type: SessionType): string[] {
  if (type === "set-piece") {
    return [
      "Free-kick accuracy drill (10 reps)",
      "Power transfer exercises",
      "Approach consistency training",
    ];
  }
  if (type === "drill") {
    return [
      "Single-leg stability work",
      "Deceleration mechanics",
      "Plyometric progression",
    ];
  }
  return [
    "Tactical positioning review",
    "Video analysis session",
  ];
}

/**
 * Simulate processing delay
 */
export async function simulateMLProcessing(durationMs: number = 1500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}
