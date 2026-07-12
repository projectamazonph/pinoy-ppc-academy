import type {
  AmazonInterest,
  ReadinessInput,
  ReadinessRoute,
} from "@/modules/readiness/domain/readiness";

export interface SerializedReadinessResult {
  id: string;
  score: number;
  route: ReadinessRoute;
  title: string;
  summary: string;
  actions: [string, string, string];
  input: ReadinessInput;
  createdAt: string;
}

export type ReadinessActionState =
  | {status: "idle"}
  | {status: "error"; message: string}
  | {status: "result"; result: SerializedReadinessResult; plan: string};

export const initialReadinessActionState: ReadinessActionState = {status: "idle"};

export function isAmazonInterest(value: string): value is AmazonInterest {
  return value === "high" || value === "medium" || value === "low";
}
