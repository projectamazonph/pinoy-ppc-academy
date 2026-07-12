export type AmazonInterest = "high" | "medium" | "low";
export type ReadinessRoute =
  | "setup-first"
  | "core-skills"
  | "amazon-foundations"
  | "explore-va-roles";

export interface ReadinessInput {
  deviceReady: boolean;
  internetReady: boolean;
  backupReady: boolean;
  secureAccessReady: boolean;
  digitalSkills: number;
  communicationSkills: number;
  weeklyStudyHours: number;
  amazonInterest: AmazonInterest;
  previousRole: string;
  transferableSkill: string;
}

export interface ReadinessRecommendation {
  score: number;
  route: ReadinessRoute;
  title: string;
  summary: string;
  actions: [string, string, string];
}

export interface ReadinessAssessmentRecord extends ReadinessRecommendation {
  id: string;
  userId: string;
  input: ReadinessInput;
  createdAt: Date;
}

export interface ReadinessRepository {
  save(record: ReadinessAssessmentRecord): Promise<void>;
  listForUser(userId: string): Promise<ReadinessAssessmentRecord[]>;
  getLatestForUser(userId: string): Promise<ReadinessAssessmentRecord | null>;
}

function requireScale(name: string, value: number, min: number, max: number) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${name} must be between ${min} and ${max}.`);
  }
}

function requireText(name: string, value: string) {
  if (value.trim().length < 2) {
    throw new Error(`${name} must contain at least 2 characters.`);
  }
}

function calculateScore(input: ReadinessInput) {
  const setup = [
    input.deviceReady,
    input.internetReady,
    input.backupReady,
    input.secureAccessReady,
  ].filter(Boolean).length * 10;
  const digital = Math.round((input.digitalSkills / 5) * 25);
  const communication = Math.round((input.communicationSkills / 5) * 20);
  const study =
    input.weeklyStudyHours >= 10
      ? 15
      : input.weeklyStudyHours >= 7
        ? 12
        : input.weeklyStudyHours >= 5
          ? 9
          : input.weeklyStudyHours >= 3
            ? 6
            : 3;
  return Math.min(100, setup + digital + communication + study);
}

export function buildReadinessRecommendation(
  rawInput: ReadinessInput,
): ReadinessRecommendation {
  const input: ReadinessInput = {
    ...rawInput,
    previousRole: rawInput.previousRole.trim(),
    transferableSkill: rawInput.transferableSkill.trim(),
  };

  requireScale("Digital skills", input.digitalSkills, 1, 5);
  requireScale("Communication skills", input.communicationSkills, 1, 5);
  requireScale("Weekly study hours", input.weeklyStudyHours, 1, 40);
  requireText("Previous role", input.previousRole);
  requireText("Transferable skill", input.transferableSkill);

  const score = calculateScore(input);
  const setupGaps = [
    !input.deviceReady && "Confirm a reliable computer that can handle browser-based client work.",
    !input.internetReady && "Stabilize your primary internet connection before accepting client deadlines.",
    !input.backupReady && "Create a written backup plan for power and internet interruptions.",
    !input.secureAccessReady && "Set up a password manager, two-factor authentication, and a private work profile.",
  ].filter((value): value is string => Boolean(value));

  if (setupGaps.length > 0) {
    const actions = [
      ...setupGaps,
      "Test your complete setup during a two-hour practice work block.",
      "Record your backup contacts, locations, and recovery steps in one checklist.",
    ].slice(0, 3) as [string, string, string];
    return {
      score,
      route: "setup-first",
      title: "Fix your work setup first",
      summary:
        "Your next best move is to remove reliability and security risks before you market yourself to clients.",
      actions,
    };
  }

  if (input.digitalSkills <= 2 || input.communicationSkills <= 2) {
    return {
      score,
      route: "core-skills",
      title: "Strengthen your core VA skills",
      summary:
        "Your setup is ready, but everyday digital work or client communication still needs deliberate practice.",
      actions: [
        "Complete three timed file, spreadsheet, and browser-research drills.",
        "Write and revise five client updates using clear status, blocker, and next-step language.",
        "Build one small work sample that proves accuracy, organization, and follow-through.",
      ],
    };
  }

  if (input.amazonInterest === "high" || input.amazonInterest === "medium") {
    return {
      score,
      route: "amazon-foundations",
      title: "Continue to Amazon Foundations",
      summary:
        "Your baseline is strong enough to begin learning Amazon operations before moving into PPC campaign work.",
      actions: [
        "Learn the Amazon catalog, listing, inventory, and advertising vocabulary.",
        "Complete the Amazon Foundations exercises before opening advanced PPC simulations.",
        "Turn your transferable skill into one portfolio example for an Amazon client scenario.",
      ],
    };
  }

  return {
    score,
    route: "explore-va-roles",
    title: "Explore other VA specializations",
    summary:
      "You have a workable VA foundation, but Amazon is not your strongest interest right now. Compare roles before committing to a specialization.",
    actions: [
      "Compare three VA specializations against your existing experience and preferred work style.",
      "Complete one small sample task for each shortlisted specialization.",
      "Choose the path where your interest, evidence, and available client demand overlap.",
    ],
  };
}

export function buildReadinessPlan(record: ReadinessAssessmentRecord) {
  const checks = [
    ["Computer ready", record.input.deviceReady],
    ["Primary internet ready", record.input.internetReady],
    ["Backup plan ready", record.input.backupReady],
    ["Secure access ready", record.input.secureAccessReady],
  ] as const;

  return [
    "Pinoy PPC Academy — VA Career Readiness Plan",
    "================================================",
    `Created: ${record.createdAt.toISOString().slice(0, 10)}`,
    `Readiness score: ${record.score}/100`,
    "",
    `Recommended route: ${record.title}`,
    record.summary,
    "",
    "Career-shift evidence",
    `Previous role: ${record.input.previousRole}`,
    `Transferable skill: ${record.input.transferableSkill}`,
    `Digital skills confidence: ${record.input.digitalSkills}/5`,
    `Communication confidence: ${record.input.communicationSkills}/5`,
    `Weekly study time: ${record.input.weeklyStudyHours} hours`,
    "",
    "Work setup",
    ...checks.map(([label, ready]) => `- ${label}: ${ready ? "Ready" : "Needs work"}`),
    "",
    "Next actions",
    ...record.actions.map((action, index) => `${index + 1}. ${action}`),
    "",
    "Proof to prepare",
    "- Save screenshots, checklists, and completed practice work.",
    "- Write one short note explaining what you did and why.",
    "- Keep client information fictional or fully anonymized.",
  ].join("\n");
}
