"use client";

import { useMemo, useState } from "react";
import { recommendTriageAction, scoreTriageDecision, type ReasonCode, type TriageAction, type TriageInput } from "@/lib/domain/search-term-triage";

const scenarios: Array<TriageInput & { term: string }> = [
  { term: "insulated lunch bag for women", source: "AUTO", relevance: "HIGH", clicks: 24, orders: 3, spend: 420, sales: 2100, targetAcosPercent: 25, averageOrderValue: 700, alreadyHarvested: false },
  { term: "plastic grocery bag holder", source: "BROAD", relevance: "LOW", clicks: 6, orders: 0, spend: 210, sales: 0, targetAcosPercent: 25, averageOrderValue: 700, alreadyHarvested: false },
  { term: "large insulated lunch tote", source: "PHRASE", relevance: "HIGH", clicks: 4, orders: 0, spend: 80, sales: 0, targetAcosPercent: 25, averageOrderValue: 700, alreadyHarvested: false },
];

const actions: TriageAction[] = ["OBSERVE", "HARVEST", "NEGATE_EXACT", "REDUCE_BID", "RAISE_BID", "PAUSE"];
const reasons: Array<[ReasonCode, string]> = [
  ["INSUFFICIENT_DATA", "Not enough data"], ["PROVEN_DISCOVERY_WINNER", "Proven discovery winner"],
  ["IRRELEVANT_TRAFFIC", "Irrelevant traffic"], ["RELEVANT_NO_ORDERS_AFTER_THRESHOLD", "Relevant but crossed spend threshold"],
  ["PROFITABLE_EXACT_TARGET", "Profitable exact target"], ["INEFFICIENT_CONVERTER", "Converts but inefficient"],
];

export function TriageLab() {
  const [index, setIndex] = useState(0);
  const [action, setAction] = useState<TriageAction>("OBSERVE");
  const [reason, setReason] = useState<ReasonCode>("INSUFFICIENT_DATA");
  const [result, setResult] = useState<ReturnType<typeof scoreTriageDecision> | null>(null);
  const scenario = scenarios[index]!;
  const key = useMemo(() => recommendTriageAction(scenario), [scenario]);

  function submit() {
    setResult(scoreTriageDecision({ expectedAction: key.action, expectedReasonCode: key.reasonCode, chosenAction: action, chosenReasonCode: reason, sequenceConfirmed: true, termHasOrders: scenario.orders > 0 }));
  }

  function next() {
    setIndex((value) => (value + 1) % scenarios.length);
    setAction("OBSERVE"); setReason("INSUFFICIENT_DATA"); setResult(null);
  }

  return (
    <section className="lab-panel">
      <header className="lab-heading"><div><p className="eyebrow">LAB-02 / Decision practice</p><h1>Search Term Triage</h1><p>Choose an action and the rule behind it. Converting terms cannot be negated or paused without triggering a critical failure.</p></div><span className="lab-status">CASE {index + 1} / {scenarios.length}</span></header>
      <article className="triage-case">
        <div className="case-query"><span>SHOPPER SEARCH TERM</span><h2>{scenario.term}</h2><small>{scenario.source} TARGETING · {scenario.relevance} RELEVANCE</small></div>
        <dl className="case-metrics">
          <div><dt>Clicks</dt><dd>{scenario.clicks}</dd></div><div><dt>Orders</dt><dd>{scenario.orders}</dd></div>
          <div><dt>Spend</dt><dd>₱{scenario.spend}</dd></div><div><dt>Sales</dt><dd>₱{scenario.sales}</dd></div>
          <div><dt>Target ACoS</dt><dd>{scenario.targetAcosPercent}%</dd></div>
        </dl>
      </article>
      <div className="triage-controls">
        <fieldset><legend>1. Choose the action</legend><div className="choice-grid">{actions.map((item) => <button type="button" data-active={action === item || undefined} key={item} onClick={() => setAction(item)}>{item.replaceAll("_", " ")}</button>)}</div></fieldset>
        <label>2. Choose the reason<select value={reason} onChange={(e) => setReason(e.target.value as ReasonCode)}>{reasons.map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select></label>
        <button className="btn btn-primary" type="button" onClick={submit}>Grade this decision</button>
      </div>
      {result && <div className={`score-panel ${result.passed ? "pass" : "fail"}`} aria-live="polite"><div><span>SCORE</span><strong>{result.score}</strong></div><div><h3>{result.criticalFailure ? "Critical safety failure" : result.passed ? "Decision passed" : "Review the rule and retry"}</h3><p>{key.explanation}</p><small>Expected action: {key.action.replaceAll("_", " ")} · Reason: {key.reasonCode.replaceAll("_", " ")}</small></div><button className="btn btn-secondary" type="button" onClick={next}>Next case</button></div>}
    </section>
  );
}
