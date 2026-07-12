"use client";

import type {Route} from "next";
import Link from "next/link";
import {useActionState} from "react";
import type {ReadinessActionState} from "@/app/actions/readiness-state";

type Action = (state: ReadinessActionState, form: FormData) => Promise<ReadinessActionState>;

export function ReadinessPlanner({
  action,
  initialState,
}: {
  action: Action;
  initialState: ReadinessActionState;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const result = state.status === "result" ? state.result : null;
  const previous = result?.input;

  function downloadPlan() {
    if (state.status !== "result") return;
    const blob = new Blob([state.plan], {type: "text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "pinoy-ppc-academy-readiness-plan.txt";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="readiness-workspace">
      <form action={formAction} className="readiness-form">
        <section>
          <p className="eyebrow">01 / Work setup</p>
          <h2>Can you work reliably and safely?</h2>
          <div className="readiness-checks">
            <label><input type="checkbox" name="deviceReady" defaultChecked={previous?.deviceReady}/>Reliable computer ready</label>
            <label><input type="checkbox" name="internetReady" defaultChecked={previous?.internetReady}/>Primary internet ready</label>
            <label><input type="checkbox" name="backupReady" defaultChecked={previous?.backupReady}/>Power and internet backup plan ready</label>
            <label><input type="checkbox" name="secureAccessReady" defaultChecked={previous?.secureAccessReady}/>Password manager and two-factor authentication ready</label>
          </div>
        </section>

        <section>
          <p className="eyebrow">02 / Current confidence</p>
          <h2>Rate what you can do today.</h2>
          <div className="readiness-fields two-column">
            <label>Digital work skills
              <select name="digitalSkills" defaultValue={previous?.digitalSkills ?? 3}>
                {[1,2,3,4,5].map(value=><option value={value} key={value}>{value} / 5</option>)}
              </select>
            </label>
            <label>Client communication
              <select name="communicationSkills" defaultValue={previous?.communicationSkills ?? 3}>
                {[1,2,3,4,5].map(value=><option value={value} key={value}>{value} / 5</option>)}
              </select>
            </label>
            <label>Study hours available each week
              <input type="number" name="weeklyStudyHours" min={1} max={40} required defaultValue={previous?.weeklyStudyHours ?? 7}/>
            </label>
          </div>
        </section>

        <section>
          <p className="eyebrow">03 / Career-shift evidence</p>
          <h2>Connect your old work to your next role.</h2>
          <div className="readiness-fields">
            <label>Previous or current role
              <input name="previousRole" minLength={2} required defaultValue={previous?.previousRole} placeholder="Example: Customer service representative"/>
            </label>
            <label>Strongest transferable skill
              <input name="transferableSkill" minLength={2} required defaultValue={previous?.transferableSkill} placeholder="Example: Clear written communication"/>
            </label>
          </div>
          <fieldset className="interest-fieldset">
            <legend>How interested are you in Amazon work?</legend>
            {(["high","medium","low"] as const).map(value=><label key={value}><input type="radio" name="amazonInterest" value={value} required defaultChecked={(previous?.amazonInterest ?? "high")===value}/><span>{value.charAt(0).toUpperCase()+value.slice(1)}</span></label>)}
          </fieldset>
        </section>

        {state.status === "error" && <p className="form-error" role="alert">{state.message}</p>}
        <button className="btn btn-primary btn-large" disabled={pending}>{pending ? "Calculating and saving…" : "Build my readiness plan"}</button>
      </form>

      <aside className="readiness-result" aria-live="polite">
        {result ? <>
          <span className="mono">SAVED RECOMMENDATION</span>
          <strong className="readiness-score">{result.score}<small>/100</small></strong>
          <p className="eyebrow">{result.route.replaceAll("-"," ")}</p>
          <h2>{result.title}</h2>
          <p>{result.summary}</p>
          <ol>{result.actions.map(action=><li key={action}>{action}</li>)}</ol>
          <button type="button" className="btn btn-secondary" onClick={downloadPlan}>Download my plan</button>
          {result.route === "amazon-foundations" && <Link className="text-link readiness-next-link" href={"/app/courses/amazon-foundations" as Route}>Open Amazon Foundations →</Link>}
          <small>Saved {new Date(result.createdAt).toLocaleDateString("en-PH",{dateStyle:"medium"})}</small>
        </> : <>
          <span className="mono">WHAT YOU GET</span>
          <h2>A clear next route.</h2>
          <p>Your result uses visible rules. It does not use AI, hidden personality scoring, or invented job promises.</p>
          <ul>
            <li>A 0–100 readiness score</li>
            <li>One recommended route</li>
            <li>Three immediate actions</li>
            <li>A downloadable text plan</li>
          </ul>
        </>}
      </aside>
    </div>
  );
}
