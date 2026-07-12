import type {QuizDefinition} from "@/modules/assessment/domain/assessment";

export const PPC_FOUNDATIONS_SLUG = "ppc-foundations";

export interface PpcFoundationModule {
  id: string;
  title: string;
  summary: string;
  evidence: string;
  outcomes: [string,string,string];
  sections: Array<{title:string;paragraphs:string[];checklist?:string[]}>;
  quickCheck: QuizDefinition;
  toolHref?: string;
}

function check(
  lessonId:string,
  prefix:string,
  questions:[
    {prompt:string;correct:string;wrongA:string;wrongB:string;explanation:string},
    {prompt:string;correct:string;wrongA:string;wrongB:string;explanation:string},
  ],
):QuizDefinition {
  return {
    id:`${lessonId}-check`,lessonId,version:1,passPercent:80,
    questions:questions.map((question,index)=>({
      id:`${prefix}-q${index+1}`,
      prompt:question.prompt,
      choices:index===0
        ? [{id:"a",label:question.correct},{id:"b",label:question.wrongA},{id:"c",label:question.wrongB}]
        : [{id:"a",label:question.wrongA},{id:"b",label:question.correct},{id:"c",label:question.wrongB}],
      correctChoiceId:index===0?"a":"b",
      explanation:question.explanation,
    })),
  };
}

