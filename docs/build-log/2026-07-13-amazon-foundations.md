# Build Log: Amazon Foundations

**Milestone:** v0.6.0  
**State:** VERIFIED

## Delivered

- Generic ordered progress support across multiple courses.
- Protected course catalog at `/app/courses`.
- Six-module Amazon Foundations route.
- Readiness-result access gate.
- Marketplace Basics, Listing Anatomy, Offer Readiness, Business Metrics, Advertising Interface, and Reporting Basics.
- Diagnostic framework introduced before bid changes.
- Versioned deterministic quick checks and persistent completion.
- Dashboard progression from starter route to readiness to Amazon Foundations.

## TDD loop

1. Wrote failing generic-progress, content, and service tests.
2. Generalized course progress without breaking starter-route wrappers.
3. Added six source-of-truth modules and quick checks.
4. Added readiness access and ordered completion service rules.
5. Wired catalog, course, lesson, dashboard, and assessment actions.
6. Fixed typed-route and lint integration failures.
7. Ran full guards, tests, production build, and authenticated route smoke checks.

## Verification evidence

- No-AI dependency guard passed.
- Content-trust guard passed.
- TypeScript passed.
- ESLint passed.
- 44 tests passed across 20 test files.
- Production Next.js build passed.
- Core-skills learner saw the locked course state.
- Amazon-ready learner opened the course and Module 1.
- Module 3 remained locked without earlier completions.
- Correct answer identifiers were absent from rendered browser HTML.

## Remaining

- PostgreSQL production adapter.
- PPC Foundations, including the dedicated TACoS lesson and calculator.
- Rich guided exercises for listing, object mapping, and break-even ACoS.
- Commerce, administration, proof-of-skill, and certification.
