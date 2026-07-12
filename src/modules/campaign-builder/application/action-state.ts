import type {CampaignBuildDimensions} from "../domain/campaign-builder";
export type CampaignBuilderActionState=
  |{status:"idle"}
  |{status:"validation";score:number;errors:string[];warnings:string[];dimensions:CampaignBuildDimensions}
  |{status:"result";score:number;passed:boolean;warnings:string[];dimensions:CampaignBuildDimensions;artifact:string}
  |{status:"error";message:string};
export const INITIAL_CAMPAIGN_BUILDER_STATE:CampaignBuilderActionState={status:"idle"};
