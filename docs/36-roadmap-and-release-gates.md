# Roadmap and Release Gates

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines the implementation sequence and objective completion conditions.

## Build phases

| Phase | Primary output |
| --- | --- |
| 0. Documentation | Approved product, curriculum, design, architecture, TDD, and release specifications |
| 1. Foundation | Repository, app shell, design tokens, auth, database, CI, observability |
| 2. Public experience | Awesome landing page, curriculum preview, pricing, policies, authentication |
| 3. Career starter | Free onboarding, readiness routing, starter lessons, assessment, dashboard |
| 4. Learning core | Paid curriculum, quizzes, progress, resources, badges |
| 5. Simulation engine | Shared engine plus five simulator families |
| 6. Proof and career | Assessments, capstone, portfolio, certificates, career readiness |
| 7. Commerce and admin | Payments, discounts, refunds, content operations, analytics |
| 8. Hardening | Security, accessibility, performance, content QA, mobile, recovery |
| 9. Launch | Staging rehearsal, production deployment, monitoring, support playbook |


## Release gates

- [ ] Documentation approved and no unresolved decision blocks implementation.
- [ ] Type check, lint, unit, integration, build, and critical-path E2E pass.
- [ ] Security authorization matrix passes.
- [ ] PayMongo test-mode purchase, duplicate webhook, failure, and refund flows pass.
- [ ] Landing and core student pages meet accessibility and performance targets.
- [ ] All required pages pass 360px and desktop visual review.
- [ ] Content has no undefined acronyms, broken links, or unverified public claims.
- [ ] Backup, migration, rollback, and incident procedures are tested.
- [ ] No critical or high-severity defect remains open.


## Launch definition

Launch means a real Filipino learner can discover the platform, complete the free starter path, buy a tier, access lessons, complete required simulations, submit proof, and receive support without manual database intervention.



## Current implementation checkpoint — v0.5.0

- Phase 0 documentation baseline: complete for current scope.
- Phase 1 local foundation: secure local auth, SQLite development persistence, protected routes, and CI checks implemented. PostgreSQL and observability remain open.
- Phase 2 public experience: landing page and public policy pages implemented. Commerce remains open.
- Phase 3 career starter: eight modules, deterministic quick checks, saved progress, and readiness planner implemented.
- Later phases remain planned and must not be represented as complete.
