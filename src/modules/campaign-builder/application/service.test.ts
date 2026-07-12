import {describe,expect,it} from "vitest";
import {InMemoryPracticeAttemptRepository} from "@/modules/practice/infrastructure/in-memory-practice-attempt-repository";
import {PracticeAttemptService} from "@/modules/practice/application/practice-attempt-service";
import {InMemoryProgressRepository} from "@/modules/progress/infrastructure/in-memory-progress-repository";
import {ProgressService} from "@/modules/progress/application/progress-service";
import {PPC_FOUNDATIONS_MODULES,PPC_FOUNDATIONS_SLUG} from "@/modules/ppc-foundations/domain/content";
import {CAMPAIGN_BUILDER_SCENARIO,type CampaignBuildDraft} from "../domain/campaign-builder";
import {CampaignBuilderService,CampaignBuildValidationError} from "./service";

const draft:CampaignBuildDraft={
  portfolioName:"Haraya Home | B0LUNCH001",
  campaignName:"Haraya Home | B0LUNCH001 | SP | Research | Auto | All | Launch",
  adGroupName:"AG | Auto | Launch",
  advertisedAsin:"B0LUNCH001",
  dailyBudget:30,
  baseBid:.75,
  biddingStrategy:"DOWN_ONLY",
  topOfSearchAdjustment:0,
  negativeExact:["haraya lunch bag"],
  negativePhrase:[],
  rationale:"Use controlled automatic targeting to discover relevant non-branded queries before harvesting proven terms.",
  reviewDays:7,
};

async function setup(completePpc:boolean){
  const progressRepo=new InMemoryProgressRepository();
  const progress=new ProgressService(progressRepo,()=>new Date("2026-07-13T00:00:00Z"));
  if(completePpc)for(const lesson of PPC_FOUNDATIONS_MODULES)await progress.completeCourseLesson("u1",PPC_FOUNDATIONS_SLUG,PPC_FOUNDATIONS_MODULES,lesson.id);
  const attemptRepo=new InMemoryPracticeAttemptRepository();
  const attempts=new PracticeAttemptService(attemptRepo,{createId:()=>"attempt-1",now:()=>new Date("2026-07-13T01:00:00Z")});
  return{service:new CampaignBuilderService(progress,attempts),attemptRepo};
}

describe("CampaignBuilderService",()=>{
  it("keeps the simulator locked until PPC Foundations is complete",async()=>{
    const{service}=await setup(false);
    await expect(service.submit("u1",draft)).rejects.toThrow(/PPC Foundations/i);
  });

  it("records a valid versioned build attempt",async()=>{
    const{service,attemptRepo}=await setup(true);
    const result=await service.submit("u1",draft);
    expect(result.passed).toBe(true);
    expect(attemptRepo.records).toHaveLength(1);
    expect(attemptRepo.records[0]?.payload).toMatchObject({scenarioId:CAMPAIGN_BUILDER_SCENARIO.id,scenarioVersion:1});
  });

  it("does not persist invalid relationships",async()=>{
    const{service,attemptRepo}=await setup(true);
    await expect(service.submit("u1",{...draft,advertisedAsin:"B0WRONG001"})).rejects.toBeInstanceOf(CampaignBuildValidationError);
    expect(attemptRepo.records).toHaveLength(0);
  });
});
