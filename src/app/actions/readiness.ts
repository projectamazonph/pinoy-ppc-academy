"use server";

import {revalidatePath} from "next/cache";
import {requireCurrentUser} from "@/lib/server/auth";
import {buildReadinessPlan, type ReadinessAssessmentRecord} from "@/modules/readiness/domain/readiness";
import {getReadinessService} from "@/modules/readiness/infrastructure/readiness-runtime";
import {
  isAmazonInterest,
  type ReadinessActionState,
  type SerializedReadinessResult,
} from "./readiness-state";

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "");
}

function checked(form: FormData, key: string) {
  return form.get(key) === "on";
}

function serialize(result: ReadinessAssessmentRecord): SerializedReadinessResult {
  return {
    id: result.id,
    score: result.score,
    route: result.route,
    title: result.title,
    summary: result.summary,
    actions: result.actions,
    input: result.input,
    createdAt: result.createdAt.toISOString(),
  };
}

export async function submitReadinessAction(
  _: ReadinessActionState,
  form: FormData,
): Promise<ReadinessActionState> {
  const user = await requireCurrentUser();
  const amazonInterest = text(form, "amazonInterest");
  if (!isAmazonInterest(amazonInterest)) {
    return {status: "error", message: "Choose your current level of interest in Amazon work."};
  }

  try {
    const result = await getReadinessService().submit(user.id, {
      deviceReady: checked(form, "deviceReady"),
      internetReady: checked(form, "internetReady"),
      backupReady: checked(form, "backupReady"),
      secureAccessReady: checked(form, "secureAccessReady"),
      digitalSkills: Number(text(form, "digitalSkills")),
      communicationSkills: Number(text(form, "communicationSkills")),
      weeklyStudyHours: Number(text(form, "weeklyStudyHours")),
      amazonInterest,
      previousRole: text(form, "previousRole"),
      transferableSkill: text(form, "transferableSkill"),
    });
    revalidatePath("/app");
    revalidatePath("/app/readiness");
    return {status: "result", result: serialize(result), plan: buildReadinessPlan(result)};
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not save your readiness assessment.",
    };
  }
}
