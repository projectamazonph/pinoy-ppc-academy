import type {Route} from "next";
import Link from "next/link";
import {requireCurrentUser} from "@/lib/server/auth";
import {getAmazonFoundationsService} from "@/modules/amazon-foundations/application/runtime";
import {getPpcFoundationsService} from "@/modules/ppc-foundations/application/runtime";
import {getPracticeAttemptService} from "@/modules/practice/infrastructure/practice-runtime";
import {getProgressService} from "@/modules/progress/infrastructure/progress-runtime";
import {getReadinessService} from "@/modules/readiness/infrastructure/readiness-runtime";

export default async function LearnerHome() {
  const user = await requireCurrentUser();
  const [starter, attempts, readiness, foundations, ppc] = await Promise.all([
    getProgressService().getStarterSummary(user.id),
    getPracticeAttemptService().getSummary(user.id),
    getReadinessService().getLatest(user.id),
    getAmazonFoundationsService().getSummary(user.id),
    getPpcFoundationsService().getSummary(user.id),
  ]);

  let current: {eyebrow:string;title:string;description:string;href:Route;progress:string};
  if (starter.completedLessons < starter.totalLessons) {
    current={eyebrow:"CURRENT PATH / ROUTE 01",title:"VA Career Starter",description:`Continue with module ${starter.completedLessons+1}.`,href:"/app/courses/va-career-starter",progress:`${starter.percentage}% complete`};
  } else if (!readiness) {
    current={eyebrow:"CURRENT PATH / FINAL OUTPUT",title:"Build your readiness plan",description:"Turn your completed starter work into one saved next route.",href:"/app/readiness" as Route,progress:"8 / 8 starter modules complete"};
  } else if (readiness.route !== "amazon-foundations") {
    current={eyebrow:"CURRENT PATH / PREPARATION",title:readiness.title,description:"Complete the three saved actions, then retake your readiness assessment.",href:"/app/readiness" as Route,progress:`${readiness.score}/100 readiness score`};
  } else if (foundations.completedLessons < foundations.totalLessons) {
    current={eyebrow:"CURRENT PATH / ROUTE 02",title:"Amazon Foundations",description:`Continue with module ${foundations.completedLessons+1}.`,href:"/app/courses/amazon-foundations" as Route,progress:`${foundations.percentage}% complete`};
  } else if (ppc.completedLessons < ppc.totalLessons) {
    current={eyebrow:"CURRENT PATH / ROUTE 03",title:"PPC Foundations",description:`Continue with module ${ppc.completedLessons+1}.`,href:"/app/courses/ppc-foundations" as Route,progress:`${ppc.percentage}% complete`};
  } else {
    current={eyebrow:"CURRENT PATH / ROUTE 04",title:"Build your first SP campaign",description:"Use the Campaign Builder to create, validate, score, and export a relationship-safe research structure.",href:"/app/practice/campaign-builder" as Route,progress:`Best build score ${attempts.bestScores["campaign-builder"]??0}/100`};
  }

  const amazonAvailable=readiness?.route==="amazon-foundations";
  const ppcAvailable=amazonAvailable&&foundations.completedLessons===foundations.totalLessons;
  const practiceHref=(ppcAvailable?"/app/practice/tacos-calculator":"/app/practice/metrics-lab") as Route;

  return <div className="app-page">
    <header className="app-page-head"><div><p className="eyebrow">Learner home</p><h1>Welcome back, {user.displayName.split(" ")[0]}.</h1><p>Your progress, assessments, and practice attempts save to your account.</p></div><span className="lab-status">PERSISTENT ALPHA</span></header>
    <section className="continue-card"><div><span className="mono">{current.eyebrow}</span><h2>{current.title}</h2><p>{current.description}</p></div><Link className="btn btn-primary" href={current.href}>Continue →</Link></section>
    <div className="dashboard-grid">
      <section><span className="mono">STARTER ROUTE</span><strong>{starter.percentage}%</strong><p>{starter.completedLessons} of {starter.totalLessons} modules complete.</p></section>
      <section><span className="mono">AMAZON FOUNDATIONS</span><strong>{amazonAvailable?`${foundations.percentage}%`:"—"}</strong><p>{amazonAvailable?`${foundations.completedLessons} of ${foundations.totalLessons} modules complete.`:"Requires an Amazon Foundations readiness route."}</p></section>
      <section><span className="mono">PPC FOUNDATIONS</span><strong>{ppcAvailable?`${ppc.percentage}%`:"—"}</strong><p>{ppcAvailable?`${ppc.completedLessons} of ${ppc.totalLessons} modules complete.`:"Requires all Amazon Foundations modules."}</p></section>
      <section><span className="mono">PRACTICE RECORD</span><strong>{attempts.totalAttempts}</strong><p>{attempts.passedAttempts} saved attempts passed.</p></section>
    </div>
    <section className="next-actions"><h2>Recommended next actions</h2>
      <Link href={current.href}><span>01</span><strong>{current.title}</strong><small>{current.progress}</small></Link>
      <Link href={practiceHref}><span>02</span><strong>{ppcAvailable?"Practice: Compare TACoS scenarios":"Practice: Read a PPC row"}</strong><small>Interactive</small></Link>
      <Link href="/app/practice/search-term-triage"><span>03</span><strong>Practice: Make a safe decision</strong><small>{attempts.totalAttempts} attempts saved</small></Link>
    </section>
  </div>;
}
