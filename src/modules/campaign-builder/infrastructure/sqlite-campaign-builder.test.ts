// @vitest-environment node
import {mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {afterEach,describe,expect,it} from "vitest";
import {PracticeAttemptService} from "@/modules/practice/application/practice-attempt-service";
import {SqlitePracticeAttemptRepository} from "@/modules/practice/infrastructure/sqlite-practice-attempt-repository";
import {PPC_FOUNDATIONS_MODULES,PPC_FOUNDATIONS_SLUG} from "@/modules/ppc-foundations/domain/content";
import {ProgressService} from "@/modules/progress/application/progress-service";
import {SqliteProgressRepository} from "@/modules/progress/infrastructure/sqlite-progress-repository";
import {openAcademyDatabase} from "@/modules/shared/infrastructure/sqlite-database";
import {CampaignBuilderService} from "../application/service";
import type {CampaignBuildDraft} from "../domain/campaign-builder";

const directories:string[]=[];
afterEach(()=>{for(const directory of directories.splice(0))rmSync(directory,{recursive:true,force:true})});

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
  rationale:"Use controlled automatic targeting to discover relevant non-branded shopper queries before harvesting proven terms.",
  reviewDays:7,
};

describe("campaign builder SQLite persistence",()=>{
  it("restores a saved versioned build after reopening the database",async()=>{
    const directory=mkdtempSync(join(tmpdir(),"pinoy-campaign-builder-"));directories.push(directory);
    const path=join(directory,"academy.sqlite");
    const now=new Date("2026-07-13T00:00:00Z");
    let database=openAcademyDatabase(path);
    database.prepare("INSERT INTO users VALUES(?,?,?,?,?,?,?)").run("u1","u1@example.test","Operator Learner","unused","STUDENT",now.toISOString(),now.toISOString());
    const progress=new ProgressService(new SqliteProgressRepository(database),()=>now);
    for(const lesson of PPC_FOUNDATIONS_MODULES)await progress.completeCourseLesson("u1",PPC_FOUNDATIONS_SLUG,PPC_FOUNDATIONS_MODULES,lesson.id);
    const service=new CampaignBuilderService(progress,new PracticeAttemptService(new SqlitePracticeAttemptRepository(database),{createId:()=>"build-1",now:()=>now}));
    await service.submit("u1",draft);
    database.close();

    database=openAcademyDatabase(path);
    const attempts=await new SqlitePracticeAttemptRepository(database).listAttemptsForUser("u1");
    expect(attempts).toHaveLength(1);
    expect(attempts[0]).toMatchObject({id:"build-1",labSlug:"campaign-builder",score:100,passed:true});
    expect(attempts[0]?.payload).toMatchObject({scenarioId:"sp-auto-launch-v1",scenarioVersion:1});
    database.close();
  });
});
