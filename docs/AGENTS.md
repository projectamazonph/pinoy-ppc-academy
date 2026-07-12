# AGENTS.md - Pinoy PPC Academy

## Mission
Build a Filipino-first pathway from zero VA experience to client-ready Amazon PPC operator.

## Hard boundaries
- Greenfield repository only: `pinoy-ppc-academy`.
- Never modify, branch from, archive, or open pull requests against existing ProjectAmazonPH repositories.
- Existing repositories may be read and copied from only when licensing and ownership allow it.
- No AI features, LLM APIs, AI grading, or hidden AI dependencies.
- Do not publish invented testimonials, student counts, earnings, ratings, or performance claims.

## Required workflow
1. Read the relevant documents in `docs/` before editing code.
2. Restate the acceptance criteria in the task log.
3. Write a failing test that proves the required behavior.
4. Run the test and confirm it fails for the expected reason.
5. Implement the smallest complete change.
6. Run targeted tests until green.
7. Refactor while keeping tests green.
8. Run typecheck, lint, affected integration tests, and relevant E2E.
9. Visually review responsive UI at 360px and desktop sizes.
10. Update documentation, changelog, and build log.

## Build loop states
`PLANNED -> RED -> GREEN -> REFACTOR -> VERIFIED -> INTEGRATED -> DONE`

## Definition of done
- Acceptance criteria pass.
- Required automated tests pass.
- No critical or high-severity defect remains.
- Mobile and accessibility review is complete for UI work.
- Security and authorization checks exist for protected behavior.
- Documentation and release evidence are updated.

## Architecture rules
- Modular monolith using Next.js, TypeScript, PostgreSQL, and Prisma.
- UI does not query Prisma directly.
- Validate all external input with Zod.
- Authorize every server mutation inside the mutation, not only middleware.
- Store money as integer centavos.
- Payment webhooks must be signature-verified and idempotent.
- Every admin mutation creates an audit record.
- Published content, scenarios, rubrics, and certificates are versioned.

## Product rules
- Start with the learner's actual experience level.
- Define every acronym on first use.
- Teach diagnosis before optimization.
- Require proof of skill, not passive completion.
- Label simulated work clearly.
- Keep one clear next action on student pages.
- Preserve ProjectAmazonPH branding and voice.
