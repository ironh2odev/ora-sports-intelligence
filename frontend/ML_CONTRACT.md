# ORA Sports Intelligence - ML → UI Contract Documentation

## Overview

This document describes the clean ML → UI contract architecture implemented for ORA Sports Intelligence. The system is designed so that the UI behaves as if ML exists, while actual backend integration can be dropped in later without touching UI components.

## Architecture

### Core Principles

1. **Single Source of Truth**: `lib/ml-contract.ts` defines what ML MUST return
2. **Type Safety**: All data flows through strongly-typed interfaces
3. **Mock-Driven Development**: UI works with realistic mock data
4. **Future-Proof**: Backend integration = implement the contract with real endpoints

## File Structure

```
frontend/
├── lib/
│   ├── types.ts           # Domain types (Session, SessionStatus, Metrics, etc.)
│   ├── ml-contract.ts     # ML → UI contract (MLSessionResult, etc.)
│   └── mockML.ts          # Mock ML adapter (TEMPORARY - will be replaced)
├── components/
│   └── SessionProvider.tsx # State management & data flow
└── app/
    ├── page.tsx           # Dashboard (reads dashboardMetrics)
    ├── new-session/       # Upload & trigger analysis
    ├── sessions/[id]/     # Session detail (reads mlResult)
    ├── trends/            # Trends page
    └── reports/           # Reports page
```

## Key Interfaces

### MLSessionResult (ml-contract.ts)

This is the **single source of truth** for what ML returns:

```typescript
interface MLSessionResult {
  sessionId: string;
  pose: { keypointsAvailable, confidence };
  physics: { impactEfficiency, spinStability, approachSpeed, etc. };
  risk: { riskIndex, asymmetry, flags, level };
  aiInsights: { summary, coachingPoints, suggestedDrills };
  timeline: { impactFrame, plantFrame, releaseFrame };
  meta: { processedAt, processingTimeMs, modelVersion };
}
```

### Session Types (types.ts)

```typescript
type SessionStatus = "not_started" | "processing" | "processed" | "needs_review";
type SessionType = "set-piece" | "drill" | "highlight";
type QualityLevel = "Good" | "OK" | "Retry";
```

## Data Flow

### 1. Creating a Session

```typescript
// User uploads video in new-session/page.tsx
const sessionId = createSession({
  player: "T. Mbappe",
  type: "set-piece",
  date: "2025-12-23",
  notes: "10 free-kicks from left channel",
  videoFileName: "session.mp4"
});
```

### 2. Running Analysis

```typescript
// Trigger ML processing
await runAnalysis(sessionId);

// Under the hood (in SessionProvider):
// 1. Status → "processing"
// 2. Call ML (currently mock, later real API)
// 3. Receive MLSessionResult
// 4. Attach to session
// 5. Status → "processed"
```

### 3. Consuming Results

```typescript
// In session detail page
const session = getSessionById(id);
const mlResult = session.mlResult;

// Display physics
mlResult.physics.impactEfficiency // 78/100
mlResult.physics.spinStability    // 85/100

// Display AI insights
mlResult.aiInsights.summary        // "Strong set-piece execution..."
mlResult.aiInsights.coachingPoints // ["Focus on approach", ...]
```

## SessionProvider API

### Methods

- `createSession(input)` → Returns sessionId
- `runAnalysis(sessionId)` → Triggers ML processing
- `getSessionById(id)` → Returns SessionWithML
- `updateSessionStatus(id, status)` → Manual status update

### State

- `sessions: SessionWithML[]` - All sessions with optional ML results
- `dashboardMetrics: DashboardMetrics` - Computed aggregate metrics

## Mock ML Adapter (mockML.ts)

**THIS FILE WILL BE REPLACED** by real backend calls.

Current functions:
- `getMockSessionResult()` - Generates realistic fake ML output
- `getMockTrendData()` - Generates historical metrics
- `simulateMLProcessing()` - Adds realistic delay

