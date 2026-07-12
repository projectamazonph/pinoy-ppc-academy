import type {QuizResult} from "@/modules/assessment/domain/assessment";
import {QuizService} from "@/modules/assessment/application/quiz-service";
import {ProgressService} from "@/modules/progress/application/progress-service";
import type {ReadinessService} from "@/modules/readiness/application/readiness-service";
import {
  AMAZON_FOUNDATIONS_MODULES,
  AMAZON_FOUNDATIONS_SLUG,
  getAmazonFoundationsModule,
} from "../domain/content";

type ReadinessReader = Pick<ReadinessService, "getLatest">;

export class AmazonFoundationsService {
  constructor(
    private readonly quizzes: QuizService,
    private readonly progress: ProgressService,
    private readonly readiness: ReadinessReader,
  ) {}

  async getAccess(userId: string) {
    const result = await this.readiness.getLatest(userId);
    if (!result) {
      return {allowed: false as const, reason: "Build your readiness plan before starting Amazon Foundations.", result: null};
    }
    if (result.route !== "amazon-foundations") {
      return {
        allowed: false as const,
        reason: `Your readiness plan recommends: ${result.title}. Complete those actions and retake the assessment first.`,
        result,
      };
    }
    return {allowed: true as const, reason: null, result};
  }

  getSummary(userId: string) {
    return this.progress.getCourseSummary(
      userId,
      AMAZON_FOUNDATIONS_SLUG,
      AMAZON_FOUNDATIONS_MODULES,
    );
  }

  async submitQuickCheck(input: {
    userId: string;
    lessonId: string;
    answers: Record<string, string>;
  }): Promise<QuizResult> {
    const access = await this.getAccess(input.userId);
    if (!access.allowed) throw new Error(`Readiness plan required. ${access.reason}`);
    const lesson = getAmazonFoundationsModule(input.lessonId);
    if (!lesson) throw new Error("Unknown lesson identifier");
    const index = AMAZON_FOUNDATIONS_MODULES.findIndex(
      (module) => module.id === input.lessonId,
    );
    const done = new Set((await this.getSummary(input.userId)).completedLessonIds);
    if (AMAZON_FOUNDATIONS_MODULES.slice(0, index).some((module) => !done.has(module.id))) {
      throw new Error("Complete the previous lesson before continuing");
    }
    const result = await this.quizzes.submit({
      userId: input.userId,
      quiz: lesson.quickCheck,
      answers: input.answers,
    });
    if (result.passed) {
      await this.progress.completeCourseLesson(
        input.userId,
        AMAZON_FOUNDATIONS_SLUG,
        AMAZON_FOUNDATIONS_MODULES,
        input.lessonId,
      );
    }
    return result;
  }
}
