# Budget and Placement Simulator

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Specifies pacing, budget allocation, campaign caps, and placement controls.

## Capabilities

- Simulate account-level and campaign-level daily budget constraints.
- Show hourly or daily pacing against plan.
- Compare profitable campaigns that are budget-limited with wasteful campaigns that are not.
- Adjust top-of-search, rest-of-search, and product-page placement multipliers.
- Review budget rules and seasonal changes.


## Decision framework

1. Confirm whether the campaign is actually budget-limited.
2. Check profitability and business goal.
3. Review inventory and offer readiness.
4. Find waste that can be reallocated before adding spend.
5. Apply the smallest safe change.
6. Define when the decision will be reviewed.


## Scenario example

A fictional account begins with a PHP-equivalent daily cap and five campaigns. The student must protect branded defense, fund profitable exact campaigns, reduce waste, and avoid scaling a product with low inventory.

