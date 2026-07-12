import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import type {ReadinessActionState} from "@/app/actions/readiness-state";
import {ReadinessPlanner} from "./ReadinessPlanner";

const action = async (state: ReadinessActionState) => state;

const savedState: ReadinessActionState = {
  status: "result",
  plan: "plan",
  result: {
    id: "r1",
    score: 88,
    route: "amazon-foundations",
    title: "Continue to Amazon Foundations",
    summary: "Ready.",
    actions: ["One", "Two", "Three"],
    input: {
      deviceReady: true,
      internetReady: true,
      backupReady: true,
      secureAccessReady: true,
      digitalSkills: 4,
      communicationSkills: 4,
      weeklyStudyHours: 8,
      amazonInterest: "high",
      previousRole: "BPO agent",
      transferableSkill: "Communication",
    },
    createdAt: "2026-07-13T10:00:00.000Z",
  },
};

describe("ReadinessPlanner", () => {
  it("shows the transparent assessment fields", () => {
    render(<ReadinessPlanner action={action} initialState={{status: "idle"}} />);
    expect(screen.getByRole("heading", {name: /work reliably and safely/i})).toBeInTheDocument();
    expect(screen.getByLabelText(/previous or current role/i)).toBeRequired();
    expect(screen.getByRole("button", {name: /build my readiness plan/i})).toBeInTheDocument();
    expect(screen.getByText(/does not use AI/i)).toBeInTheDocument();
  });

  it("renders a saved recommendation and download action", () => {
    render(<ReadinessPlanner action={action} initialState={savedState} />);
    expect(screen.getByText("88")).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Continue to Amazon Foundations"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /download my plan/i})).toBeInTheDocument();
  });
});
