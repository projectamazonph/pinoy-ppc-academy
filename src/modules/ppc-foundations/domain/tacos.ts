export interface TacosInput {
  adSpend: number;
  adSales: number;
  totalSales: number;
}

export interface TacosResult extends TacosInput {
  acos: number | null;
  tacos: number | null;
  organicSales: number;
  adSalesShare: number | null;
}

function percent(numerator: number, denominator: number) {
  return denominator === 0 ? null : Math.round((numerator / denominator) * 10000) / 100;
}

export function calculateTacos(input: TacosInput): TacosResult {
  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value) || value < 0) throw new Error(`${name} cannot be negative or invalid.`);
  }
  if (input.adSales > input.totalSales) throw new Error("Ad sales cannot exceed total sales.");
  return {
    ...input,
    acos: percent(input.adSpend, input.adSales),
    tacos: percent(input.adSpend, input.totalSales),
    organicSales: input.totalSales - input.adSales,
    adSalesShare: percent(input.adSales, input.totalSales),
  };
}

export function compareTacosScenarios(firstInput: TacosInput, secondInput: TacosInput) {
  const first = calculateTacos(firstInput);
  const second = calculateTacos(secondInput);
  const sameAcos = first.acos !== null && first.acos === second.acos;
  let healthierScenario: "first" | "second" | "equal" = "equal";
  if (first.tacos !== null && second.tacos !== null) {
    if (first.tacos < second.tacos) healthierScenario = "first";
    if (second.tacos < first.tacos) healthierScenario = "second";
  }
  return {first, second, sameAcos, healthierScenario};
}
