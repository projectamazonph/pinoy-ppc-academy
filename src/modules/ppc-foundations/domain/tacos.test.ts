import {describe,expect,it} from "vitest";
import {calculateTacos,compareTacosScenarios} from "./tacos";

describe("TACoS calculations",()=>{
  it("calculates ACoS, TACoS, organic sales, and ad share",()=>{
    const result=calculateTacos({adSpend:10000,adSales:40000,totalSales:100000});
    expect(result.acos).toBe(25);
    expect(result.tacos).toBe(10);
    expect(result.organicSales).toBe(60000);
    expect(result.adSalesShare).toBe(40);
  });
  it("returns null rates when the denominator is zero",()=>{
    const result=calculateTacos({adSpend:1000,adSales:0,totalSales:0});
    expect(result.acos).toBeNull();
    expect(result.tacos).toBeNull();
  });
  it("rejects negative values and ad sales above total sales",()=>{
    expect(()=>calculateTacos({adSpend:-1,adSales:0,totalSales:0})).toThrow(/negative/i);
    expect(()=>calculateTacos({adSpend:100,adSales:1200,totalSales:1000})).toThrow(/cannot exceed/i);
  });
  it("explains why identical ACoS can produce different TACoS",()=>{
    const comparison=compareTacosScenarios(
      {adSpend:10000,adSales:40000,totalSales:50000},
      {adSpend:10000,adSales:40000,totalSales:100000},
    );
    expect(comparison.sameAcos).toBe(true);
    expect(comparison.first.tacos).toBe(20);
    expect(comparison.second.tacos).toBe(10);
    expect(comparison.healthierScenario).toBe("second");
  });
});
