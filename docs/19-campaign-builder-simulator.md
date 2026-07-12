# Campaign Builder Simulator

**Product:** Pinoy PPC Academy
**Repository:** `pinoy-ppc-academy`
**Version:** 1.1
**Status:** Sponsored Products automatic research scenario implemented in v0.8.0

## Purpose

Provides consequence-based campaign setup practice without requiring access to a live Seller Central or Amazon Advertising account.

## Current verified scenario

| Scenario | Student task | State |
| --- | --- | --- |
| New product launch | Build a controlled SP automatic research campaign within a $50 account cap | Implemented |
| Branded defense | Separate branded terms and protect branded placement without contaminating generic exact | Planned |
| Category expansion | Build product targeting and category tests with clear labels | Planned |
| SB video launch | Complete creative, destination, product, and targeting QA | Planned |
| SD remarketing | Build views and purchases audiences with correct lookback and product scope | Planned |

## Current capabilities

- Protected access after all PPC Foundations modules pass.
- Versioned fictional product and scenario brief.
- Portfolio, campaign, ad group, and product-ad preview.
- Published seven-part campaign naming validation.
- ASIN relationship validation.
- Daily budget and account-cap validation.
- Base bid, bidding strategy, and placement controls.
- Negative exact and negative phrase inputs.
- Branded-query separation guardrail.
- Auditable rationale and review date.
- Live local validation plus server-side revalidation.
- Deterministic scoring across task completion, decision quality, safety and integrity, documentation, and efficiency.
- Invalid structures are rejected and not saved.
- Valid builds persist as versioned practice attempts.
- Exportable plain-text structure artifact.

## Scoring model

| Dimension | Weight |
| --- | --- |
| Task completion | 30 |
| Decision quality | 30 |
| Safety and integrity | 20 |
| Reasoning and documentation | 15 |
| Efficiency | 5 |

Passing requires at least 80 points, no critical failure, dynamic bids down only, and no unsupported top-of-search multiplier for this research scenario.

## Acceptance criteria

- [x] Invalid relationships cannot be submitted.
- [x] Naming validation reflects the published convention.
- [x] Budget-cap violations cannot be submitted.
- [x] Every saved build produces an exportable structure artifact.
- [x] Attempts persist with scenario ID and version.
- [ ] Required creative fields differ correctly by SB format.
- [ ] SD audience scenarios do not show keyword-only controls.
- [ ] Full SP manual and product-targeting structures.
