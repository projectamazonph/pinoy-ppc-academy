export type BiddingStrategy="DOWN_ONLY"|"FIXED"|"UP_DOWN";

export interface CampaignBuilderScenario {
  id:string;
  version:number;
  title:string;
  brief:string;
  marketplace:string;
  currency:string;
  brand:string;
  asin:string;
  productName:string;
  adType:"SP";
  strategy:"Research";
  targetingType:"Auto";
  matchLabel:"All";
  accountDailyBudgetCap:number;
  suggestedBudget:{min:number;max:number};
  suggestedBid:{min:number;max:number};
  brandedQuery:string;
}

export interface CampaignBuildDraft {
  portfolioName:string;
  campaignName:string;
  adGroupName:string;
  advertisedAsin:string;
  dailyBudget:number;
  baseBid:number;
  biddingStrategy:BiddingStrategy;
  topOfSearchAdjustment:number;
  negativeExact:string[];
  negativePhrase:string[];
  rationale:string;
  reviewDays:number;
}

export interface CampaignBuildDimensions {
  taskCompletion:number;
  decisionQuality:number;
  safetyIntegrity:number;
  documentation:number;
  efficiency:number;
}

export interface CampaignBuildEvaluation {
  score:number;
  passed:boolean;
  submittable:boolean;
  criticalFailure:boolean;
  errors:string[];
  warnings:string[];
  dimensions:CampaignBuildDimensions;
}

export const CAMPAIGN_BUILDER_SCENARIO:CampaignBuilderScenario={
  id:"sp-auto-launch-v1",
  version:1,
  title:"New Product Launch: SP Automatic Research",
  brief:"Build one controlled Sponsored Products automatic research campaign for a newly launched insulated lunch tote. Keep the account within its $50 daily cap and separate branded demand from generic discovery.",
  marketplace:"Amazon.com",
  currency:"USD",
  brand:"Haraya Home",
  asin:"B0LUNCH001",
  productName:"Haraya Home Insulated Lunch Tote",
  adType:"SP",
  strategy:"Research",
  targetingType:"Auto",
  matchLabel:"All",
  accountDailyBudgetCap:50,
  suggestedBudget:{min:20,max:35},
  suggestedBid:{min:.5,max:1},
  brandedQuery:"haraya lunch bag",
};

const clean=(value:string)=>value.trim();
const equal=(left:string,right:string)=>clean(left).toLowerCase()===clean(right).toLowerCase();

export function parseCampaignName(value:string){return value.split("|").map(clean)}

export function recommendedCampaignName(scenario:CampaignBuilderScenario){
  return `${scenario.brand} | ${scenario.asin} | ${scenario.adType} | ${scenario.strategy} | ${scenario.targetingType} | ${scenario.matchLabel} | Launch`;
}

