import { describe, expect, it } from "vitest";
import { calculateMaxBid, calculatePpcMetrics } from "./ppc-metrics";
describe("PPC metrics", () => {
  it("calculates the core reporting row", () => expect(calculatePpcMetrics({spend:300,adSales:1200,totalSales:2000,clicks:100,impressions:10000,orders:10})).toEqual({cpc:3,ctrPercent:1,cvrPercent:10,acosPercent:25,roas:4,tacosPercent:15}));
  it("returns null for zero denominators", () => expect(calculatePpcMetrics({spend:0,adSales:0,totalSales:0,clicks:0,impressions:0,orders:0}).acosPercent).toBeNull());
  it("calculates a conversion-based max bid", () => expect(calculateMaxBid({averageOrderValue:1200,conversionRatePercent:10,targetAcosPercent:25})).toBe(30));
  it("rejects impossible percentages", () => expect(() => calculateMaxBid({averageOrderValue:1200,conversionRatePercent:120,targetAcosPercent:25})).toThrow(/conversion rate/i));
});