export const PPC_FOUNDATIONS_MODULES:PpcFoundationModule[]=[
  {
    id:"ppc-01-advertising-economics",title:"Advertising Economics",summary:"Read CPC, CTR, CVR, ACoS, ROAS, and break-even limits as one economic system.",evidence:"Metric interpretation worksheet",
    outcomes:["Calculate core advertising metrics","Connect conversion and margin to safe CPC","Explain when holding is safer than changing"],
    sections:[
      {title:"Every metric answers a different question",paragraphs:["Cost per click, or CPC, shows traffic cost. Click-through rate, or CTR, shows whether the ad earns attention. Conversion rate, or CVR, shows whether clicks become orders.","Advertising Cost of Sale, or ACoS, divides spend by ad sales. Return on Ad Spend, or ROAS, divides ad sales by spend. They describe the same relationship in opposite directions."]},
      {title:"The bid must fit the economics",paragraphs:["A practical target CPC can be estimated as selling price multiplied by conversion rate multiplied by target ACoS. It is a planning ceiling, not a guarantee of actual CPC.","Break-even ACoS comes from contribution margin. A campaign below target can still be unsafe if inventory, price, or listing readiness is weak."],checklist:["Confirm selling price","Confirm conversion rate","Confirm target ACoS","Check inventory and offer readiness","State the review window"]},
      {title:"Holding is a real decision",paragraphs:["A few clicks rarely justify a large bid change. When evidence is thin, hold, gather more data, and define the next review threshold.","Do not optimize a number without first classifying whether the root cause is advertising, listing, inventory or price, or structure."]},
    ],
    quickCheck:check("ppc-01-advertising-economics","pp01",[
      {prompt:"Which metric equals ad spend divided by ad sales?",correct:"ACoS",wrongA:"CTR",wrongB:"CVR",explanation:"ACoS measures ad spend as a percentage of ad-attributed sales."},
      {prompt:"What is the safest action when data is insufficient?",correct:"Hold and define the next review threshold",wrongA:"Double the bid",wrongB:"Negate the target",explanation:"Holding prevents overreaction while more evidence is collected."},
    ]),
  },
  {
    id:"ppc-02-tacos-business-health",title:"TACoS and Business Health",summary:"Use ad spend versus total sales to judge advertising dependence and broader business movement.",evidence:"TACoS comparison analysis",toolHref:"/app/practice/tacos-calculator",
    outcomes:["Calculate TACoS correctly","Compare identical ACoS with different TACoS","Explain possible organic-sales and dependence signals"],
    sections:[
      {title:"TACoS adds the whole business",paragraphs:["Total Advertising Cost of Sale, or TACoS, equals ad spend divided by total sales. It does not replace ACoS. It adds context about advertising's share of the entire revenue base.","Two accounts can both have 25 percent ACoS. If one has 20 percent TACoS and the other has 10 percent TACoS, the second account produces more total sales around the same ad spend and ad sales."]},
      {title:"Movement needs interpretation, not slogans",paragraphs:["Falling TACoS can be healthy when total sales grow faster than ad spend. It can also fall because spend was cut while the business shrank, so always inspect the component totals.","Rising TACoS can signal greater advertising dependence, a launch investment, organic decline, price or inventory disruption, or a deliberate growth strategy."],checklist:["Compare ad spend","Compare ad sales","Compare total sales","Calculate organic sales","Check listing, price, inventory, and seasonality"]},
      {title:"Explain the business story",paragraphs:["A good analysis states what moved, which component caused it, what alternative explanations remain, and what should be checked next.","Never claim TACoS proves organic rank. It is a business-health signal that must be combined with retail and organic evidence."]},
    ],
    quickCheck:check("ppc-02-tacos-business-health","pp02",[
      {prompt:"How is TACoS calculated?",correct:"Ad spend divided by total sales",wrongA:"Ad sales divided by spend",wrongB:"Clicks divided by impressions",explanation:"TACoS compares ad spend with all sales, not only ad-attributed sales."},
      {prompt:"Two accounts have identical ACoS. Which can still differ?",correct:"Their TACoS and advertising dependence",wrongA:"Their ACoS must differ",wrongB:"Nothing can differ",explanation:"Total sales can differ even when ad spend and ad sales produce the same ACoS."},
    ]),
  },
  {
    id:"ppc-03-campaign-types",title:"Campaign Types: SP, SB, and SD",summary:"Choose Sponsored Products, Sponsored Brands, and Sponsored Display based on goal, eligibility, and creative needs.",evidence:"Campaign-type decision table",
    outcomes:["Differentiate SP, SB, and SD","Match campaign type to funnel goal","Check eligibility and creative requirements"],
    sections:[
      {title:"Sponsored Products",paragraphs:["Sponsored Products, or SP, promote individual products across shopping results and product pages. They are the operational baseline for most Amazon PPC accounts.","SP supports keyword and product targeting, automatic targeting, placement controls, and product-level conversion goals."]},
      {title:"Sponsored Brands and Sponsored Display",paragraphs:["Sponsored Brands, or SB, can use brand creative, headlines, video, and landing experiences. Brand Registry and complete creative assets matter.","Sponsored Display, or SD, can reach audiences and product-page shoppers. It is not a substitute for fixing a weak listing or an unavailable offer."],checklist:["State campaign goal","Confirm eligibility","Confirm advertised products","Confirm creative","Confirm landing destination","Confirm measurement"]},
      {title:"Choose the smallest suitable tool",paragraphs:["Do not add campaign types because an account looks incomplete. Use the format that matches the goal and available creative.","Publishing incomplete Sponsored Brands creative is a critical safety failure. Preview every creative and destination before launch."]},
    ],
    quickCheck:check("ppc-03-campaign-types","pp03",[
      {prompt:"Which campaign type is the usual product-level operating baseline?",correct:"Sponsored Products",wrongA:"Sponsored Brands only",wrongB:"Sponsored Display only",explanation:"Sponsored Products is the common product-ad baseline for Amazon PPC operations."},
      {prompt:"What must happen before publishing Sponsored Brands creative?",correct:"Preview the creative and landing destination",wrongA:"Skip eligibility checks",wrongB:"Raise all bids",explanation:"Creative, product eligibility, and the destination must be complete and verified."},
    ]),
  },
  {
    id:"ppc-04-targeting-match",title:"Targeting and Match",summary:"Control reach with automatic targeting, keyword match types, ASINs, categories, and audiences.",evidence:"Targeting control map",
    outcomes:["Explain exact, phrase, and broad control","Separate keyword, product, and audience targets","Choose discovery versus control deliberately"],
    sections:[
      {title:"Automatic and manual targeting serve different jobs",paragraphs:["Automatic targeting lets Amazon match the advertised product using its catalog and shopper signals. It is useful for discovery and coverage, but it needs controlled bids and search-term review.","Manual targeting chooses keywords, products, categories, or audiences directly. Manual does not automatically mean precise; the selected match or refinement controls reach."]},
      {title:"Keyword match types",paragraphs:["Exact match offers the most query control, phrase allows words around the phrase, and broad can reach related variations. More reach increases discovery and the need for review.","Research campaigns should usually begin with down only bidding and conservative bids. Exact performance targets can earn more focused treatment after evidence exists."],checklist:["State research or performance goal","Choose target type","Choose match type","Set conservative starting bid","Add known conflict negatives","Set review threshold"]},
      {title:"Product and audience targeting",paragraphs:["ASIN targeting reaches selected product pages or related placements. Category targeting broadens reach and should use refinements when available.","Audience targeting is common in Sponsored Display. It depends on the goal, eligible products, attribution context, and inventory readiness."]},
    ],
    quickCheck:check("ppc-04-targeting-match","pp04",[
      {prompt:"Which keyword match type normally gives the most query control?",correct:"Exact",wrongA:"Broad",wrongB:"Automatic",explanation:"Exact match narrows the relationship between target and shopper query."},
      {prompt:"What is the default teaching baseline for research campaigns?",correct:"Down only bidding with conservative bids",wrongA:"Up and down everywhere",wrongB:"Maximum placement multipliers",explanation:"Down only limits upward bid expansion while discovery data is still uncertain."},
    ]),
  },
  {
    id:"ppc-05-bids-placements",title:"Bids and Placements",summary:"Connect target bids, bidding strategies, placement multipliers, evidence, and economic limits.",evidence:"Bid and placement decision note",
    outcomes:["Estimate a target CPC","Explain down only, fixed, and up-and-down strategies","Make placement changes from evidence"],
    sections:[
      {title:"The bid is a ceiling, not the final CPC",paragraphs:["A target bid is the maximum base amount you are willing to enter into the auction. Actual CPC depends on competition, relevance, placement, and bidding controls.","Start with the smallest safe change. Large increases can spend before conversion evidence catches up."]},
      {title:"Bidding strategies change exposure",paragraphs:["Dynamic bids down only lets Amazon reduce bids when conversion is less likely. Fixed bids preserve the entered bid. Up and down can raise and lower bids and should be reserved for scenarios that justify the extra exposure.","Down only is the default teaching baseline for research. Performance structures may justify another strategy after clear evidence and guardrails."],checklist:["Check break-even ACoS","Check CVR and CPC","Check data volume","Check inventory","Check placement performance","Set review date"]},
      {title:"Placement multipliers compound risk",paragraphs:["Top of search, rest of search, and product pages can perform differently. A placement multiplier changes effective auction exposure and should be based on placement-level evidence.","If top of search converts well but inventory is low, profitability alone does not make scaling safe. Inventory remains part of the decision."]},
    ],
    quickCheck:check("ppc-05-bids-placements","pp05",[
      {prompt:"What does a target bid represent?",correct:"A base auction ceiling before other controls",wrongA:"Guaranteed CPC",wrongB:"Guaranteed sales",explanation:"The entered bid is a ceiling used in the auction, not a guaranteed charge or outcome."},
      {prompt:"What is the default research-campaign bidding baseline?",correct:"Dynamic bids down only",wrongA:"Up and down with 900% placement",wrongB:"Fixed bids for every target",explanation:"Down only provides a safer discovery baseline while evidence is limited."},
    ]),
  },
  {
    id:"ppc-06-budgets-pacing",title:"Budgets and Pacing",summary:"Protect profitable demand, reallocate waste, and avoid scaling products the business cannot support.",evidence:"Daily pacing plan",
    outcomes:["Identify true budget limitation","Prioritize profitable constrained campaigns","Apply inventory and account-cap guardrails"],
    sections:[
      {title:"A budget cap is a business constraint",paragraphs:["Campaign daily budgets control how much a campaign can spend, while account-level plans control total exposure across campaigns. Running out of budget is not automatically bad; first ask whether the limited traffic is profitable and strategically important.","A campaign can show a budget warning while wasting money. Another can be profitable and constrained. Reallocation should come before blind budget expansion."]},
      {title:"Use the pacing decision order",paragraphs:["Confirm the campaign is genuinely budget-limited, check profitability and goal, review inventory and offer readiness, find waste to reallocate, apply the smallest change, and set a review point.","Protect branded defense and proven exact demand, but do not fund branded traffic at the expense of measuring real incremental growth."],checklist:["Confirm budget-limited hours","Check ACoS and margin","Check inventory","Find waste","Respect account cap","Set next review"]},
      {title:"Pacing is not permission to spend",paragraphs:["Spending evenly can be useful, but the goal is not to exhaust every budget. The goal is to fund valuable demand within business limits.","If a product is low on inventory, reduce exposure or coordinate replenishment. Never use higher budgets to hide a structural or listing problem."]},
    ],
    quickCheck:check("ppc-06-budgets-pacing","pp06",[
      {prompt:"What should happen before adding budget?",correct:"Confirm profitable limitation, inventory, and reallocation options",wrongA:"Increase every campaign",wrongB:"Ignore the account cap",explanation:"Budget changes require profitability, business, inventory, and pacing context."},
      {prompt:"A profitable campaign is limited while another wastes spend. What is the first funding source?",correct:"Reallocate documented waste",wrongA:"Unlimited new spend",wrongB:"Cut the profitable campaign",explanation:"Reallocating waste can fund valuable demand without immediately increasing account exposure."},
    ]),
  },
  {
    id:"ppc-07-search-term-logic",title:"Search Term Logic",summary:"Harvest proven queries and apply negative exact or negative phrase without blocking valuable traffic.",evidence:"Search-term decision worksheet",
    outcomes:["Separate target from search term","Choose harvest, hold, or negative action","Apply negative exact and phrase safely"],
    sections:[
      {title:"A target can match many search terms",paragraphs:["A keyword or automatic target is the advertiser's instruction. The search term is the shopper query or matched product traffic. Decisions must use the actual relationship, data volume, intent, and conversion evidence.","A converting query may be harvested into a controlled exact or phrase structure. The source negative depends on the isolation strategy, not a universal rule."]},
      {title:"Negative exact versus negative phrase",paragraphs:["Negative exact blocks one precise query and is safer for isolated waste. Negative phrase can block a family of related searches and requires stronger evidence.","Blocking a converting query family is a critical failure. Single-word negatives need special caution because their reach and ambiguity can be much larger than expected."],checklist:["Confirm actual search term","Check clicks and orders","Classify intent","Check brand route","Choose harvest, hold, or negative","Explain negative scope"]},
      {title:"Hold when evidence is weak",paragraphs:["A non-converting term with three clicks is not the same as one with sixty clicks. Data sufficiency depends on expected conversion, cost, relevance, and risk.","Branded queries belong in branded defense structures. Generic performance campaigns should not quietly absorb branded traffic and distort reporting."]},
    ],
    quickCheck:check("ppc-07-search-term-logic","pp07",[
      {prompt:"Which negative type is safer for one isolated waste query?",correct:"Negative exact",wrongA:"Negative phrase",wrongB:"Campaign archive",explanation:"Negative exact blocks the precise query without automatically blocking its broader family."},
      {prompt:"What is appropriate when evidence is weak?",correct:"Hold and collect more data",wrongA:"Add a broad single-word negative",wrongB:"Delete the campaign",explanation:"Holding is a valid decision when the evidence does not justify an irreversible or broad action."},
    ]),
  },
];

export function getPpcFoundationsModule(id:string){return PPC_FOUNDATIONS_MODULES.find(item=>item.id===id)}
