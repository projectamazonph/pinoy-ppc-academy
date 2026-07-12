import {PracticeAttemptService} from "@/modules/practice/application/practice-attempt-service";
import {PPC_FOUNDATIONS_MODULES,PPC_FOUNDATIONS_SLUG} from "@/modules/ppc-foundations/domain/content";
import {ProgressService} from "@/modules/progress/application/progress-service";
import {
  CAMPAIGN_BUILDER_SCENARIO,
  evaluateCampaignBuild,
  formatCampaignArtifact,
  type CampaignBuildDraft,
  type CampaignBuildEvaluation,
} from "../domain/campaign-builder";

export class CampaignBuildValidationError extends Error{
  constructor(readonly evaluation:CampaignBuildEvaluation){super("Fix the invalid campaign relationships before submitting.");this.name="CampaignBuildValidationError"}
}

export class CampaignBuilderService{
  constructor(private readonly progress:ProgressService,private readonly attempts:PracticeAttemptService){}

  async getAccess(userId:string){
    const ppc=await this.progress.getCourseSummary(userId,PPC_FOUNDATIONS_SLUG,PPC_FOUNDATIONS_MODULES);
    return ppc.completedLessons===ppc.totalLessons
      ? {allowed:true as const,reason:null,ppc}
      : {allowed:false as const,reason:"Complete all seven PPC Foundations modules first.",ppc};
  }

  async submit(userId:string,draft:CampaignBuildDraft){
    const access=await this.getAccess(userId);
    if(!access.allowed)throw new Error(`PPC Foundations required. ${access.reason}`);
    const evaluation=evaluateCampaignBuild(CAMPAIGN_BUILDER_SCENARIO,draft);
    if(!evaluation.submittable)throw new CampaignBuildValidationError(evaluation);
    const artifact=formatCampaignArtifact(CAMPAIGN_BUILDER_SCENARIO,draft,evaluation);
    await this.attempts.recordAttempt({
      userId,
      labSlug:"campaign-builder",
      score:evaluation.score,
      passed:evaluation.passed,
      criticalFailure:evaluation.criticalFailure,
      payload:{scenarioId:CAMPAIGN_BUILDER_SCENARIO.id,scenarioVersion:CAMPAIGN_BUILDER_SCENARIO.version,draft,dimensions:evaluation.dimensions,warnings:evaluation.warnings,artifact},
    });
    return{...evaluation,artifact};
  }
}
