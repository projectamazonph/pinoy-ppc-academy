"use client";

import { useMemo, useState } from "react";
import { calculateMaxBid, calculatePpcMetrics } from "@/lib/domain/ppc-metrics";

const initial = { spend: 300, adSales: 1200, totalSales: 2000, clicks: 100, impressions: 10000, orders: 10, aov: 1200, cvr: 10, targetAcos: 25 };

type Field = keyof typeof initial;

export function MetricsLab() {
  const [values, setValues] = useState(initial);
  const metrics = useMemo(() => calculatePpcMetrics(values), [values]);
  const maxBid = useMemo(() => calculateMaxBid({ averageOrderValue: values.aov, conversionRatePercent: values.cvr, targetAcosPercent: values.targetAcos }), [values]);

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: Number(value) || 0 }));
  }

  const cards = [
    ["CPC", metrics.cpc, "₱"], ["CTR", metrics.ctrPercent, "%"], ["CVR", metrics.cvrPercent, "%"],
    ["ACoS", metrics.acosPercent, "%"], ["ROAS", metrics.roas, "x"], ["TACoS", metrics.tacosPercent, "%"],
  ] as const;

  return (
    <section className="lab-panel">
      <header className="lab-heading"><div><p className="eyebrow">LAB-01 / Foundation</p><h1>PPC Metrics Lab</h1><p>Change the reporting row and read how each metric reacts. Zero denominators return “not enough data,” not fake infinity.</p></div><span className="lab-status">RULE SET 1.0</span></header>
      <div className="metrics-workspace">
        <form className="metric-inputs" onSubmit={(event) => event.preventDefault()}>
          {([
            ["spend", "Ad spend (₱)"], ["adSales", "Ad sales (₱)"], ["totalSales", "Total sales (₱)"],
            ["clicks", "Clicks"], ["impressions", "Impressions"], ["orders", "Orders"],
          ] as Array<[Field, string]>).map(([field, label]) => (
            <label key={field}>{label}<input type="number" min="0" value={values[field]} onChange={(event) => update(field, event.target.value)} /></label>
          ))}
        </form>
        <div className="metric-results" aria-live="polite">
          {cards.map(([label, value, suffix]) => <div key={label}><span>{label}</span><strong>{value === null ? "N/A" : `${suffix === "₱" ? suffix : ""}${value}${suffix !== "₱" ? suffix : ""}`}</strong></div>)}
        </div>
      </div>
      <div className="bid-calculator">
        <div><p className="eyebrow">Bid ceiling drill</p><h2>Conversion-based maximum bid</h2><p>A safe starting ceiling uses average order value × conversion rate × target ACoS.</p></div>
        <div className="bid-fields">
          <label>Average order value<input type="number" min="0" value={values.aov} onChange={(e) => update("aov", e.target.value)} /></label>
          <label>Conversion rate %<input type="number" min="0" max="100" value={values.cvr} onChange={(e) => update("cvr", e.target.value)} /></label>
          <label>Target ACoS %<input type="number" min="0" max="100" value={values.targetAcos} onChange={(e) => update("targetAcos", e.target.value)} /></label>
          <output><span>Calculated ceiling</span><strong>₱{maxBid.toFixed(2)}</strong></output>
        </div>
      </div>
    </section>
  );
}
