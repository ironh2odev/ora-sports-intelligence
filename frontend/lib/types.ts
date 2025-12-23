// frontend/lib/types.ts
// Core domain types for ORA Sports Intelligence

export type SessionStatus = "not_started" | "processing" | "processed" | "needs_review";
export type SessionType = "set-piece" | "drill" | "highlight";
export type QualityLevel = "Good" | "OK" | "Retry";

export interface Session {
  id: string;
  date: string;
  type: SessionType;
  player: string;
  quality: QualityLevel;
  status: SessionStatus;
  videoFileName?: string;
  notes?: string;
  createdAt: Date;
  processedAt?: Date;
}

// Metrics interfaces
export interface ImpactEfficiency {
  value: number; // 0-100
  target: number; // e.g., 80
  trend?: "up" | "down" | "stable";
}

export interface SpinStability {
  value: number; // 0-100
  consistency: number; // coefficient of variation
}

export interface RiskIndex {
  value: number; // 0-100
  level: "low" | "moderate" | "high";
  flags: string[];
}

export interface Asymmetry {
  value: number; // percentage 0-100
  leftRight: number; // -100 to +100 (negative = left weaker)
}

export interface LoadIndex {
  value: number;
  peakLoad: number;
  distribution: "balanced" | "asymmetric";
}

// Time series support
export interface MetricPoint {
  timestamp: string; // ISO date
  value: number;
  sessionId?: string;
}

// Grouped metrics per session
export interface SessionMetrics {
  impactEfficiency?: ImpactEfficiency;
  spinStability?: SpinStability;
  riskIndex: RiskIndex;
  asymmetry: Asymmetry;
  loadIndex?: LoadIndex;
}

// Dashboard aggregate metrics
export interface DashboardMetrics {
  totalSessions: number;
  avgImpactEfficiency: number;
  riskLevel: "low" | "moderate" | "high";
  setPieceEfficiency: number;
  flaggedPlayers: number;
}
