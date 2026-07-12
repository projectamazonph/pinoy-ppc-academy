import {getQuizService} from "@/modules/assessment/infrastructure/assessment-runtime";
import {getProgressService} from "@/modules/progress/infrastructure/progress-runtime";
import {PpcFoundationsService} from "./service";

let service:PpcFoundationsService|undefined;
export function getPpcFoundationsService(){return service??=(new PpcFoundationsService(getQuizService(),getProgressService()))}
