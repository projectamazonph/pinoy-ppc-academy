import {describe,expect,it} from "vitest";
import {ReadinessService} from "./readiness-service";
import {InMemoryReadinessRepository} from "../infrastructure/in-memory-readiness-repository";
import type {ReadinessInput} from "../domain/readiness";

const input:ReadinessInput={deviceReady:true,internetReady:true,backupReady:true,secureAccessReady:true,digitalSkills:4,communicationSkills:4,weeklyStudyHours:8,amazonInterest:"high",previousRole:"Retail supervisor",transferableSkill:"Process discipline"};
const progress=(completedLessons:number)=>({getStarterSummary:async()=>({completedLessons,totalLessons:8,percentage:Math.round(completedLessons/8*100),completedLessonIds:[]})});

describe("ReadinessService",()=>{
  it("blocks submission until all starter modules are complete",async()=>{
    const service=new ReadinessService(new InMemoryReadinessRepository(),progress(7));
    await expect(service.submit("user-1",input)).rejects.toThrow(/complete all eight/i);
  });

  it("persists the recommendation and returns it as latest",async()=>{
    const repository=new InMemoryReadinessRepository();
    const service=new ReadinessService(repository,progress(8),()=>new Date("2026-07-13T10:00:00Z"),()=>"assessment-1");
    const result=await service.submit("user-1",input);
    expect(result.id).toBe("assessment-1");
    expect(result.route).toBe("amazon-foundations");
    await expect(service.getLatest("user-1")).resolves.toEqual(result);
  });

  it("keeps each learner's history separate",async()=>{
    const repository=new InMemoryReadinessRepository();
    const service=new ReadinessService(repository,progress(8));
    await service.submit("user-1",input);
    await service.submit("user-2",{...input,amazonInterest:"low"});
    expect((await service.getHistory("user-1"))).toHaveLength(1);
    expect((await service.getLatest("user-2"))?.route).toBe("explore-va-roles");
  });
});
