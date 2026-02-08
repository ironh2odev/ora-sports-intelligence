// frontend/lib/sports-adapters.ts
// Sport Adapter architecture for multi-sport ORA intelligence

export type SportId = "football" | "basketball" | "tennis" | "sprinting" | "swimming" | "skiing";

export const DEFAULT_SPORT_ID: SportId = "football";

/**
 * Sport Adapter interface - defines sport-specific customization layers
 */
export interface SportAdapter {
  // 1. Sport metadata & context
  metadata: {
    name: string;
    icon: string; // emoji or future: icon name
    primaryDisciplines: string[]; // e.g., ["free-kick", "penalty", "corner"]
    contextTags: string[]; // e.g., ["set-piece", "in-game", "training"]
  };

  // 2. Pose schema emphasis - which joints/segments matter most
  poseEmphasis: {
    criticalJoints: string[]; // e.g., ["ankle", "knee", "hip"]
    secondaryJoints: string[];
    trackingPriority: "upper" | "lower" | "full-body"; // where to focus pose tracking
  };

  // 3. Physics/biomechanics emphasis - which metrics are shown/weighted
  physicsEmphasis: {
    primaryMetrics: string[]; // e.g., ["impactEfficiency", "spinStability"]
    secondaryMetrics: string[];
    riskFactors: string[]; // sport-specific risk markers
  };

  // 4. Risk mapping - how risk flags + thresholds map to sport-specific meanings
  riskMapping: {
    highRiskThreshold: number; // 0-100
    moderateRiskThreshold: number; // 0-100
    flagMeanings: Record<string, string>; // e.g., {"valgus": "Knee collapse inward during plant"}
  };

  // 5. Insight language - how AI coaching outputs are phrased per sport
  insightLanguage: {
    positiveTemplates: string[]; // e.g., ["Strong {discipline} execution with good power transfer"]
    improvementTemplates: string[]; // e.g., ["Focus on {area} consistency"]
    riskTemplates: string[]; // e.g., ["{flag} detected - consider {action}"]
    drillSuggestions: string[]; // sport-specific drill names
  };
}

/**
 * Football (Soccer) Adapter
 */
const footballAdapter: SportAdapter = {
  metadata: {
    name: "Football",
    icon: "⚽",
    primaryDisciplines: ["free-kick", "penalty", "corner", "cross", "shot"],
    contextTags: ["set-piece", "in-game", "training", "match-day"],
  },
  poseEmphasis: {
    criticalJoints: ["hip", "knee", "ankle", "plant-leg"],
    secondaryJoints: ["shoulder", "elbow", "wrist"],
    trackingPriority: "lower",
  },
  physicsEmphasis: {
    primaryMetrics: ["impactEfficiency", "spinStability", "approachSpeed"],
    secondaryMetrics: ["loadIndex", "peakTorque"],
    riskFactors: ["valgus", "asymmetry", "decel_load", "hip_rotation"],
  },
  riskMapping: {
    highRiskThreshold: 60,
    moderateRiskThreshold: 30,
    flagMeanings: {
      valgus: "Knee collapse inward during plant phase - ACL risk",
      asymmetry: "Left-right imbalance in power generation",
      decel_load: "Excessive deceleration forces on plant leg",
      hip_rotation: "Limited hip rotation reducing power transfer",
    },
  },
  insightLanguage: {
    positiveTemplates: [
      "Strong set-piece execution with good power transfer",
      "Excellent approach consistency and plant stability",
      "Clean striking mechanics with optimal spin generation",
    ],
    improvementTemplates: [
      "Focus on approach angle consistency",
      "Work on plant leg stability during deceleration",
      "Optimize hip rotation for improved power transfer",
    ],
    riskTemplates: [
      "Valgus detected - consider single-leg stability work",
      "Asymmetry noted - bilateral strength training recommended",
      "Deceleration load high - monitor fatigue and volume",
    ],
    drillSuggestions: [
      "Free-kick accuracy drill (10 reps)",
      "Power transfer exercises",
      "Approach consistency training",
      "Single-leg stability work",
      "Deceleration mechanics drill",
      "Hip rotation mobility",
    ],
  },
};

/**
 * Basketball Adapter
 */
