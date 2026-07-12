"use client";

import Link from "next/link";
import { useState } from "react";
import { getLearnerRoute, type Audience } from "@/lib/landing/routes";

const options: Array<{ value: Audience; label: string; note: string }> = [
  { value: "starting", label: "I am starting from zero", note: "No VA experience yet" },
  { value: "shifting", label: "I am shifting from another career", note: "I have transferable experience" },
  { value: "experienced", label: "I already work as a VA or Amazon operator", note: "I want PPC specialization" },
];

export function AudienceSelector() {
  const [selected, setSelected] = useState<Audience>("starting");
  const route = getLearnerRoute(selected);

  return (
    <div className="audience-block">
      <div className="audience-options" role="group" aria-label="Choose your starting point">
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected === option.value}
            data-active={selected === option.value || undefined}
            onClick={() => setSelected(option.value)}
          >
            <span className="mono">0{index + 1}</span>
            <span><strong>{option.label}</strong><small>{option.note}</small></span>
          </button>
        ))}
      </div>
      <article className="route-card" aria-live="polite">
        <p className="eyebrow light">Recommended route</p>
        <h3>{route.title}</h3>
        <p>{route.description}</p>
        <dl>
          <div><dt>First mission</dt><dd>{route.firstMission}</dd></div>
          <div><dt>First proof item</dt><dd>{route.evidence}</dd></div>
        </dl>
        <Link className="btn btn-light" href={`/signup?path=${route.slug}`}>Start this route <span aria-hidden="true">→</span></Link>
      </article>
    </div>
  );
}
