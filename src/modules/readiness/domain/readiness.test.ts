import {describe,expect,it} from "vitest";
import {buildReadinessRecommendation,type ReadinessInput} from "./readiness";

const ready:ReadinessInput={
  deviceReady:true,internetReady:true,backupReady:true,secureAccessReady:true,
  digitalSkills:4,communicationSkills:4,weeklyStudyHours:8,amazonInterest:"high",
  previousRole:"Customer service representative",transferableSkill:"Clear written communication"
};

describe("buildReadinessRecommendation",()=>{
  it("routes missing work requirements to setup-first",()=>{
    const result=buildReadinessRecommendation({...ready,backupReady:false});
    expect(result.route).toBe("setup-first");
    expect(result.title).toBe("Fix your work setup first");
    expect(result.actions).toContain("Create a written backup plan for power and internet interruptions.");
  });

  it("routes low digital or communication confidence to core-skills",()=>{
    const result=buildReadinessRecommendation({...ready,digitalSkills:2,amazonInterest:"high"});
    expect(result.route).toBe("core-skills");
    expect(result.title).toBe("Strengthen your core VA skills");
  });

  it("routes ready and interested learners to Amazon Foundations",()=>{
    const result=buildReadinessRecommendation(ready);
    expect(result.route).toBe("amazon-foundations");
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.actions).toHaveLength(3);
  });

  it("routes low Amazon interest to broader VA role exploration",()=>{
    const result=buildReadinessRecommendation({...ready,amazonInterest:"low"});
    expect(result.route).toBe("explore-va-roles");
    expect(result.title).toBe("Explore other VA specializations");
  });

  it("rejects values outside the documented scale",()=>{
    expect(()=>buildReadinessRecommendation({...ready,digitalSkills:6})).toThrow(/between 1 and 5/i);
    expect(()=>buildReadinessRecommendation({...ready,weeklyStudyHours:0})).toThrow(/between 1 and 40/i);
  });
});
