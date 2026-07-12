import type {AcademyDatabase} from "@/modules/shared/infrastructure/sqlite-database";
import type {
  ReadinessAssessmentRecord,
  ReadinessInput,
  ReadinessRepository,
  ReadinessRoute,
} from "../domain/readiness";

interface ReadinessRow {
  id: string;
  user_id: string;
  score: number;
  route: ReadinessRoute;
  title: string;
  summary: string;
  input_json: string;
  actions_json: string;
  created_at: string;
}

function toRecord(row: ReadinessRow): ReadinessAssessmentRecord {
  const actions = JSON.parse(row.actions_json) as [string, string, string];
  return {
    id: row.id,
    userId: row.user_id,
    score: row.score,
    route: row.route,
    title: row.title,
    summary: row.summary,
    input: JSON.parse(row.input_json) as ReadinessInput,
    actions,
    createdAt: new Date(row.created_at),
  };
}

export class SqliteReadinessRepository implements ReadinessRepository {
  constructor(private readonly database: AcademyDatabase) {}

  async save(record: ReadinessAssessmentRecord) {
    this.database
      .prepare(
        `INSERT INTO readiness_assessments
        (id,user_id,score,route,title,summary,input_json,actions_json,created_at)
        VALUES(?,?,?,?,?,?,?,?,?)`,
      )
      .run(
        record.id,
        record.userId,
        record.score,
        record.route,
        record.title,
        record.summary,
        JSON.stringify(record.input),
        JSON.stringify(record.actions),
        record.createdAt.toISOString(),
      );
  }

  async listForUser(userId: string) {
    const rows = this.database
      .prepare(
        `SELECT id,user_id,score,route,title,summary,input_json,actions_json,created_at
         FROM readiness_assessments WHERE user_id=? ORDER BY created_at DESC`,
      )
      .all(userId) as unknown as ReadinessRow[];
    return rows.map(toRecord);
  }

  async getLatestForUser(userId: string) {
    const row = this.database
      .prepare(
        `SELECT id,user_id,score,route,title,summary,input_json,actions_json,created_at
         FROM readiness_assessments WHERE user_id=? ORDER BY created_at DESC LIMIT 1`,
      )
      .get(userId) as unknown as ReadinessRow | undefined;
    return row ? toRecord(row) : null;
  }
}
