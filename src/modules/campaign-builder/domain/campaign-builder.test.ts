import {describe,expect,it} from "vitest";
import {
  CAMPAIGN_BUILDER_SCENARIO,
  evaluateCampaignBuild,
  formatCampaignArtifact,
  type CampaignBuildDraft,
} from "./campaign-builder";

const validDraft: CampaignBuildDraft = {
  portfolioName: "Haraya Home | B0LUNCH001",
  campaignName: "Haraya Home | B0LUNCH001 | SP | Research | Auto | All | Launch",
  adGroupName: "AG | Auto | Launch",
  advertisedAsin: "B0LUNCH001",
  dailyBudget: 30,
  baseBid: 0.75,
  biddingStrategy: "DOWN_ONLY",
  topOfSearchAdjustment: 0,
  negativeExact: ["haraya lunch bag"],
  negativePhrase: [],
  rationale: "Use controlled automatic targeting to discover relevant non-branded shopper queries before harvesting proven terms.",
  reviewDays: 7,
};

describe("campaign builder evaluation",()=>{
  it("passes a relationship-safe SP research build and produces an artifact",()=>{
    const result=evaluateCampaignBuild(CAMPAIGN_BUILDER_SCENARIO,validDraft);
    expect(result.submittable).toBe(true);
    expect(result.passed).toBe(true);
    expect(result.criticalFailure).toBe(false);
    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(formatCampaignArtifact(CAMPAIGN_BUILDER_SCENARIO,validDraft,result)).toContain("Sponsored Products");
  });

  it("rejects a product ad linked to the wrong ASIN",()=>{
    const result=evaluateCampaignBuild(CAMPAIGN_BUILDER_SCENARIO,{...validDraft,advertisedAsin:"B0WRONG001"});
    expect(result.submittable).toBe(false);
    expect(result.criticalFailure).toBe(true);
    expect(result.errors.join(" ")).toMatch(/ASIN/i);
  });

  it("rejects a campaign above the scenario account cap",()=>{
    const result=evaluateCampaignBuild(CAMPAIGN_BUILDER_SCENARIO,{...validDraft,dailyBudget:60});
    expect(result.submittable).toBe(false);
    expect(result.criticalFailure).toBe(true);
    expect(result.errors.join(" ")).toMatch(/\$50/);
  });

  it("requires the published seven-part naming convention",()=>{
    const result=evaluateCampaignBuild(CAMPAIGN_BUILDER_SCENARIO,{...validDraft,campaignName:"Haraya Launch Auto"});
    expect(result.submittable).toBe(false);
    expect(result.errors.join(" ")).toMatch(/seven parts/i);
  });

  it("penalizes unsafe research bidding without treating it as a broken relationship",()=>{
    const result=evaluateCampaignBuild(CAMPAIGN_BUILDER_SCENARIO,{...validDraft,biddingStrategy:"UP_DOWN",topOfSearchAdjustment:100});
    expect(result.submittable).toBe(true);
    expect(result.passed).toBe(false);
    expect(result.warnings.join(" ")).toMatch(/down only/i);
  });
});
