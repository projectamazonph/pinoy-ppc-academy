import {describe,expect,it} from "vitest";
import {buildReadinessPlan,buildReadinessRecommendation,type ReadinessInput} from "./readiness";
const input:ReadinessInput={deviceReady:true,internetReady:true,backupReady:true,secureAccessReady:true,digitalSkills:4,communicationSkills:5,weeklyStudyHours:10,amazonInterest:"high",previousRole:"BPO quality analyst",transferableSkill:"Root-cause analysis"};
describe("buildReadinessPlan",()=>{
  it("creates a portable plan with evidence and next actions",()=>{
    const recommendation=buildReadinessRecommendation(input);
    const plan=buildReadinessPlan({id:"r-1",userId:"u-1",input,...recommendation,createdAt:new Date("2026-07-13T10:00:00Z")});
    expect(plan).toContain("Pinoy PPC Academy — VA Career Readiness Plan");
    expect(plan).toContain("BPO quality analyst");
    expect(plan).toContain("Root-cause analysis");
    expect(plan).toContain("Continue to Amazon Foundations");
    expect(plan).toContain("1.");
  });
});
