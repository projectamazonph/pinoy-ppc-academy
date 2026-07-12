"use server";

import {revalidatePath} from "next/cache";
import {requireCurrentUser} from "@/lib/server/auth";
import {getAmazonFoundationsService} from "@/modules/amazon-foundations/application/runtime";
import {getAmazonFoundationsModule} from "@/modules/amazon-foundations/domain/content";
import type {AssessmentActionState} from "./assessment-state";

export async function submitAmazonFoundationsQuizAction(
  _: AssessmentActionState,
  form: FormData,
): Promise<AssessmentActionState> {
  const user = await requireCurrentUser();
  const lessonId = String(form.get("lessonId") ?? "");
  const lesson = getAmazonFoundationsModule(lessonId);
  if (!lesson) return {status: "error", message: "This lesson could not be found."};
  const answers = Object.fromEntries(
    lesson.quickCheck.questions.map((question) => [
      question.id,
      String(form.get(`answer:${question.id}`) ?? ""),
    ]),
  );
  try {
    const result = await getAmazonFoundationsService().submitQuickCheck({
      userId: user.id,
      lessonId,
      answers,
    });
    revalidatePath("/app");
    revalidatePath("/app/courses");
    revalidatePath("/app/courses/amazon-foundations");
    return {
      status: "result",
      score: result.score,
      passed: result.passed,
      message: result.passed
        ? "Quick check passed. This lesson is now complete."
        : `Score ${result.score}%. Review and try again.`,
      feedback: result.feedback.map((item) => ({
        questionId: item.questionId,
        correct: item.correct,
        explanation: item.explanation,
      })),
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not grade this quick check.",
    };
  }
}
