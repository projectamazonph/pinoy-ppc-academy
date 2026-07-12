"use client";
import {useActionState,useMemo,useState} from "react";
import {submitCampaignBuildAction} from "@/app/actions/campaign-builder";
import {INITIAL_CAMPAIGN_BUILDER_STATE} from "@/modules/campaign-builder/application/action-state";
import {
  CAMPAIGN_BUILDER_SCENARIO as scenario,
  evaluateCampaignBuild,
  recommendedCampaignName,
  type BiddingStrategy,
  type CampaignBuildDraft,
} from "@/modules/campaign-builder/domain/campaign-builder";

const initial:CampaignBuildDraft={
  portfolioName:`${scenario.brand} | ${scenario.asin}`,
  campaignName:recommendedCampaignName(scenario),
  adGroupName:"AG | Auto | Launch",
  advertisedAsin:scenario.asin,
  dailyBudget:30,
  baseBid:.75,
  biddingStrategy:"DOWN_ONLY",
  topOfSearchAdjustment:0,
  negativeExact:[scenario.brandedQuery],
  negativePhrase:[],
  rationale:"Use controlled automatic targeting to discover relevant non-branded shopper queries before harvesting proven terms.",
  reviewDays:7,
};

export function CampaignBuilder({bestScore}:{bestScore:number}){
  const[draft,setDraft]=useState(initial);
  const[state,action,pending]=useActionState(submitCampaignBuildAction,INITIAL_CAMPAIGN_BUILDER_STATE);
  const evaluation=useMemo(()=>evaluateCampaignBuild(scenario,draft),[draft]);
  const set=<K extends keyof CampaignBuildDraft>(key:K,value:CampaignBuildDraft[K])=>setDraft(current=>({...current,[key]:value}));
  const download=()=>{
    if(state.status!=="result")return;
    const url=URL.createObjectURL(new Blob([state.artifact],{type:"text/plain"}));
    const link=document.createElement("a");link.href=url;link.download=`${scenario.id}-campaign-structure.txt`;link.click();URL.revokeObjectURL(url);
  };
  return <div className="campaign-builder">
    <section className="scenario-brief">
      <div><p className="eyebrow">SCENARIO 01 / VERSION {scenario.version}</p><h1>{scenario.title}</h1><p>{scenario.brief}</p></div>
      <dl><div><dt>Marketplace</dt><dd>{scenario.marketplace}</dd></div><div><dt>Product</dt><dd>{scenario.productName}</dd></div><div><dt>ASIN</dt><dd>{scenario.asin}</dd></div><div><dt>Account cap</dt><dd>${scenario.accountDailyBudgetCap}/day</dd></div><div><dt>Best score</dt><dd>{bestScore}/100</dd></div></dl>
    </section>
    <form action={action} className="campaign-builder-workspace">
      <div className="campaign-form-stack">
        <section><p className="eyebrow">01 / STRUCTURE</p><h2>Build the object hierarchy</h2>
          <label>Portfolio name<input name="portfolioName" value={draft.portfolioName} onChange={event=>set("portfolioName",event.target.value)}/></label>
          <label>Campaign name<input name="campaignName" value={draft.campaignName} onChange={event=>set("campaignName",event.target.value)}/><small>Brand | ASIN | Ad Type | Strategy | Target Type | Match | Label</small></label>
          <label>Ad group name<input name="adGroupName" value={draft.adGroupName} onChange={event=>set("adGroupName",event.target.value)}/></label>
          <label>Product ad ASIN<input name="advertisedAsin" value={draft.advertisedAsin} onChange={event=>set("advertisedAsin",event.target.value)}/></label>
        </section>
        <section><p className="eyebrow">02 / CONTROLS</p><h2>Set spend and auction limits</h2><div className="campaign-field-grid">
          <label>Daily budget, USD<input aria-label="Daily budget" name="dailyBudget" type="number" min="1" step="1" value={draft.dailyBudget} onChange={event=>set("dailyBudget",Number(event.target.value))}/></label>
          <label>Base bid, USD<input name="baseBid" type="number" min="0.02" step="0.01" value={draft.baseBid} onChange={event=>set("baseBid",Number(event.target.value))}/></label>
          <label>Bidding strategy<select name="biddingStrategy" value={draft.biddingStrategy} onChange={event=>set("biddingStrategy",event.target.value as BiddingStrategy)}><option value="DOWN_ONLY">Dynamic bids — down only</option><option value="FIXED">Fixed bids</option><option value="UP_DOWN">Dynamic bids — up and down</option></select></label>
          <label>Top-of-search adjustment<input name="topOfSearchAdjustment" type="number" min="0" max="900" step="5" value={draft.topOfSearchAdjustment} onChange={event=>set("topOfSearchAdjustment",Number(event.target.value))}/><small>Percent</small></label>
        </div></section>
        <section><p className="eyebrow">03 / TRAFFIC CONTROL</p><h2>Separate branded and generic demand</h2>
          <label>Negative exact<textarea name="negativeExact" rows={3} value={draft.negativeExact.join("\n")} onChange={event=>set("negativeExact",event.target.value.split("\n"))}/><small>One shopper query per line.</small></label>
          <label>Negative phrase<textarea name="negativePhrase" rows={3} value={draft.negativePhrase.join("\n")} onChange={event=>set("negativePhrase",event.target.value.split("\n"))}/></label>
        </section>
        <section><p className="eyebrow">04 / CHANGE NOTE</p><h2>Make the build auditable</h2>
          <label>Rationale<textarea name="rationale" rows={5} value={draft.rationale} onChange={event=>set("rationale",event.target.value)}/><small>State objective, guardrails, expected result, and review trigger.</small></label>
          <label>First review after<input name="reviewDays" type="number" min="1" max="30" value={draft.reviewDays} onChange={event=>set("reviewDays",Number(event.target.value))}/><small>Days</small></label>
        </section>
        <button className="btn btn-primary" disabled={pending} type="submit">{pending?"Submitting build…":"Validate and submit build"}</button>
      </div>
      <aside className="campaign-preview">
        <p className="eyebrow">LIVE STRUCTURE PREVIEW</p><code>{draft.campaignName}</code>
        <ol><li><span>Portfolio</span><strong>{draft.portfolioName||"Missing"}</strong></li><li><span>Campaign</span><strong>SP / Research / Auto</strong></li><li><span>Ad group</span><strong>{draft.adGroupName||"Missing"}</strong></li><li><span>Product ad</span><strong>{draft.advertisedAsin||"Missing"}</strong></li></ol>
        <div className="campaign-live-score"><span>Current rule score</span><strong>{evaluation.score}</strong><small>{evaluation.submittable?evaluation.passed?"Ready to submit":"Submittable, but needs safer decisions":"Fix validation errors"}</small></div>
        {evaluation.errors.length>0&&<div className="campaign-errors"><strong>Cannot submit</strong><ul>{evaluation.errors.map(error=><li key={error}>{error}</li>)}</ul></div>}
        {evaluation.warnings.length>0&&<div className="campaign-warnings"><strong>Decision review</strong><ul>{evaluation.warnings.map(warning=><li key={warning}>{warning}</li>)}</ul></div>}
        {state.status==="validation"&&<div className="campaign-server-result fail"><strong>Server rejected this structure</strong><p>Invalid relationships were not saved.</p></div>}
        {state.status==="error"&&<div className="campaign-server-result fail"><strong>Could not submit</strong><p>{state.message}</p></div>}
        {state.status==="result"&&<div className={`campaign-server-result ${state.passed?"pass":"review"}`}><strong>{state.passed?"Build passed":"Build saved for revision"}</strong><span>{state.score}/100</span><button className="btn btn-secondary" type="button" onClick={download}>Download structure artifact</button></div>}
      </aside>
    </form>
  </div>;
}
