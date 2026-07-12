import Link from "next/link";
import {submitReadinessAction} from "@/app/actions/readiness";
import type {ReadinessActionState} from "@/app/actions/readiness-state";
import {ReadinessPlanner} from "@/components/readiness/ReadinessPlanner";
import {requireCurrentUser} from "@/lib/server/auth";
import {buildReadinessPlan} from "@/modules/readiness/domain/readiness";
import {getReadinessService} from "@/modules/readiness/infrastructure/readiness-runtime";
import {getProgressService} from "@/modules/progress/infrastructure/progress-runtime";

export default async function ReadinessPage() {
  const user = await requireCurrentUser();
  const progress = await getProgressService().getStarterSummary(user.id);

  if (progress.completedLessons < progress.totalLessons) {
    return (
      <div className="app-page readiness-page">
        <section className="readiness-locked">
          <p className="eyebrow">READINESS PLAN / LOCKED</p>
          <h1>Finish the starter route first.</h1>
          <p>
            Your plan should use completed evidence, not guesses. Pass all eight VA Career Starter quick checks to open this assessment.
          </p>
          <div className="readiness-lock-progress">
            <strong>{progress.percentage}%</strong>
            <span>{progress.completedLessons} of {progress.totalLessons} modules complete</span>
          </div>
          <Link className="btn btn-primary" href="/app/courses/va-career-starter">Continue the starter route →</Link>
        </section>
      </div>
    );
  }

  const latest = await getReadinessService().getLatest(user.id);
  const initialState: ReadinessActionState = latest
    ? {
        status: "result",
        result: {
          id: latest.id,
          score: latest.score,
          route: latest.route,
          title: latest.title,
          summary: latest.summary,
          actions: latest.actions,
          input: latest.input,
          createdAt: latest.createdAt.toISOString(),
        },
        plan: buildReadinessPlan(latest),
      }
    : {status: "idle"};

  return (
    <div className="app-page readiness-page">
      <header className="readiness-hero">
        <div>
          <p className="eyebrow light">FREE ROUTE / FINAL OUTPUT</p>
          <h1>Turn your starter work into a practical next plan.</h1>
          <p>
            Check your setup, rate your current skills, connect past experience to VA work, and save one transparent recommendation.
          </p>
        </div>
        <aside>
          <span className="mono">UNLOCKED</span>
          <strong>8 / 8</strong>
          <small>Starter modules complete</small>
        </aside>
      </header>
      <ReadinessPlanner action={submitReadinessAction} initialState={initialState}/>
    </div>
  );
}
