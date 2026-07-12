# PPC Foundations Track

**Product:** Pinoy PPC Academy
**Repository:** `pinoy-ppc-academy`
**Version:** 1.1
**Status:** Implemented and verified in v0.7.0

## Purpose

Introduces the advertising economics, campaign types, targeting controls, and operating guardrails a learner needs before managing spend.

## Track outcome

The learner can interpret core Amazon PPC metrics, explain Sponsored Products, Sponsored Brands, and Sponsored Display, separate targets from shopper search terms, estimate safe economic limits, and defend a basic bid, budget, placement, or negative-keyword decision with evidence.

## Modules

| Module | Key content | Evidence |
| --- | --- | --- |
| Advertising Economics | CPC, CTR, CVR, ACoS, ROAS, break-even ACoS | Metric decision note |
| TACoS and Business Health | TACoS, organic sales, ad-sales share, advertising dependence | Two-scenario TACoS comparison |
| Campaign Types | SP, SB, SD, use cases, eligibility, creative and destination checks | Campaign-type selection brief |
| Targeting and Match | Automatic, exact, phrase, broad, ASIN, category, audience | Targeting control map |
| Bids and Placements | Target bids, down only, fixed, up and down, placement multipliers | Bid and placement decision note |
| Budgets and Pacing | Daily limits, account caps, reallocation, inventory constraints | Daily pacing plan |
| Search Term Logic | Search term versus target, harvesting, hold, negative exact, negative phrase | Search-term decision worksheet |

## TACoS requirement

TACoS has a dedicated lesson and interactive calculator. Learners compare two accounts with identical ACoS but different TACoS and explain what the difference says about organic sales, advertising dependence, and business health.

The calculator derives:

- ACoS from ad spend and ad sales.
- TACoS from ad spend and total sales.
- Organic sales from total sales less ad sales.
- Ad-sales share from ad sales and total sales.

Invalid negative values, zero denominators, and ad sales above total sales are handled explicitly.

## Operating guardrails

- Dynamic bids down only is the default research-campaign teaching baseline.
- Holding is a valid decision when evidence is weak.
- Placement multipliers require placement-level evidence and inventory checks.
- Reallocate documented waste before automatically increasing total account exposure.
- Negative exact is safer for one isolated query; negative phrase needs stronger family-level evidence.
- Blocking a converting query family is a critical failure.
- Branded search terms belong in branded defense structures, not generic performance reporting.

## Access and completion rules

- All six Amazon Foundations modules must be completed before Route 03 opens.
- Lessons unlock in order.
- A failed quick check is saved but does not complete the lesson.
- A passing quick check completes exactly one unlocked lesson.
- Correct answer identifiers never render into browser HTML.

## Verified implementation

- Protected course route: `/app/courses/ppc-foundations`
- Protected lesson route: `/app/courses/ppc-foundations/[lessonId]`
- Interactive tool: `/app/practice/tacos-calculator`
- Persistent progress and versioned deterministic quick checks.
- Dashboard and course catalog progression into PPC Foundations.

## Foundation gate status

- [x] Ordered seven-module curriculum.
- [x] At least 80 percent required on each quick check.
- [x] Correct metric calculations with interpretation.
- [x] Dedicated TACoS comparison exercise.
- [x] Search-term and negative-keyword guardrails.
- [ ] Guided campaign build. Scheduled for Campaign Operator.
- [ ] Final integrated PPC Foundations assessment. Scheduled before public certification.
