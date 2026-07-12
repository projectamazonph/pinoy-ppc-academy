# Build Log: PPC Foundations and TACoS Lab

**Milestone:** v0.7.0
**State:** VERIFIED

## Delivered

- Seven-module protected PPC Foundations route.
- Access gate requiring all six Amazon Foundations modules.
- Ordered lesson prerequisites and persistent completion.
- Advertising economics with CPC, CTR, CVR, ACoS, ROAS, and break-even context.
- Dedicated TACoS and Business Health lesson.
- Interactive two-scenario TACoS calculator.
- Sponsored Products, Sponsored Brands, and Sponsored Display foundations.
- Automatic, keyword, product, category, and audience targeting.
- Exact, phrase, and broad match-type control.
- Bid strategy, placement, budget, pacing, inventory, and account-cap guardrails.
- Search-term harvest, hold, negative exact, and negative phrase logic.
- Dashboard, course catalog, and learner navigation integration.

## TDD loop

1. Wrote failing TACoS calculation, curriculum, access, order, and service tests.
2. Added the deterministic TACoS domain and validation rules.
3. Added seven source-of-truth modules with versioned quick checks.
4. Added the PPC Foundations service and Amazon-completion access gate.
5. Added the interactive TACoS calculator and component tests.
6. Wired protected course, lesson, quiz action, catalog, dashboard, and navigation routes.
7. Fixed typed-route integration at the Next.js boundary.
8. Ran product guards, TypeScript, ESLint, 55 tests, production build, and authenticated runtime smoke checks.

## Verification evidence

- No-AI dependency guard passed.
- Content-trust guard passed.
- TypeScript passed.
- ESLint passed.
- 55 tests passed across 24 test files.
- Production Next.js build passed.
- A learner with five of six Amazon modules saw the PPC route locked.
- A learner with six of six Amazon modules opened the PPC course and Module 1.
- PPC Module 3 remained locked without earlier PPC completions.
- The TACoS calculator rendered and explained same-ACoS, different-TACoS scenarios.
- Correct answer identifiers were absent from rendered browser HTML.

## Remaining

- Campaign Operator simulator and guided campaign build.
- PostgreSQL production adapter.
- Integrated PPC Foundations skills gate.
- Payments, administration, portfolio review, certificates, and production deployment.
