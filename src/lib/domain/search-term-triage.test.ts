import { describe, expect, it } from "vitest";
import { recommendTriageAction, scoreTriageDecision } from "./search-term-triage";
describe("search-term triage", () => {
  it("harvests a proven discovery winner", () => expect(recommendTriageAction({source:"AUTO",relevance:"HIGH",clicks:24,orders:3,spend:420,sales:2100,targetAcosPercent:25,averageOrderValue:700,alreadyHarvested:false}).action).toBe("HARVEST"));
  it("negates irrelevant traffic", () => expect(recommendTriageAction({source:"BROAD",relevance:"LOW",clicks:6,orders:0,spend:210,sales:0,targetAcosPercent:25,averageOrderValue:700,alreadyHarvested:false}).action).toBe("NEGATE_EXACT"));
  it("observes thin relevant data", () => expect(recommendTriageAction({source:"PHRASE",relevance:"HIGH",clicks:4,orders:0,spend:80,sales:0,targetAcosPercent:25,averageOrderValue:700,alreadyHarvested:false}).action).toBe("OBSERVE"));
  it("blocks negating a converting term", () => expect(scoreTriageDecision({expectedAction:"HARVEST",expectedReasonCode:"PROVEN_DISCOVERY_WINNER",chosenAction:"NEGATE_EXACT",chosenReasonCode:"IRRELEVANT_TRAFFIC",sequenceConfirmed:true,termHasOrders:true})).toMatchObject({score:0,passed:false,criticalFailure:true}));
});
