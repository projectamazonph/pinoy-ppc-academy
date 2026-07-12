import {randomUUID} from "node:crypto";
import type {ProgressService} from "@/modules/progress/application/progress-service";
import {
  buildReadinessRecommendation,
  type ReadinessAssessmentRecord,
  type ReadinessInput,
  type ReadinessRepository,
} from "../domain/readiness";

type ProgressReader = Pick<ProgressService, "getStarterSummary">;

export class ReadinessService {
  constructor(
    private readonly repository: ReadinessRepository,
    private readonly progress: ProgressReader,
    private readonly now = () => new Date(),
    private readonly createId: () => string = () => randomUUID(),
  ) {}

  async submit(userId: string, input: ReadinessInput) {
    const progress = await this.progress.getStarterSummary(userId);
    if (progress.completedLessons < 8) {
      throw new Error("Complete all eight VA Career Starter modules before taking the readiness assessment.");
    }

    const recommendation = buildReadinessRecommendation(input);
    const record: ReadinessAssessmentRecord = {
      id: this.createId(),
      userId,
      input: {
        ...input,
        previousRole: input.previousRole.trim(),
        transferableSkill: input.transferableSkill.trim(),
      },
      ...recommendation,
      createdAt: this.now(),
    };
    await this.repository.save(record);
    return record;
  }

  async getLatest(userId: string) {
    return this.repository.getLatestForUser(userId);
  }

  async getHistory(userId: string) {
    return this.repository.listForUser(userId);
  }
}
