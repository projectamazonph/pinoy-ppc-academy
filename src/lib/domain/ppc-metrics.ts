export type MetricsInput = {
  spend: number;
  adSales: number;
  totalSales: number;
  clicks: number;
  impressions: number;
  orders: number;
};

function divide(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return numerator / denominator;
}

function round(value: number | null, places = 2): number | null {
  if (value === null) return null;
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function calculatePpcMetrics(input: MetricsInput) {
  return {
    cpc: round(divide(input.spend, input.clicks)),
    ctrPercent: round(divide(input.clicks * 100, input.impressions)),
    cvrPercent: round(divide(input.orders * 100, input.clicks)),
    acosPercent: round(divide(input.spend * 100, input.adSales)),
    roas: round(divide(input.adSales, input.spend)),
    tacosPercent: round(divide(input.spend * 100, input.totalSales)),
  };
}

export function calculateMaxBid(input: {
  averageOrderValue: number;
  conversionRatePercent: number;
  targetAcosPercent: number;
}): number {
  if (input.averageOrderValue < 0) throw new Error("Average order value cannot be negative");
  if (input.conversionRatePercent < 0 || input.conversionRatePercent > 100) {
    throw new Error("Conversion rate must be between 0 and 100");
  }
  if (input.targetAcosPercent < 0 || input.targetAcosPercent > 100) {
    throw new Error("Target ACoS must be between 0 and 100");
  }
  return Math.round(
    input.averageOrderValue *
      (input.conversionRatePercent / 100) *
      (input.targetAcosPercent / 100) *
      100,
  ) / 100;
}
