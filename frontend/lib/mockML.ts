// frontend/lib/mockML.ts
// Mock ML adapter - simulates backend responses
// THIS FILE WILL BE REPLACED by real backend calls

import { MLSessionResult, MLTrendData, MLDashboardSummary } from "./ml-contract";
import { SessionType } from "./types";
import { SportId, getSportAdapter, DEFAULT_SPORT_ID } from "./sports-adapters";

/**
 * Simulate ML processing for a session with sport-specific results
 */
export function getMockSessionResult(
  sessionId: string,
  sessionType: SessionType,
  playerName: string,
  sportId?: SportId
): MLSessionResult {
  const sport = sportId || DEFAULT_SPORT_ID;
  const adapter = getSportAdapter(sport);
  
  // Vary results based on session type
  const baseEfficiency = sessionType === "set-piece" ? 78 : sessionType === "drill" ? 72 : 65;
  const variance = Math.random() * 15 - 7.5;
  const impactEfficiency = Math.max(0, Math.min(100, baseEfficiency + variance));

  const riskValue = Math.random() * 100;
  const riskLevel: "low" | "moderate" | "high" = 
    riskValue < adapter.riskMapping.moderateRiskThreshold ? "low" : 
    riskValue < adapter.riskMapping.highRiskThreshold ? "moderate" : "high";

  const asymmetry = Math.random() * 20;
  
  // Generate sport-specific risk flags
  const flags: string[] = [];
  const possibleFlags = adapter.physicsEmphasis.riskFactors;
  if (asymmetry > 10) flags.push("asymmetry");
  if (riskValue > adapter.riskMapping.highRiskThreshold && possibleFlags.length > 0) {
    flags.push(possibleFlags[0]);
  }
  if (Math.random() > 0.7 && possibleFlags.length > 1) {
    flags.push(possibleFlags[1]);
  }

  // Select discipline based on sport
  const discipline = adapter.metadata.primaryDisciplines[
    Math.floor(Math.random() * adapter.metadata.primaryDisciplines.length)
  ];

  return {
    sessionId,
    sportId: sport,
    context: {
      sportId: sport,
      discipline,
      contextTags: [sessionType, adapter.metadata.contextTags[0]],
    },
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
      summary: generateInsightSummary(sport, sessionType, discipline, impactEfficiency, riskLevel),
      coachingPoints: generateCoachingPoints(sport, sessionType),
      suggestedDrills: generateSuggestedDrills(sport, sessionType),
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

// Helper functions for generating realistic sport-specific mock content
function generateInsightSummary(
  sport: SportId,
  type: SessionType,
  discipline: string,
  efficiency: number,
  risk: "low" | "moderate" | "high"
): string {
  const adapter = getSportAdapter(sport);
  
  if (efficiency > 80) {
    const template = adapter.insightLanguage.positiveTemplates[0];
    return template.replace("{discipline}", discipline) + ` Risk level: ${risk}.`;
  } else {
    const template = adapter.insightLanguage.improvementTemplates[0];
    return template.replace("{area}", discipline) + ` Risk level: ${risk}.`;
  }
}

function generateCoachingPoints(sport: SportId, type: SessionType): string[] {
  const adapter = getSportAdapter(sport);
  const templates = [...adapter.insightLanguage.improvementTemplates];
  
  // Pick 3 random coaching points
  const shuffled = templates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function generateSuggestedDrills(sport: SportId, type: SessionType): string[] {
  const adapter = getSportAdapter(sport);
  const drills = [...adapter.insightLanguage.drillSuggestions];
  
  // Pick 3 random drills
  const shuffled = drills.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

/**
 * Simulate processing delay
 */
export async function simulateMLProcessing(durationMs: number = 1500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}
