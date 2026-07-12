// @vitest-environment node
import {describe,expect,it} from "vitest";
import {QuizService} from "@/modules/assessment/application/quiz-service";
import {InMemoryAssessmentRepository} from "@/modules/assessment/infrastructure/in-memory-assessment-repository";
import {ProgressService} from "@/modules/progress/application/progress-service";
import {InMemoryProgressRepository} from "@/modules/progress/infrastructure/in-memory-progress-repository";
import {AMAZON_FOUNDATIONS_MODULES,AMAZON_FOUNDATIONS_SLUG} from "@/modules/amazon-foundations/domain/content";
import {PpcFoundationsService} from "./service";

async function serviceWithAmazonProgress(completed:number){
  const repository=new InMemoryProgressRepository();
  const progress=new ProgressService(repository);
  for(const lesson of AMAZON_FOUNDATIONS_MODULES.slice(0,completed)){
    await progress.completeCourseLesson("u",AMAZON_FOUNDATIONS_SLUG,AMAZON_FOUNDATIONS_MODULES,lesson.id);
  }
  return {service:new PpcFoundationsService(new QuizService(new InMemoryAssessmentRepository()),progress),progress};
}

describe("PpcFoundationsService",()=>{
  it("requires all Amazon Foundations modules",async()=>{
    const {service}=await serviceWithAmazonProgress(5);
    expect((await service.getAccess("u")).allowed).toBe(false);
    await expect(service.submitQuickCheck({userId:"u",lessonId:"ppc-01-advertising-economics",answers:{}})).rejects.toThrow(/Amazon Foundations/i);
  });
  it("completes a passing first lesson",async()=>{
    const {service}=await serviceWithAmazonProgress(6);
    const result=await service.submitQuickCheck({userId:"u",lessonId:"ppc-01-advertising-economics",answers:{"pp01-q1":"a","pp01-q2":"b"}});
    expect(result.passed).toBe(true);
    expect((await service.getSummary("u")).completedLessons).toBe(1);
  });
  it("blocks skipping ahead",async()=>{
    const {service}=await serviceWithAmazonProgress(6);
    await expect(service.submitQuickCheck({userId:"u",lessonId:"ppc-03-campaign-types",answers:{"pp03-q1":"a","pp03-q2":"b"}})).rejects.toThrow(/previous/);
  });
});
