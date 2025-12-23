// frontend/lib/ml-contract.ts
// SINGLE SOURCE OF TRUTH: ML → UI contract

/**
 * This interface defines what the ML backend MUST return.
 * UI will ONLY depend on this contract.
 * Backend integration = implement this interface with real data.
 */
export interface MLSessionResult {
  sessionId: string;
  
  // Pose estimation results
  pose: {
    keypointsAvailable: boolean;
    confidence: number; // 0-1
    skeletonData?: unknown; // Future: actual keypoint coordinates
  };
  
  // Physics & biomechanics
  physics: {
    impactEfficiency: number; // 0-100
    spinStability: number; // 0-100
    approachSpeed?: number; // m/s
    loadIndex?: number; // 0-100
    peakTorque?: number; // Nm
    trajectoryData?: unknown; // Future: trajectory points
  };
  
  // Risk assessment
  risk: {
    riskIndex: number; // 0-100
    asymmetry: number; // percentage 0-100
    flags: string[]; // e.g., ["valgus", "asymmetry"]
    level: "low" | "moderate" | "high";
  };
  
  // AI coaching insights (LLM-generated)
  aiInsights: {
    summary: string;
    coachingPoints: string[];
    suggestedDrills: string[];
  };
  
  // Timeline markers
  timeline: {
    impactFrame?: number;
    plantFrame?: number;
    releaseFrame?: number;
  };
  
  // Processing metadata
  meta: {
    processedAt: string; // ISO timestamp
    processingTimeMs: number;
    modelVersion: string;
  };
}

/**
 * Time-series data for trends
 */
export interface MLTrendData {
  playerId: string;
  metric: "impactEfficiency" | "riskIndex" | "asymmetry" | "spinStability";
  dataPoints: Array<{
    timestamp: string;
    value: number;
    sessionId: string;
  }>;
}

/**
 * Aggregate dashboard metrics
 */
export interface MLDashboardSummary {
  totalSessions: number;
  avgImpactEfficiency: number;
  riskSummary: {
    level: "low" | "moderate" | "high";
    flaggedPlayers: string[];
  };
  setPieceStats: {
    efficiency: number; // out of last 10
    total: number;
  };
  recentChange: {
    sessions: number; // vs last week
    trend: "up" | "down" | "stable";
  };
}
