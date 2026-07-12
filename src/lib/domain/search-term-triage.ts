export type TriageAction =
  | "OBSERVE"
  | "HARVEST"
  | "NEGATE_EXACT"
  | "REDUCE_BID"
  | "RAISE_BID"
  | "PAUSE";

export type ReasonCode =
  | "INSUFFICIENT_DATA"
  | "PROVEN_DISCOVERY_WINNER"
  | "IRRELEVANT_TRAFFIC"
  | "RELEVANT_NO_ORDERS_AFTER_THRESHOLD"
  | "PROFITABLE_EXACT_TARGET"
  | "INEFFICIENT_CONVERTER";

export type TriageInput = {
  source: "AUTO" | "BROAD" | "PHRASE" | "EXACT";
  relevance: "HIGH" | "MEDIUM" | "LOW";
  clicks: number;
  orders: number;
  spend: number;
  sales: number;
  targetAcosPercent: number;
  averageOrderValue: number;
  alreadyHarvested: boolean;
};

export function recommendTriageAction(input: TriageInput): {
  action: TriageAction;
  reasonCode: ReasonCode;
  explanation: string;
} {
  const acos = input.sales > 0 ? (input.spend / input.sales) * 100 : null;
  const targetCpa = input.averageOrderValue * (input.targetAcosPercent / 100);

  if (input.relevance === "LOW" && input.clicks >= 3) {
    return {
      action: "NEGATE_EXACT",
      reasonCode: "IRRELEVANT_TRAFFIC",
      explanation: "The query is not relevant and has enough clicks to justify blocking the exact term.",
    };
  }
  if (
    input.orders >= 2 &&
    acos !== null &&
    acos <= input.targetAcosPercent &&
    input.source !== "EXACT" &&
    !input.alreadyHarvested
  ) {
    return {
      action: "HARVEST",
      reasonCode: "PROVEN_DISCOVERY_WINNER",
      explanation: "The discovery term has repeated orders at or below target ACoS and should move into controlled exact targeting.",
    };
  }
  if (input.source === "EXACT" && input.orders >= 2 && acos !== null && acos <= input.targetAcosPercent * 0.8) {
    return {
      action: "RAISE_BID",
      reasonCode: "PROFITABLE_EXACT_TARGET",
      explanation: "The exact target is converting efficiently enough to test a controlled bid increase.",
    };
  }
  if (input.orders === 0 && input.clicks >= 10 && input.spend >= targetCpa) {
    return {
      action: "REDUCE_BID",
      reasonCode: "RELEVANT_NO_ORDERS_AFTER_THRESHOLD",
      explanation: "The term is relevant, but spend has crossed the target acquisition threshold without an order.",
    };
  }
  if (input.orders > 0 && acos !== null && acos > input.targetAcosPercent * 1.5) {
    return {
      action: "REDUCE_BID",
      reasonCode: "INEFFICIENT_CONVERTER",
      explanation: "The term converts, so do not negate it, but the bid needs to come down because ACoS is well above target.",
    };
  }
  return {
    action: "OBSERVE",
    reasonCode: "INSUFFICIENT_DATA",
    explanation: "The available data is not strong enough to justify a structural or bid change.",
  };
}

export function scoreTriageDecision(input: {
  expectedAction: TriageAction;
  expectedReasonCode: ReasonCode;
  chosenAction: TriageAction;
  chosenReasonCode: ReasonCode;
  sequenceConfirmed: boolean;
  termHasOrders: boolean;
}) {
  const criticalFailure =
    input.termHasOrders && (input.chosenAction === "NEGATE_EXACT" || input.chosenAction === "PAUSE");
  if (criticalFailure) {
    return {
      score: 0,
      passed: false,
      criticalFailure: true,
      breakdown: { action: 0, reason: 0, sequence: 0, safetyPenalty: 100 },
    };
  }
  const action = input.chosenAction === input.expectedAction ? 60 : 0;
  const reason = input.chosenReasonCode === input.expectedReasonCode ? 25 : 0;
  const sequence = input.sequenceConfirmed ? 15 : 0;
  const score = action + reason + sequence;
  return {
    score,
    passed: score >= 85,
    criticalFailure: false,
    breakdown: { action, reason, sequence, safetyPenalty: 0 },
  };
}
