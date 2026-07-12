# Pinoy PPC Academy

Career-first Amazon PPC training for Filipinos starting or shifting into virtual assistant work.

## Current verified milestone

- Full branded landing page
- Learner dashboard and free-route shell
- Working PPC Metrics Lab
- Working Search Term Triage Lab
- Deterministic, test-covered scoring logic
- No AI dependencies or AI grading
- 38-file project documentation set
- CI workflow and release guards

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run verify
npm run test:e2e
```

`npm run verify` runs no-AI and content-trust guards, TypeScript, ESLint, unit/component tests, and the production build.

## Documentation

Start with `docs/00-documentation-index.md` and `docs/34-testing-tdd-and-loop-protocol.md`.

## Status

Frontend training alpha. Authentication, PostgreSQL persistence, PayMongo, administration, portfolio review, and certification are not yet implemented and are not represented as complete.
