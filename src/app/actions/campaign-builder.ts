"use server";
import {revalidatePath} from "next/cache";
import {requireCurrentUser} from "@/lib/server/auth";
import {CampaignBuildValidationError} from "@/modules/campaign-builder/application/service";
import {getCampaignBuilderService} from "@/modules/campaign-builder/infrastructure/runtime";
import type {BiddingStrategy,CampaignBuildDraft} from "@/modules/campaign-builder/domain/campaign-builder";
import type {CampaignBuilderActionState} from "@/modules/campaign-builder/application/action-state";

const list=(value:FormDataEntryValue|null)=>String(value??"").split(/[\n,]/).map(item=>item.trim()).filter(Boolean);
export async function submitCampaignBuildAction(_:CampaignBuilderActionState,form:FormData):Promise<CampaignBuilderActionState>{
  const user=await requireCurrentUser();
  const draft:CampaignBuildDraft={
    portfolioName:String(form.get("portfolioName")??""),
    campaignName:String(form.get("campaignName")??""),
    adGroupName:String(form.get("adGroupName")??""),
    advertisedAsin:String(form.get("advertisedAsin")??""),
    dailyBudget:Number(form.get("dailyBudget")),
    baseBid:Number(form.get("baseBid")),
    biddingStrategy:String(form.get("biddingStrategy")) as BiddingStrategy,
    topOfSearchAdjustment:Number(form.get("topOfSearchAdjustment")),
    negativeExact:list(form.get("negativeExact")),
    negativePhrase:list(form.get("negativePhrase")),
    rationale:String(form.get("rationale")??""),
    reviewDays:Number(form.get("reviewDays")),
  };
  try{
    const result=await getCampaignBuilderService().submit(user.id,draft);
    revalidatePath("/app");revalidatePath("/app/courses");revalidatePath("/app/practice/campaign-builder");
    return{status:"result",score:result.score,passed:result.passed,warnings:result.warnings,dimensions:result.dimensions,artifact:result.artifact};
  }catch(error){
    if(error instanceof CampaignBuildValidationError)return{status:"validation",score:error.evaluation.score,errors:error.evaluation.errors,warnings:error.evaluation.warnings,dimensions:error.evaluation.dimensions};
    return{status:"error",message:error instanceof Error?error.message:"Could not submit this campaign build."};
  }
}