## Backend Integration Guide

When ML backend is ready, replace `mockML.ts` with:

### 1. Create `lib/mlAPI.ts`:

```typescript
import { MLSessionResult } from './ml-contract';

export async function runMLAnalysis(
  sessionId: string,
  videoBlob: Blob,
  sessionType: SessionType
): Promise<MLSessionResult> {
  // Upload video to backend
  const formData = new FormData();
  formData.append('video', videoBlob);
  formData.append('sessionType', sessionType);
  
  const response = await fetch('/api/ml/analyze', {
    method: 'POST',
    body: formData
  });
  
  // Backend MUST return data matching MLSessionResult
  return await response.json();
}
```

### 2. Update SessionProvider:

```typescript
// Change this line in runAnalysis():
// const mlResult = getMockSessionResult(...);  // OLD
const mlResult = await runMLAnalysis(sessionId, videoBlob, session.type);  // NEW
```

That's it! UI doesn't need to change at all.

## Pages Integration Status

### ✅ Dashboard (app/page.tsx)
- Reads `dashboardMetrics` from provider
- Displays dynamic KPI cards
- Shows recent sessions table
- All data-driven

### ✅ New Session (app/new-session/page.tsx)
- Uses `createSession()` to add session
- Calls `runAnalysis()` to trigger ML
- Redirects to dashboard after processing
- Form validation included

### ✅ Session Detail (app/sessions/[id]/page.tsx)
- Reads session via `getSessionById()`
- Displays ML results if available
- Shows physics metrics, AI insights, risk flags
- Gracefully handles missing ML data

### 🔄 Trends (app/trends/page.tsx)
- Currently placeholder
- Ready for `getMockTrendData()` integration
- Time-series data structure defined

### 🔄 Reports (app/reports/page.tsx)
- Currently placeholder
- Ready for session summaries export
- Report generation structure defined

## Testing the Flow

1. Go to "New Session"
2. Fill in player name, select type, upload "file"
3. Click "Start analysis"
4. Watch status: queued → processing → done
5. Redirect to Dashboard
6. See new session in table
7. Click "Open →" on any processed session
8. See ML results: physics, insights, risk flags

## Metrics Computation

Dashboard metrics are computed from sessions:

```typescript
// In SessionProvider
function computeDashboardMetrics(sessions: SessionWithML[]): DashboardMetrics {
  const processed = sessions.filter(s => s.status === "processed");
  
  return {
    totalSessions: sessions.length,
    avgImpactEfficiency: avg(processed.map(s => s.mlResult.physics.impactEfficiency)),
    riskLevel: computeRiskLevel(processed),
    setPieceEfficiency: mockSummary.setPieceStats.efficiency,
    flaggedPlayers: countFlagged(processed)
  };
}
```

## Future Enhancements

### Phase 1: Real Backend (Replace mockML.ts)
- Upload video to cloud storage
- POST to ML endpoint
- Poll for results or use webhooks
- Store in database

### Phase 2: Video Playback
- Add video player to session detail
- Overlay skeleton on frames
- Timeline scrubbing to impact/plant frames

### Phase 3: Trends & Charts
- Implement time-series visualization
- Player comparison
- Historical performance tracking

### Phase 4: Real-time Processing
- WebSocket connection for live updates
- Progress bar during analysis
- Streaming results as they compute

## Notes

- **No visual changes needed**: UI already styled and finalized
- **Type-safe throughout**: TypeScript catches contract violations
- **Mock data is realistic**: Based on actual domain requirements
- **Backend team has clear contract**: `MLSessionResult` is authoritative

## Questions?

The ML team should:
1. Read `lib/ml-contract.ts` 
2. Implement endpoints that return that exact shape
3. Provide API docs matching the contract
4. Frontend will wire it up in one file (`mlAPI.ts`)

---

**Last Updated**: December 23, 2025  
**Status**: Mock implementation complete, ready for backend integration
