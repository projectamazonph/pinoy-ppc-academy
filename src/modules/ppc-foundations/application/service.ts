import {QuizService} from "@/modules/assessment/application/quiz-service";
import type {QuizResult} from "@/modules/assessment/domain/assessment";
import {AMAZON_FOUNDATIONS_MODULES,AMAZON_FOUNDATIONS_SLUG} from "@/modules/amazon-foundations/domain/content";
import {ProgressService} from "@/modules/progress/application/progress-service";
import {PPC_FOUNDATIONS_MODULES,PPC_FOUNDATIONS_SLUG,getPpcFoundationsModule} from "../domain/content";

export class PpcFoundationsService {
  constructor(private readonly quizzes:QuizService,private readonly progress:ProgressService){}

  async getAccess(userId:string){
    const amazon=await this.progress.getCourseSummary(userId,AMAZON_FOUNDATIONS_SLUG,AMAZON_FOUNDATIONS_MODULES);
    return amazon.completedLessons===amazon.totalLessons
      ? {allowed:true as const,reason:null,amazon}
      : {allowed:false as const,reason:"Complete all six Amazon Foundations modules first.",amazon};
  }

  getSummary(userId:string){return this.progress.getCourseSummary(userId,PPC_FOUNDATIONS_SLUG,PPC_FOUNDATIONS_MODULES)}

  async submitQuickCheck(input:{userId:string;lessonId:string;answers:Record<string,string>}):Promise<QuizResult>{
    const access=await this.getAccess(input.userId);
    if(!access.allowed)throw new Error(`Amazon Foundations required. ${access.reason}`);
    const lesson=getPpcFoundationsModule(input.lessonId);
    if(!lesson)throw new Error("Unknown lesson identifier");
    const index=PPC_FOUNDATIONS_MODULES.findIndex(item=>item.id===lesson.id);
    const done=new Set((await this.getSummary(input.userId)).completedLessonIds);
    if(PPC_FOUNDATIONS_MODULES.slice(0,index).some(item=>!done.has(item.id)))throw new Error("Complete the previous lesson before continuing");
    const result=await this.quizzes.submit({userId:input.userId,quiz:lesson.quickCheck,answers:input.answers});
    if(result.passed)await this.progress.completeCourseLesson(input.userId,PPC_FOUNDATIONS_SLUG,PPC_FOUNDATIONS_MODULES,lesson.id);
    return result;
  }
}
