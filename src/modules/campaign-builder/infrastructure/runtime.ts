import {getPracticeAttemptService} from "@/modules/practice/infrastructure/practice-runtime";
import {getProgressService} from "@/modules/progress/infrastructure/progress-runtime";
import {CampaignBuilderService} from "../application/service";
let service:CampaignBuilderService|undefined;
export function getCampaignBuilderService(){return service??=(new CampaignBuilderService(getProgressService(),getPracticeAttemptService()))}
