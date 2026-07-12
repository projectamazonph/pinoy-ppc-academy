import {getProgressService} from "@/modules/progress/infrastructure/progress-runtime";
import {getAcademyDatabase} from "@/modules/shared/infrastructure/database-runtime";
import {ReadinessService} from "../application/readiness-service";
import {SqliteReadinessRepository} from "./sqlite-readiness-repository";

let service: ReadinessService | undefined;

export function getReadinessService() {
  return (service ??= new ReadinessService(
    new SqliteReadinessRepository(getAcademyDatabase()),
    getProgressService(),
  ));
}
