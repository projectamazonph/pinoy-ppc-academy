export const learningPath = [
  ["01", "VA Career Starter", "Explain what remote clients expect and complete a clear work brief.", "FREE"],
  ["02", "Amazon Foundations", "Read catalog, listing, offer, and operations signals that affect advertising.", "CORE"],
  ["03", "PPC Operator", "Build and maintain Sponsored Products campaigns using safe operating rules.", "CORE"],
  ["04", "PPC Strategist", "Diagnose performance, prioritize changes, and explain trade-offs.", "ADVANCED"],
  ["05", "Client-Ready Specialist", "Present recommendations, defend decisions, and submit a timed capstone.", "CAPSTONE"],
] as const;

export const practiceTools = [
  ["LAB-01", "PPC Metrics Lab", "Calculate CPC, CTR, CVR, ACoS, ROAS, TACoS, and a safe max bid."],
  ["LAB-02", "Search Term Triage", "Choose observe, harvest, negate, reduce, raise, or pause from evidence."],
  ["LAB-03", "Campaign Builder", "Turn a product and keyword set into a controlled SP, SB, or SD structure."],
  ["LAB-04", "Diagnostic Case Room", "Find whether the real issue is inventory, offer, listing, traffic, or PPC."],
  ["LAB-05", "Reporting Studio", "Turn performance data into a client-ready result, cause, action, and risk summary."],
] as const;

export const tiers = [
  { slug: "va-career-starter", name: "VA Career Starter", price: "Free", note: "4 modules · 3 missions", features: ["Remote-work readiness", "Amazon role map", "Sample PPC lesson", "Readiness score"], featured: false },
  { slug: "ppc-foundations", name: "PPC Foundations", price: "₱2,999", note: "8 modules · 12 missions", features: ["Amazon ads foundations", "Campaign Builder", "Search Term Triage", "Verified certificate"], featured: false },
  { slug: "accelerated-mastery", name: "Accelerated Mastery", price: "₱5,999", note: "14 modules · 28 missions", features: ["SP, SB, and SD", "All launch simulators", "Portfolio evidence", "Advanced diagnostics"], featured: true },
  { slug: "ultimate-transformation", name: "Ultimate Transformation", price: "₱9,999", note: "Everything plus review", features: ["Live classes", "Portfolio review", "Interview lab", "Priority certificate review"], featured: false },
] as const;
