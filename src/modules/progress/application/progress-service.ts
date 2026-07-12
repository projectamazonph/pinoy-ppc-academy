import {
  STARTER_COURSE_SLUG,
  STARTER_LESSONS,
  type ProgressRepository,
} from "../domain/progress";

export interface OrderedLesson {
  id: string;
}

export class ProgressService {
  constructor(
    private readonly repository: ProgressRepository,
    private readonly now = () => new Date(),
  ) {}

  async getCourseSummary(
    userId: string,
    courseSlug: string,
    lessons: readonly OrderedLesson[],
  ) {
    if (lessons.length === 0) throw new Error("Course must contain at least one lesson");
    const records = await this.repository.listCompletedLessons(userId, courseSlug);
    const valid = new Set(lessons.map((lesson) => lesson.id));
    const completedLessonIds = [
      ...new Set(records.map((record) => record.lessonId).filter((id) => valid.has(id))),
    ];
    return {
      completedLessons: completedLessonIds.length,
      totalLessons: lessons.length,
      percentage: Math.round((completedLessonIds.length / lessons.length) * 100),
      completedLessonIds,
    };
  }

  async completeCourseLesson(
    userId: string,
    courseSlug: string,
    lessons: readonly OrderedLesson[],
    lessonId: string,
  ) {
    const index = lessons.findIndex((lesson) => lesson.id === lessonId);
    if (index < 0) throw new Error("Unknown lesson identifier");
    const done = new Set(
      (await this.repository.listCompletedLessons(userId, courseSlug)).map(
        (record) => record.lessonId,
      ),
    );
    if (lessons.slice(0, index).some((lesson) => !done.has(lesson.id))) {
      throw new Error("Complete the previous lesson before continuing");
    }
    await this.repository.completeLesson({
      userId,
      courseSlug,
      lessonId,
      completedAt: this.now(),
    });
  }

  getStarterSummary(userId: string) {
    return this.getCourseSummary(userId, STARTER_COURSE_SLUG, STARTER_LESSONS);
  }

  completeStarterLesson(userId: string, lessonId: string) {
    return this.completeCourseLesson(
      userId,
      STARTER_COURSE_SLUG,
      STARTER_LESSONS,
      lessonId,
    );
  }
}
