// @vitest-environment node
import{it,expect}from"vitest";import{ProgressService}from"./progress-service";import{InMemoryProgressRepository}from"../infrastructure/in-memory-progress-repository";it("uses eight ordered modules",async()=>{const s=new ProgressService(new InMemoryProgressRepository());expect((await s.getStarterSummary("u")).totalLessons).toBe(8);await s.completeStarterLesson("u","va-01-work-reality");expect((await s.getStarterSummary("u")).percentage).toBe(13);await expect(s.completeStarterLesson("u","va-03-core-digital-skills")).rejects.toThrow(/previous/) });

it("supports ordered progress for another course",async()=>{
  const service=new ProgressService(new InMemoryProgressRepository());
  const lessons=[{id:"amazon-01"},{id:"amazon-02"},{id:"amazon-03"}];
  expect((await service.getCourseSummary("u","amazon-foundations",lessons)).totalLessons).toBe(3);
  await service.completeCourseLesson("u","amazon-foundations",lessons,"amazon-01");
  await expect(service.completeCourseLesson("u","amazon-foundations",lessons,"amazon-03")).rejects.toThrow(/previous/);
});