const basketballAdapter: SportAdapter = {
  metadata: {
    name: "Basketball",
    icon: "🏀",
    primaryDisciplines: ["jump-shot", "layup", "dunk", "free-throw", "rebound"],
    contextTags: ["shooting", "jumping", "landing", "game", "practice"],
  },
  poseEmphasis: {
    criticalJoints: ["knee", "ankle", "hip", "elbow", "wrist"],
    secondaryJoints: ["shoulder", "spine"],
    trackingPriority: "full-body",
  },
  physicsEmphasis: {
    primaryMetrics: ["jumpHeight", "landingForce", "releaseAngle", "shootingForm"],
    secondaryMetrics: ["loadIndex", "asymmetry", "explosiveness"],
    riskFactors: ["landing_impact", "knee_valgus", "ankle_instability", "asymmetry"],
  },
  riskMapping: {
    highRiskThreshold: 65,
    moderateRiskThreshold: 35,
    flagMeanings: {
      landing_impact: "High impact forces on landing - ACL/ankle risk",
      knee_valgus: "Knee valgus during takeoff/landing",
      ankle_instability: "Ankle wobble detected during landing",
      asymmetry: "Power imbalance between legs",
    },
  },
  insightLanguage: {
    positiveTemplates: [
      "Explosive vertical with controlled landing mechanics",
      "Clean shooting form with consistent release point",
      "Balanced takeoff and landing - low injury risk",
    ],
    improvementTemplates: [
      "Focus on softer landing technique",
      "Work on knee alignment during takeoff",
      "Improve ankle stability for safer landings",
    ],
    riskTemplates: [
      "Landing forces high - plyometric progression needed",
      "Knee valgus on landing - strengthen glutes and VMO",
      "Ankle instability - consider balance training",
    ],
    drillSuggestions: [
      "Soft landing drills (box jumps)",
      "Single-leg balance work",
      "VMO strengthening exercises",
      "Ankle stability progressions",
      "Form shooting (100 reps)",
      "Jump technique refinement",
    ],
  },
};

/**
 * Tennis Adapter
 */
const tennisAdapter: SportAdapter = {
  metadata: {
    name: "Tennis",
    icon: "🎾",
    primaryDisciplines: ["serve", "forehand", "backhand", "volley", "smash"],
    contextTags: ["serve", "groundstroke", "match", "training"],
  },
  poseEmphasis: {
    criticalJoints: ["shoulder", "elbow", "wrist", "spine", "hip"],
    secondaryJoints: ["knee", "ankle"],
    trackingPriority: "upper",
  },
  physicsEmphasis: {
    primaryMetrics: ["serveSpeed", "spinRate", "impactEfficiency", "shoulderLoad"],
    secondaryMetrics: ["racketSpeed", "contactPoint", "followThrough"],
    riskFactors: ["shoulder_impingement", "elbow_strain", "spine_rotation", "asymmetry"],
  },
  riskMapping: {
    highRiskThreshold: 70,
    moderateRiskThreshold: 40,
    flagMeanings: {
      shoulder_impingement: "Shoulder elevation pattern suggests impingement risk",
      elbow_strain: "Excessive elbow extension - tennis elbow risk",
      spine_rotation: "Limited trunk rotation reducing power",
      asymmetry: "Bilateral shoulder strength imbalance",
    },
  },
  insightLanguage: {
    positiveTemplates: [
      "Powerful serve with clean kinetic chain",
      "Excellent shoulder rotation and racket acceleration",
      "Balanced mechanics with low injury risk",
    ],
    improvementTemplates: [
      "Focus on trunk rotation for added power",
      "Work on shoulder external rotation strength",
      "Optimize toss position for better contact",
    ],
    riskTemplates: [
      "Shoulder impingement pattern - reduce serve volume",
      "Elbow strain detected - check grip and technique",
      "Limited rotation - mobility work recommended",
    ],
    drillSuggestions: [
      "Serve technique refinement (50 reps)",
      "Shoulder external rotation strengthening",
      "Trunk rotation mobility work",
      "Kinetic chain exercises",
      "Target serve practice",
      "Deceleration control drills",
    ],
  },
};

/**
 * Sprinting Adapter
 */
const sprintingAdapter: SportAdapter = {
  metadata: {
    name: "Sprinting",
    icon: "🏃",
    primaryDisciplines: ["acceleration", "max-velocity", "deceleration", "start"],
    contextTags: ["track", "training", "competition", "blocks"],
  },
  poseEmphasis: {
    criticalJoints: ["hip", "knee", "ankle", "pelvis"],
    secondaryJoints: ["shoulder", "elbow"],
    trackingPriority: "lower",
  },
  physicsEmphasis: {
    primaryMetrics: ["topSpeed", "acceleration", "strideLength", "groundContactTime"],
    secondaryMetrics: ["cadence", "verticalOscillation", "powerOutput"],
    riskFactors: ["hamstring_strain", "asymmetry", "overstriding", "hip_flexor_tightness"],
  },
  riskMapping: {
    highRiskThreshold: 65,
    moderateRiskThreshold: 35,
    flagMeanings: {
      hamstring_strain: "Hip extension pattern suggests hamstring overload",
      asymmetry: "Stride asymmetry between left and right",
      overstriding: "Foot contact ahead of center of mass",
      hip_flexor_tightness: "Limited hip extension reducing efficiency",
    },
  },
  insightLanguage: {
    positiveTemplates: [
      "Explosive acceleration with optimal stride mechanics",
      "Clean hip extension and ground contact",
      "Symmetric stride pattern - low injury risk",
    ],
    improvementTemplates: [
      "Focus on ground contact time reduction",
      "Work on hip extension at toe-off",
      "Optimize stride length without overstriding",
    ],
    riskTemplates: [
      "Hamstring strain risk - reduce sprint volume",
      "Stride asymmetry - address strength imbalance",
      "Overstriding detected - cue higher cadence",
    ],
    drillSuggestions: [
      "Acceleration drills (10x30m)",
      "Hamstring strength progressions",
      "Hip flexor mobility work",
      "Stride frequency drills",
      "Wall march technique",
      "Single-leg bounds",
    ],
  },
};

