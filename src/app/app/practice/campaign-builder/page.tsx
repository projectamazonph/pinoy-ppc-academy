import type {Route} from "next";
import Link from "next/link";
import {CampaignBuilder} from "@/components/simulators/CampaignBuilder";
import {requireCurrentUser} from "@/lib/server/auth";
import {getCampaignBuilderService} from "@/modules/campaign-builder/infrastructure/runtime";
import {getPracticeAttemptService} from "@/modules/practice/infrastructure/practice-runtime";

export default async function CampaignBuilderPage(){
  const user=await requireCurrentUser();
  const[access,summary]=await Promise.all([getCampaignBuilderService().getAccess(user.id),getPracticeAttemptService().getSummary(user.id)]);
  if(!access.allowed)return <div className="app-page"><Link className="lesson-back" href={"/app/courses/ppc-foundations" as Route}>← Back to PPC Foundations</Link><section className="locked-lesson"><p className="eyebrow">CAMPAIGN BUILDER / LOCKED</p><h1>Finish the control lessons first.</h1><p>{access.reason}</p><Link className="btn btn-primary" href={"/app/courses/ppc-foundations" as Route}>Open PPC Foundations</Link></section></div>;
  return <div className="app-page campaign-builder-page"><Link className="lesson-back" href={"/app/courses" as Route}>← Back to learning routes</Link><CampaignBuilder bestScore={summary.bestScores["campaign-builder"]??0}/></div>;
}
