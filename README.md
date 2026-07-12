# Pinoy PPC Academy

Career-first Amazon PPC training for Filipinos starting or shifting into virtual assistant work.

## Verified milestone: v0.8.0

- ProjectAmazonPH-branded public landing page
- Secure local account creation and sign-in
- Scrypt password hashing with random salts
- Server-side, expiring, revocable sessions
- Protected learner routes
- Eight-module VA Career Starter curriculum
- Versioned deterministic quick checks
- Lesson completion only after a passing score
- Ordered lesson prerequisites
- Persistent lesson, quiz, and Search Term Triage attempts
- Working PPC Metrics and Search Term Triage labs
- Deterministic VA Career Readiness planner with four transparent routes
- Saved readiness history and downloadable text plan
- Readiness access only after all eight starter modules pass
- Six-module Amazon Foundations route with ordered prerequisites
- Marketplace, listing, offer, margin, interface, and reporting lessons
- Diagnostic framework taught before bid changes
- Course catalog and dashboard route progression
- Seven-module PPC Foundations route with ordered prerequisites
- Dedicated TACoS business-health lesson and interactive two-scenario calculator
- Sponsored Products, Sponsored Brands, and Sponsored Display foundations
- Targeting, match types, bid, placement, budget, pacing, and search-term guardrails
- Down-only research baseline and hold-as-valid-decision operating rules
- Protected Sponsored Products Campaign Builder operator lab
- Seven-part campaign naming, object-relationship, budget-cap, and safety validation
- Deterministic five-dimension campaign grading with persistent versioned attempts
- Downloadable campaign structure and change-note artifact
- No AI dependencies or AI grading

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Verify

```bash
npm run verify
```

Local persistence uses `.data/academy.sqlite`. SQLite is a development adapter only; PostgreSQL remains required before staging or production.