export function evaluateCampaignBuild(scenario:CampaignBuilderScenario,draft:CampaignBuildDraft):CampaignBuildEvaluation{
  const errors:string[]=[],warnings:string[]=[];
  const parts=parseCampaignName(draft.campaignName);
  const namingValid=parts.length===7;
  if(!namingValid)errors.push("Campaign name must contain seven parts separated by |.");
  if(namingValid){
    const expected=[scenario.brand,scenario.asin,scenario.adType,scenario.strategy,scenario.targetingType,scenario.matchLabel];
    expected.forEach((value,index)=>{if(!equal(parts[index]??"",value))errors.push(`Campaign name part ${index+1} must be ${value}.`)});
    if(!clean(parts[6]??""))errors.push("Campaign name label cannot be empty.");
  }
  if(!clean(draft.portfolioName))errors.push("Portfolio name is required.");
  if(!clean(draft.adGroupName))errors.push("Ad group name is required.");
  const correctAsin=equal(draft.advertisedAsin,scenario.asin);
  if(!correctAsin)errors.push(`Product ad must use scenario ASIN ${scenario.asin}. Broken ASIN relationships cannot be submitted.`);
  if(!Number.isFinite(draft.dailyBudget)||draft.dailyBudget<=0)errors.push("Daily budget must be greater than zero.");
  const withinCap=Number.isFinite(draft.dailyBudget)&&draft.dailyBudget<=scenario.accountDailyBudgetCap;
  if(!withinCap)errors.push(`Account cap is $${scenario.accountDailyBudgetCap}/day. Lower the campaign budget before submitting.`);
  if(!Number.isFinite(draft.baseBid)||draft.baseBid<=0)errors.push("Base bid must be greater than zero.");
  if(!Number.isFinite(draft.topOfSearchAdjustment)||draft.topOfSearchAdjustment<0)errors.push("Top-of-search adjustment cannot be negative.");
  if(!Number.isFinite(draft.reviewDays)||draft.reviewDays<1)errors.push("Review timing must be at least one day.");

  if(draft.biddingStrategy!=="DOWN_ONLY")warnings.push("Use dynamic bids down only as the research-campaign baseline until evidence supports more exposure.");
  if(draft.topOfSearchAdjustment>0)warnings.push("A launch research campaign should begin without a placement multiplier unless placement evidence already exists.");
  if(draft.dailyBudget<scenario.suggestedBudget.min||draft.dailyBudget>scenario.suggestedBudget.max)warnings.push(`The scenario working range is $${scenario.suggestedBudget.min}-$${scenario.suggestedBudget.max} per day.`);
  if(draft.baseBid<scenario.suggestedBid.min||draft.baseBid>scenario.suggestedBid.max)warnings.push(`The scenario starting-bid range is $${scenario.suggestedBid.min.toFixed(2)}-$${scenario.suggestedBid.max.toFixed(2)}.`);
  if(!draft.negativeExact.some(term=>equal(term,scenario.brandedQuery)))warnings.push(`Add branded query "${scenario.brandedQuery}" as negative exact so branded traffic stays in branded defense.`);
  if(draft.rationale.trim().length<80)warnings.push("Document the objective, guardrails, expected result, and review trigger in at least 80 characters.");
  if(draft.reviewDays!==7)warnings.push("This launch scenario expects a seven-day first review window.");

  const dimensions:CampaignBuildDimensions={
    taskCompletion:(namingValid&&errors.every(item=>!item.startsWith("Campaign name part")&&!item.includes("label cannot"))?10:0)+(clean(draft.portfolioName)?5:0)+(clean(draft.adGroupName)?5:0)+(clean(draft.advertisedAsin)?10:0),
    decisionQuality:(draft.biddingStrategy==="DOWN_ONLY"?15:0)+(draft.dailyBudget>=scenario.suggestedBudget.min&&draft.dailyBudget<=scenario.suggestedBudget.max?8:0)+(draft.baseBid>=scenario.suggestedBid.min&&draft.baseBid<=scenario.suggestedBid.max?7:0),
    safetyIntegrity:(correctAsin?10:0)+(withinCap?10:0),
    documentation:(draft.rationale.trim().length>=80?10:0)+(draft.reviewDays===7?5:0),
    efficiency:(draft.topOfSearchAdjustment===0?3:0)+(draft.negativeExact.some(term=>equal(term,scenario.brandedQuery))?2:0),
  };
  const score=Object.values(dimensions).reduce((total,value)=>total+value,0);
  const criticalFailure=!correctAsin||!withinCap;
  const submittable=errors.length===0;
  const safeResearchControls=draft.biddingStrategy==="DOWN_ONLY"&&draft.topOfSearchAdjustment===0;
  return{score,passed:submittable&&!criticalFailure&&score>=80&&safeResearchControls,submittable,criticalFailure,errors,warnings,dimensions};
}

export function formatCampaignArtifact(scenario:CampaignBuilderScenario,draft:CampaignBuildDraft,result:CampaignBuildEvaluation){
  const lines=[
    "PINOY PPC ACADEMY — CAMPAIGN STRUCTURE ARTIFACT",
    `Scenario: ${scenario.title} (${scenario.id} v${scenario.version})`,
    `Marketplace: ${scenario.marketplace}`,
    `Product: ${scenario.productName} / ${scenario.asin}`,
    "",
    "STRUCTURE",
    `Portfolio: ${draft.portfolioName}`,
    `Campaign: ${draft.campaignName}`,
    `Ad type: Sponsored Products` ,
    `Ad group: ${draft.adGroupName}`,
    `Product ad ASIN: ${draft.advertisedAsin}`,
    `Targeting: Automatic / All groups`,
    "",
    "CONTROLS",
    `Daily budget: $${draft.dailyBudget.toFixed(2)}`,
    `Base bid: $${draft.baseBid.toFixed(2)}`,
    `Bidding strategy: ${draft.biddingStrategy}`,
    `Top-of-search adjustment: ${draft.topOfSearchAdjustment}%`,
    `Negative exact: ${draft.negativeExact.join(", ")||"None"}`,
    `Negative phrase: ${draft.negativePhrase.join(", ")||"None"}`,
    "",
    "CHANGE NOTE",
    draft.rationale,
    `First review: ${draft.reviewDays} day(s) after launch`,
    "",
    `Score: ${result.score}/100`,
    `Result: ${result.passed?"PASSED":"NEEDS REVISION"}`,
  ];
  return lines.join("\n");
}
