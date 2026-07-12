import {describe,expect,it} from "vitest";
import {AMAZON_FOUNDATIONS_MODULES} from "./content";
describe("Amazon Foundations content",()=>{
  it("contains the six approved ordered modules with versioned checks",()=>{
    expect(AMAZON_FOUNDATIONS_MODULES.map(module=>module.title)).toEqual([
      "Marketplace Basics","Listing Anatomy","Offer Readiness","Business Metrics","Advertising Interface","Reporting Basics"
    ]);
    for(const lesson of AMAZON_FOUNDATIONS_MODULES){
      expect(lesson.outcomes).toHaveLength(3);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.quickCheck.version).toBe(1);
      expect(lesson.quickCheck.questions).toHaveLength(2);
    }
  });
  it("teaches diagnosis before bid changes",()=>{
    const text=JSON.stringify(AMAZON_FOUNDATIONS_MODULES);
    expect(text).toMatch(/listing/i);
    expect(text).toMatch(/inventory/i);
    expect(text).toMatch(/price/i);
    expect(text).toMatch(/structure/i);
    expect(text).toMatch(/do not change bids/i);
  });
});
