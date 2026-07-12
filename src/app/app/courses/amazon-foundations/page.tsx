import type {Route} from "next";
import Link from "next/link";
import {requireCurrentUser} from "@/lib/server/auth";
import {getAmazonFoundationsService} from "@/modules/amazon-foundations/application/runtime";
import {AMAZON_FOUNDATIONS_MODULES} from "@/modules/amazon-foundations/domain/content";

export default async function AmazonFoundationsPage() {
  const user = await requireCurrentUser();
  const [access, progress] = await Promise.all([
    getAmazonFoundationsService().getAccess(user.id),
    getAmazonFoundationsService().getSummary(user.id),
  ]);

  if (!access.allowed) {
    return (
      <div className="app-page">
        <Link className="lesson-back" href={"/app/courses" as Route}>← Back to learning routes</Link>
        <section className="locked-lesson">
          <p className="eyebrow">AMAZON FOUNDATIONS / LOCKED</p>
          <h1>Complete the recommended preparation first.</h1>
          <p>{access.reason}</p>
          <Link className="btn btn-primary" href={"/app/readiness" as Route}>Open readiness plan</Link>
        </section>
      </div>
    );
  }

  const done = new Set(progress.completedLessonIds);
  return (
    <div className="app-page">
      <Link className="lesson-back" href={"/app/courses" as Route}>← Back to learning routes</Link>
      <header className="course-hero amazon-course-hero">
        <p className="eyebrow light">ROUTE 02 / AMAZON FOUNDATIONS</p>
        <h1>Understand the business before touching the ads.</h1>
        <p>Learn how listings, offers, inventory, price, margin, account objects, and reports shape advertising performance.</p>
        <div><span>{progress.totalLessons} modules</span><span>{progress.completedLessons} complete</span><span>{progress.percentage}% progress</span></div>
      </header>
      <section className="diagnostic-banner">
        <span className="mono">DIAGNOSTIC FOUNDATION</span>
        <strong>Is this an advertising problem, a listing problem, an inventory or price problem, or a structure problem?</strong>
        <p>Classify the category before changing bids.</p>
      </section>
      <section className="module-list">
        <h2>Course modules</h2>
        {AMAZON_FOUNDATIONS_MODULES.map((module,index)=>{
          const complete=done.has(module.id);
          const open=index===0||AMAZON_FOUNDATIONS_MODULES.slice(0,index).every(item=>done.has(item.id));
          return <article key={module.id}>
            <span>{String(index+1).padStart(2,"0")}</span>
            <div><small>{complete?"COMPLETED":open?"READY":"LOCKED"}</small><h3>{module.title}</h3><p>{module.summary}</p><em>{module.evidence}</em></div>
            {open?<Link className={complete?"btn btn-secondary":"btn btn-primary"} href={`/app/courses/amazon-foundations/${module.id}` as Route}>{complete?"Review lesson":"Open lesson"}</Link>:<b>—</b>}
          </article>;
        })}
      </section>
      {progress.percentage===100&&<section className="course-complete"><p className="eyebrow">AMAZON FOUNDATIONS COMPLETE</p><h2>You can now explain the operating context behind PPC.</h2><p>PPC Foundations is the next planned route. It is not yet represented as available.</p></section>}
    </div>
  );
}
