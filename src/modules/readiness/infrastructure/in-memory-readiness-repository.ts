import type {
  ReadinessAssessmentRecord,
  ReadinessRepository,
} from "../domain/readiness";

export class InMemoryReadinessRepository implements ReadinessRepository {
  private readonly records: ReadinessAssessmentRecord[] = [];

  async save(record: ReadinessAssessmentRecord) {
    this.records.push(structuredClone(record));
  }

  async listForUser(userId: string) {
    return this.records
      .filter((record) => record.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((record) => structuredClone(record));
  }

  async getLatestForUser(userId: string) {
    return (await this.listForUser(userId))[0] ?? null;
  }
}
