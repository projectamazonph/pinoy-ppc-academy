# Campaign Operator Track

**Product:** Pinoy PPC Academy
**Repository:** `pinoy-ppc-academy`
**Version:** 1.1
**Status:** Partially implemented in v0.8.0

## Purpose

Develops reliable campaign setup, maintenance, reporting, and change-management execution.

## Track outcome

The learner can build relationship-safe campaign structures, follow naming rules, execute recurring optimization tasks, document changes, and avoid destructive actions in a live account.

## Modules

| Module | Operator capability | Status |
| --- | --- | --- |
| Account Architecture | Portfolios, campaign roles, product grouping, branded versus non-branded separation | Started in SP builder |
| Sponsored Products Setup | Auto, manual keyword, product targeting, negatives, placements | Automatic research scenario verified |
| Sponsored Brands Setup | Product collection, Store spotlight, video, creative QA, destinations | Planned |
| Sponsored Display Setup | Contextual, views remarketing, purchases remarketing, audience logic | Planned |
| Bulk Operations | Entity hierarchy, uploads, validation, error handling, rollback plan | Planned |
| Optimization Cadence | Daily health, weekly search terms, bid reviews, budgets, monthly analysis | Foundations implemented |
| Change Management | Before and after values, reason, evidence, expected result, review date | Implemented in SP builder artifact |

## Naming standard

```text
Brand | ASIN | Ad Type | Strategy | Target Type | Match | Label
```

Branded terms belong in branded defense campaigns. Research, performance, defense, and conquesting roles remain explicit.

## v0.8 implementation checkpoint

The first operator scenario is a versioned Sponsored Products automatic research launch for a fictional Amazon.com product.

The learner must:

- Build a portfolio, campaign, ad group, and product-ad relationship.
- Use the scenario ASIN without breaking the object hierarchy.
- Follow the published seven-part campaign name.
- Keep the campaign inside a $50 daily account cap.
- Start research with dynamic bids down only and no unsupported placement multiplier.
- Exclude the branded query from generic discovery with negative exact.
- Document the objective, guardrails, expected result, and seven-day review timing.

A broken ASIN relationship or budget-cap violation cannot be submitted or persisted.

## Operator gate

- [x] Build one SP automatic research structure from a product brief.
- [x] Produce a downloadable structure and change-note artifact.
- [ ] Build one SP manual keyword structure.
- [ ] Build one SP product-targeting structure.
- [ ] Build one SB campaign with complete creative QA.
- [ ] Build one SD remarketing campaign without treating audiences as keywords.
- [ ] Complete a bulk operation with zero broken parent-child relationships.
- [ ] Submit a multi-change log that another operator can audit.
