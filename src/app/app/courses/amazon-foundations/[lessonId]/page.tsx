import type {Route} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {submitAmazonFoundationsQuizAction} from "@/app/actions/amazon-foundations";
import {StarterQuiz} from "@/components/curriculum/StarterQuiz";
import {requireCurrentUser} from "@/lib/server/auth";
import {getAmazonFoundationsService} from "@/modules/amazon-foundations/application/runtime";
import {AMAZON_FOUNDATIONS_MODULES,getAmazonFoundationsModule} from "@/modules/amazon-foundations/domain/content";

export default async function AmazonFoundationLessonPage({params}:{params:Promise<{lessonId:string}>}) {
  const {lessonId}=await params;
  const lesson=getAmazonFoundationsModule(lessonId);
  if(!lesson)notFound();
  const user=await requireCurrentUser();
  const [access,progress]=await Promise.all([
    getAmazonFoundationsService().getAccess(user.id),
    getAmazonFoundationsService().getSummary(user.id),
  ]);
  if(!access.allowed){
    return <div className="app-page lesson-page"><Link className="lesson-back" href={"/app/courses/amazon-foundations" as Route}>← Back to course</Link><section className="locked-lesson"><p className="eyebrow">ROUTE LOCKED</p><h1>{lesson.title}</h1><p>{access.reason}</p><Link className="btn btn-primary" href={"/app/readiness" as Route}>Open readiness plan</Link></section></div>;
  }
  const done=new Set(progress.completedLessonIds);
  const index=AMAZON_FOUNDATIONS_MODULES.findIndex(module=>module.id===lessonId);
  const locked=AMAZON_FOUNDATIONS_MODULES.slice(0,index).some(module=>!done.has(module.id));
  const previous=AMAZON_FOUNDATIONS_MODULES[index-1];
  const next=AMAZON_FOUNDATIONS_MODULES[index+1];
  if(locked){
    return <div className="app-page lesson-page"><Link className="lesson-back" href={"/app/courses/amazon-foundations" as Route}>← Back to course</Link><section className="locked-lesson"><p className="eyebrow">MODULE LOCKED</p><h1>{lesson.title}</h1><p>Complete the previous module and pass its quick check first.</p>{previous&&<Link className="btn btn-primary" href={`/app/courses/amazon-foundations/${previous.id}` as Route}>Go to previous lesson</Link>}</section></div>;
  }
  const quiz={lessonId:lesson.id,version:lesson.quickCheck.version,passPercent:lesson.quickCheck.passPercent,questions:lesson.quickCheck.questions.map(({id,prompt,choices})=>({id,prompt,choices}))};
  return <div className="app-page lesson-page"><Link className="lesson-back" href={"/app/courses/amazon-foundations" as Route}>← Back to course</Link><header className="lesson-hero amazon-lesson-hero"><div><p className="eyebrow light">AMAZON FOUNDATIONS / MODULE {String(index+1).padStart(2,"0")}</p><h1>{lesson.title}</h1><p>{lesson.summary}</p></div><aside><span className="mono">EVIDENCE</span><strong>{lesson.evidence}</strong><small>{done.has(lesson.id)?"Completed":"Pass the quick check"}</small></aside></header><div className="lesson-layout"><article className="lesson-content"><section className="lesson-outcomes"><p className="eyebrow">What you will be able to do</p><ul>{lesson.outcomes.map(outcome=><li key={outcome}>{outcome}</li>)}</ul></section>{lesson.sections.map((section,sectionIndex)=><section key={section.title} className="lesson-section"><span className="lesson-section-number">{String(sectionIndex+1).padStart(2,"0")}</span><div><h2>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.checklist&&<ul className="lesson-checklist">{section.checklist.map(item=><li key={item}>{item}</li>)}</ul>}</div></section>)}<StarterQuiz quiz={quiz} action={submitAmazonFoundationsQuizAction} completed={done.has(lesson.id)}/><nav className="lesson-navigation">{previous?<Link href={`/app/courses/amazon-foundations/${previous.id}` as Route}>← {previous.title}</Link>:<span/>}{next&&done.has(lesson.id)?<Link href={`/app/courses/amazon-foundations/${next.id}` as Route}>{next.title} →</Link>:<Link href={"/app/courses/amazon-foundations" as Route}>Course overview →</Link>}</nav></article><aside className="lesson-progress-rail"><span className="mono">AMAZON FOUNDATIONS</span><strong>{progress.percentage}%</strong><p>{progress.completedLessons} of {progress.totalLessons} modules complete.</p><ol>{AMAZON_FOUNDATIONS_MODULES.map((module,moduleIndex)=><li key={module.id} data-current={module.id===lesson.id||undefined} data-complete={done.has(module.id)||undefined}><span>{String(moduleIndex+1).padStart(2,"0")}</span>{module.title}</li>)}</ol></aside></div></div>;
}