/**
 * Swimming Adapter
 */
const swimmingAdapter: SportAdapter = {
  metadata: {
    name: "Swimming",
    icon: "🏊",
    primaryDisciplines: ["freestyle", "backstroke", "breaststroke", "butterfly", "turn"],
    contextTags: ["stroke", "turn", "start", "training", "competition"],
  },
  poseEmphasis: {
    criticalJoints: ["shoulder", "elbow", "spine", "hip", "knee"],
    secondaryJoints: ["wrist", "ankle"],
    trackingPriority: "full-body",
  },
  physicsEmphasis: {
    primaryMetrics: ["strokeRate", "strokeLength", "pullEfficiency", "bodyRotation"],
    secondaryMetrics: ["underwaterTime", "turnSpeed", "streamlinePosition"],
    riskFactors: ["shoulder_impingement", "spine_flexion", "asymmetry", "overreach"],
  },
  riskMapping: {
    highRiskThreshold: 60,
    moderateRiskThreshold: 30,
    flagMeanings: {
      shoulder_impingement: "Shoulder elevation pattern during recovery phase",
      spine_flexion: "Excessive lumbar flexion reducing efficiency",
      asymmetry: "Stroke asymmetry between sides",
      overreach: "Arm overreach causing shoulder strain",
    },
  },
  insightLanguage: {
    positiveTemplates: [
      "Efficient stroke with strong propulsion",
      "Clean body rotation and streamline position",
      "Balanced bilateral stroke mechanics",
    ],
    improvementTemplates: [
      "Focus on high elbow catch position",
      "Work on body rotation for added power",
      "Optimize stroke length without overreaching",
    ],
    riskTemplates: [
      "Shoulder impingement risk - check recovery path",
      "Stroke asymmetry - video analysis recommended",
      "Overreach pattern - reduce entry extension",
    ],
    drillSuggestions: [
      "High elbow catch drills (10x25m)",
      "Shoulder stability exercises",
      "Body rotation drills",
      "Streamline position work",
      "One-arm stroke technique",
      "Catch-up drill for symmetry",
    ],
  },
};

/**
 * Skiing Adapter
 */
const skiingAdapter: SportAdapter = {
  metadata: {
    name: "Skiing",
    icon: "⛷️",
    primaryDisciplines: ["downhill", "slalom", "giant-slalom", "jump", "moguls"],
    contextTags: ["race", "training", "technique", "terrain-park"],
  },
  poseEmphasis: {
    criticalJoints: ["knee", "ankle", "hip", "spine"],
    secondaryJoints: ["shoulder", "elbow"],
    trackingPriority: "lower",
  },
  physicsEmphasis: {
    primaryMetrics: ["edgeAngle", "centerOfMass", "turnRadius", "decelerationForce"],
    secondaryMetrics: ["speed", "loadDistribution", "recoveryTime"],
    riskFactors: ["knee_valgus", "excessive_load", "asymmetry", "trunk_lean"],
  },
  riskMapping: {
    highRiskThreshold: 70,
    moderateRiskThreshold: 40,
    flagMeanings: {
      knee_valgus: "Knee collapse inward during turn - ACL risk",
      excessive_load: "Peak forces exceeding safe thresholds",
      asymmetry: "Left-right turn imbalance",
      trunk_lean: "Excessive forward lean reducing stability",
    },
  },
  insightLanguage: {
    positiveTemplates: [
      "Strong edge control with balanced loading",
      "Clean turn initiation with good knee alignment",
      "Symmetric turn mechanics - low injury risk",
    ],
    improvementTemplates: [
      "Focus on earlier edge engagement",
      "Work on knee alignment through turn apex",
      "Optimize center of mass over skis",
    ],
    riskTemplates: [
      "Knee valgus during turns - strengthen lateral chain",
      "Peak loads high - reduce turn aggression",
      "Turn asymmetry - address strength imbalance",
    ],
    drillSuggestions: [
      "Single-ski balance drills",
      "Lateral chain strengthening",
      "Edge angle progression",
      "Knee alignment exercises",
      "Turn shape practice",
      "Plyometric landing work",
    ],
  },
};

/**
 * Map of all sport adapters
 */
export const SPORT_ADAPTERS: Record<SportId, SportAdapter> = {
  football: footballAdapter,
  basketball: basketballAdapter,
  tennis: tennisAdapter,
  sprinting: sprintingAdapter,
  swimming: swimmingAdapter,
  skiing: skiingAdapter,
};

/**
 * Helper to get sport adapter with fallback to football
 */
export function getSportAdapter(sportId?: SportId): SportAdapter {
  return SPORT_ADAPTERS[sportId || DEFAULT_SPORT_ID] || footballAdapter;
}

/**
 * Helper to get all sport IDs and metadata for UI selectors
 */
export function getAllSports(): Array<{ id: SportId; name: string; icon: string }> {
  return Object.entries(SPORT_ADAPTERS).map(([id, adapter]) => ({
    id: id as SportId,
    name: adapter.metadata.name,
    icon: adapter.metadata.icon,
  }));
}
