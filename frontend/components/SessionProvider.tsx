"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Session, SessionStatus, SessionType, QualityLevel, DashboardMetrics } from "../lib/types";
import { MLSessionResult, MLDashboardSummary } from "../lib/ml-contract";
import { getMockSessionResult, getMockDashboardSummary, simulateMLProcessing } from "../lib/mockML";

// Extended session with ML results
export type SessionWithML = Session & {
  mlResult?: MLSessionResult;
};

type SessionContextValue = {
  sessions: SessionWithML[];
  dashboardMetrics: DashboardMetrics;
  createSession: (input: {
    player: string;
    type: SessionType;
    date: string;
    notes?: string;
    videoFileName?: string;
  }) => string;
  runAnalysis: (sessionId: string) => Promise<void>;
  getSessionById: (id: string) => SessionWithML | undefined;
  updateSessionStatus: (id: string, status: SessionStatus) => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

// Helper to map SessionType to display format
function mapTypeToDisplay(type: SessionType): "Set-piece" | "Drill" | "Highlight" {
  if (type === "set-piece") return "Set-piece";
  if (type === "drill") return "Drill";
  return "Highlight";
}

// Helper to map display format back to SessionType
function mapDisplayToType(display: string): SessionType {
  if (display === "Set-piece") return "set-piece";
  if (display === "Drill") return "drill";
  return "highlight";
}

// Helper to map SessionStatus to display format
function mapStatusToDisplay(status: SessionStatus): "Processed" | "Processing" | "Needs review" | "Not started" {
  if (status === "processed") return "Processed";
  if (status === "processing") return "Processing";
  if (status === "needs_review") return "Needs review";
  return "Not started";
}

const initialSessions: SessionWithML[] = [
  {
    id: "s1",
    date: "2025-12-10",
    type: "set-piece",
    player: "T. Mbappe",
    quality: "Good",
    status: "processed",
    createdAt: new Date("2025-12-10"),
    processedAt: new Date("2025-12-10"),
  },
  {
    id: "s2",
    date: "2025-12-10",
    type: "drill",
    player: "A. Silva",
    quality: "OK",
    status: "processing",
    createdAt: new Date("2025-12-10"),
  },
  {
    id: "s3",
    date: "2025-12-09",
    type: "highlight",
    player: "J. Alvarez",
    quality: "Retry",
    status: "needs_review",
    createdAt: new Date("2025-12-09"),
  },
];

// Generate ML results for initial sessions
initialSessions.forEach((session) => {
  if (session.status === "processed") {
    session.mlResult = getMockSessionResult(session.id, session.type, session.player);
  }
});

function computeDashboardMetrics(sessions: SessionWithML[]): DashboardMetrics {
  const mockSummary = getMockDashboardSummary();
  const processedSessions = sessions.filter((s) => s.status === "processed");
  
  const avgEfficiency = processedSessions.length > 0
    ? Math.round(
        processedSessions
          .map((s) => s.mlResult?.physics.impactEfficiency ?? 0)
          .reduce((a, b) => a + b, 0) / processedSessions.length
      )
    : mockSummary.avgImpactEfficiency;

  const riskFlags = processedSessions.filter(
    (s) => s.mlResult?.risk.level === "high" || s.mlResult?.risk.level === "moderate"
  );

  return {
    totalSessions: sessions.length,
    avgImpactEfficiency: avgEfficiency,
    riskLevel: riskFlags.length > 2 ? "high" : riskFlags.length > 0 ? "moderate" : "low",
    setPieceEfficiency: mockSummary.setPieceStats.efficiency,
    flaggedPlayers: Math.min(riskFlags.length, 3),
  };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<SessionWithML[]>(initialSessions);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>(
    computeDashboardMetrics(initialSessions)
  );

  const createSession = (input: {
    player: string;
    type: SessionType;
    date: string;
    notes?: string;
    videoFileName?: string;
  }): string => {
    const newSession: SessionWithML = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      date: input.date,
      type: input.type,
      player: input.player,
      quality: "Good",
      status: "not_started",
      notes: input.notes,
      videoFileName: input.videoFileName,
      createdAt: new Date(),
    };

    setSessions((prev) => {
      const updated = [newSession, ...prev];
      setDashboardMetrics(computeDashboardMetrics(updated));
      return updated;
    });

    return newSession.id;
  };

  const runAnalysis = async (sessionId: string): Promise<void> => {
    // Update status to processing
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: "processing" as SessionStatus } : s))
    );

    // Simulate ML processing
    await simulateMLProcessing(1500);

    // Get mock ML result
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    const mlResult = getMockSessionResult(sessionId, session.type, session.player);

    // Update session with results
    setSessions((prev) => {
      const updated = prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status: "processed" as SessionStatus,
              quality: mlResult.pose.confidence > 0.9 ? "Good" as QualityLevel : "OK" as QualityLevel,
              processedAt: new Date(),
              mlResult,
            }
          : s
      );
      setDashboardMetrics(computeDashboardMetrics(updated));
      return updated;
    });
  };

  const getSessionById = (id: string): SessionWithML | undefined => {
    return sessions.find((s) => s.id === id);
  };

  const updateSessionStatus = (id: string, status: SessionStatus): void => {
    setSessions((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, status } : s));
      setDashboardMetrics(computeDashboardMetrics(updated));
      return updated;
    });
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        dashboardMetrics,
        createSession,
        runAnalysis,
        getSessionById,
        updateSessionStatus,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessions() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSessions must be used within SessionProvider");
  }
  return ctx;
}

// Export helper functions for components that need display mapping
export { mapTypeToDisplay, mapStatusToDisplay, mapDisplayToType };