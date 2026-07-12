# Amazon Foundations Track

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Six-module route implemented in v0.6.0

## Purpose

Builds the marketplace knowledge required before advertising work.

## Track outcome

The learner can describe how Amazon selling works, identify the main account objects, evaluate listing and offer readiness, and explain how advertising interacts with organic performance, inventory, price, and profitability.


## Modules

| Module | Core lessons |
| --- | --- |
| Marketplace Basics | Seller Central, Vendor Central, marketplace roles, ASIN, SKU, parent-child relationships |
| Listing Anatomy | Title, images, bullets, A+ content, reviews, variation structure, conversion impact |
| Offer Readiness | Buy Box, price, coupon, inventory, fulfillment, suppression, retail readiness |
| Business Metrics | Revenue, units, sessions, conversion rate, contribution margin, break-even ACoS |
| Advertising Interface | Portfolios, campaigns, ad groups, product ads, targets, search terms, creatives |
| Reporting Basics | Date ranges, attribution, report types, data delays, totals versus rates |


## Diagnostic foundation

> **Core question:** When PPC underperforms, first decide whether the problem is advertising, the listing, inventory or pricing, or campaign structure. Do not touch bids until the category is clear.


## Assessment

- Listing-readiness audit using a fictional product.
- Object relationship exercise connecting portfolio, campaign, ad group, target, and search term.
- Break-even ACoS calculation with explanation.
- Diagnostic classification scenarios.



## Implementation checkpoint — v0.6.0

The six documented modules are implemented as protected, ordered lessons with versioned deterministic quick checks. Access requires a saved readiness result recommending Amazon Foundations.

Delivered behavior:

- Course catalog and dashboard progression
- Readiness-based access gate
- Ordered lesson prerequisites
- Pass-to-complete quick checks
- Persistent progress and quiz attempts through the shared learning data model
- Diagnostic framing across listing, inventory or price, advertising, and structure
- Sanitized browser quiz payloads with no correct-answer identifiers

The production PostgreSQL adapter, deeper exercises, and paid access controls remain open.
