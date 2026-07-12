import {getQuizService} from "@/modules/assessment/infrastructure/assessment-runtime";
import {getProgressService} from "@/modules/progress/infrastructure/progress-runtime";
import {getReadinessService} from "@/modules/readiness/infrastructure/readiness-runtime";
import {AmazonFoundationsService} from "./service";

let service: AmazonFoundationsService | undefined;

export function getAmazonFoundationsService() {
  return (service ??= new AmazonFoundationsService(
    getQuizService(),
    getProgressService(),
    getReadinessService(),
  ));
}
