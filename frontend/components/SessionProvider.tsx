"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type SessionStatus = "Processed" | "Processing" | "Needs review";
export type SessionType = "Set-piece" | "Drill" | "Highlight";
export type SessionQuality = "Good" | "OK" | "Retry";

export type Session = {
  id: string;
  date: string;
  type: SessionType;
  player: string;
  quality: SessionQuality;
  status: SessionStatus;
};

type SessionContextValue = {
  sessions: Session[];
  addSession: (s: Omit<Session, "id">) => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const initialSessions: Session[] = [
  {
    id: "s1",
    date: "2025-12-10",
    type: "Set-piece",
    player: "T. Mbappe",
    quality: "Good",
    status: "Processed",
  },
  {
    id: "s2",
    date: "2025-12-10",
    type: "Drill",
    player: "A. Silva",
    quality: "OK",
    status: "Processing",
  },
  {
    id: "s3",
    date: "2025-12-09",
    type: "Highlight",
    player: "J. Alvarez",
    quality: "Retry",
    status: "Needs review",
  },
];

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const addSession = (sessionInput: Omit<Session, "id">) => {
    setSessions((prev) => [
      {
        id: crypto?.randomUUID?.() ?? String(Date.now()),
        ...sessionInput,
      },
      ...prev,
    ]);
  };

  return (
    <SessionContext.Provider value={{ sessions, addSession }}>
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