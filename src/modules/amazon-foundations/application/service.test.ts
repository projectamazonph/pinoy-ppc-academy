// @vitest-environment node
import {describe,expect,it} from "vitest";
import {QuizService} from "@/modules/assessment/application/quiz-service";
import {InMemoryAssessmentRepository} from "@/modules/assessment/infrastructure/in-memory-assessment-repository";
import {ProgressService} from "@/modules/progress/application/progress-service";
import {InMemoryProgressRepository} from "@/modules/progress/infrastructure/in-memory-progress-repository";
import type {ReadinessAssessmentRecord,ReadinessRoute} from "@/modules/readiness/domain/readiness";
import {AmazonFoundationsService} from "./service";

function readiness(route:ReadinessRoute|null){return{getLatest:async(userId:string):Promise<ReadinessAssessmentRecord|null>=>route?({id:"r",userId,score:80,route,title:"Route",summary:"Summary",actions:["a","b","c"],input:{deviceReady:true,internetReady:true,backupReady:true,secureAccessReady:true,digitalSkills:4,communicationSkills:4,weeklyStudyHours:8,amazonInterest:route==="amazon-foundations"?"high":"low",previousRole:"Agent",transferableSkill:"Communication"},createdAt:new Date()}):null}}

describe("AmazonFoundationsService",()=>{
  it("requires the readiness route before grading",async()=>{
    const service=new AmazonFoundationsService(new QuizService(new InMemoryAssessmentRepository()),new ProgressService(new InMemoryProgressRepository()),readiness("core-skills"));
    await expect(service.submitQuickCheck({userId:"u",lessonId:"amazon-01-marketplace-basics",answers:{}})).rejects.toThrow(/readiness plan/i);
  });
  it("completes the first module after a passing check",async()=>{
    const progress=new ProgressService(new InMemoryProgressRepository());
    const service=new AmazonFoundationsService(new QuizService(new InMemoryAssessmentRepository()),progress,readiness("amazon-foundations"));
    const result=await service.submitQuickCheck({userId:"u",lessonId:"amazon-01-marketplace-basics",answers:{"am01-q1":"a","am01-q2":"b"}});
    expect(result.passed).toBe(true);
    expect((await service.getSummary("u")).completedLessons).toBe(1);
  });
  it("enforces module order",async()=>{
    const service=new AmazonFoundationsService(new QuizService(new InMemoryAssessmentRepository()),new ProgressService(new InMemoryProgressRepository()),readiness("amazon-foundations"));
    await expect(service.submitQuickCheck({userId:"u",lessonId:"amazon-03-offer-readiness",answers:{"am03-q1":"a","am03-q2":"b"}})).rejects.toThrow(/previous/);
  });
});
