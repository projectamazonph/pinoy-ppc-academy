import type {Route} from "next";
import Link from "next/link";
import {requireCurrentUser} from "@/lib/server/auth";
import {getAmazonFoundationsService} from "@/modules/amazon-foundations/application/runtime";
import {getPpcFoundationsService} from "@/modules/ppc-foundations/application/runtime";
import {getPracticeAttemptService} from "@/modules/practice/infrastructure/practice-runtime";
import {getProgressService} from "@/modules/progress/infrastructure/progress-runtime";
import {getReadinessService} from "@/modules/readiness/infrastructure/readiness-runtime";

export default async function CoursesPage() {
  const user = await requireCurrentUser();
  const [starter, readiness, foundations, amazonAccess, ppc, ppcAccess, attempts] = await Promise.all([
    getProgressService().getStarterSummary(user.id),
    getReadinessService().getLatest(user.id),
    getAmazonFoundationsService().getSummary(user.id),
    getAmazonFoundationsService().getAccess(user.id),
    getPpcFoundationsService().getSummary(user.id),
    getPpcFoundationsService().getAccess(user.id),
    getPracticeAttemptService().getSummary(user.id),
  ]);

  const readinessUnlocked = starter.completedLessons === starter.totalLessons;
  const campaignBuilderBest=attempts.bestScores["campaign-builder"]??0;
  return (
    <div className="app-page">
      <header className="app-page-head">
        <div>
          <p className="eyebrow">LEARNING ROUTES</p>
          <h1>Build capability in the right order.</h1>
          <p>Career foundations first, Amazon operations next, then advertising.</p>
        </div>
        <span className="lab-status">ORDERED PATH</span>
      </header>
      <section className="course-catalog">
        <article data-status={starter.percentage === 100 ? "complete" : "active"}>
          <span className="mono">ROUTE 01 / FREE</span>
          <h2>VA Career Starter</h2>
          <p>Remote-work reality, setup, digital execution, communication, safety, and career-shift evidence.</p>
          <div><strong>{starter.percentage}%</strong><span>{starter.completedLessons} / {starter.totalLessons} modules</span></div>
          <Link className="btn btn-primary" href="/app/courses/va-career-starter">{starter.percentage === 100 ? "Review starter route" : "Continue starter route"}</Link>
        </article>

        <article data-status={readiness ? "complete" : readinessUnlocked ? "active" : "locked"}>
          <span className="mono">ROUTE 01 / FINAL OUTPUT</span>
          <h2>VA Career Readiness Plan</h2>
          <p>Turn setup, confidence, interest, and transferable experience into one saved next-step plan.</p>
          <div><strong>{readiness ? readiness.score : readinessUnlocked ? "READY" : "LOCKED"}</strong><span>{readiness ? readiness.title : "Complete all starter modules"}</span></div>
          {readinessUnlocked ? <Link className="btn btn-secondary" href={"/app/readiness" as Route}>{readiness ? "Review readiness plan" : "Build readiness plan"}</Link> : <span className="catalog-lock">Finish Route 01</span>}
        </article>

        <article data-status={amazonAccess.allowed ? foundations.percentage === 100 ? "complete" : "active" : "locked"}>
          <span className="mono">ROUTE 02 / AMAZON</span>
          <h2>Amazon Foundations</h2>
          <p>Marketplace objects, listings, offer readiness, business metrics, advertising hierarchy, and reporting.</p>
          <div><strong>{amazonAccess.allowed ? `${foundations.percentage}%` : "LOCKED"}</strong><span>{amazonAccess.allowed ? `${foundations.completedLessons} / ${foundations.totalLessons} modules` : amazonAccess.reason}</span></div>
          <Link className={amazonAccess.allowed ? "btn btn-primary" : "btn btn-secondary"} href={"/app/courses/amazon-foundations" as Route}>{amazonAccess.allowed ? foundations.completedLessons ? "Continue Amazon Foundations" : "Start Amazon Foundations" : "View requirements"}</Link>
        </article>

        <article data-status={ppcAccess.allowed ? ppc.percentage === 100 ? "complete" : "active" : "locked"}>
          <span className="mono">ROUTE 03 / PPC</span>
          <h2>PPC Foundations</h2>
          <p>Advertising economics, TACoS, SP, SB, SD, targeting, bids, budgets, placements, and search-term logic.</p>
          <div><strong>{ppcAccess.allowed ? `${ppc.percentage}%` : "LOCKED"}</strong><span>{ppcAccess.allowed ? `${ppc.completedLessons} / ${ppc.totalLessons} modules` : ppcAccess.reason}</span></div>
          <Link className={ppcAccess.allowed ? "btn btn-primary" : "btn btn-secondary"} href={"/app/courses/ppc-foundations" as Route}>{ppcAccess.allowed ? ppc.completedLessons ? "Continue PPC Foundations" : "Start PPC Foundations" : "View requirements"}</Link>
        </article>

        <article data-status={ppc.percentage===100 ? campaignBuilderBest>=80 ? "complete" : "active" : "locked"}>
          <span className="mono">ROUTE 04 / OPERATOR LAB</span>
          <h2>Campaign Builder</h2>
          <p>Build a relationship-safe Sponsored Products research campaign, validate the object hierarchy, and export an auditable structure artifact.</p>
          <div><strong>{ppc.percentage===100 ? `${campaignBuilderBest}` : "LOCKED"}</strong><span>{ppc.percentage===100 ? "Best campaign-build score" : "Complete PPC Foundations first"}</span></div>
          <Link className={ppc.percentage===100 ? "btn btn-primary" : "btn btn-secondary"} href={"/app/practice/campaign-builder" as Route}>{ppc.percentage===100 ? "Open Campaign Builder" : "View requirements"}</Link>
        </article>
      </section>
    </div>
  );
}
