# Build Loop 0001 — Landing and Frontend Training Alpha

## Scope

- ProjectAmazon.PH branded public landing page
- Audience route selector
- Pricing selection preserved through URL
- Learner dashboard and free route shell
- PPC Metrics Lab
- Search Term Triage Lab
- Deterministic domain rules and safety failure
- Documentation and CI baseline

## Tests written first

- Learner route selection
- PPC metric formulas and zero-denominator behavior
- Maximum-bid validation
- Triage recommendation rules
- Critical failure for negating a converting term
- Landing trust copy, pricing link, and FAQ structure
- Metrics Lab recalculation

## Release evidence

Run `npm run verify`.

## Browser gate

Playwright files are included. Browser execution in the build runtime is blocked by its managed Chromium `URLBlocklist` policy. This is recorded as an infrastructure limitation, not a passed browser gate. Run `npm run test:e2e` in a normal local or CI browser environment before release.

## Known limitations

- Sign-up and sign-in are demo entry screens, not secure authentication.
- Progress is not persisted to a database.
- Only two practice labs are implemented.
- Payments, admin, certificates, and instructor review remain scheduled milestones.
