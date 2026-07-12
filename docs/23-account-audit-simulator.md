# Account Audit and Diagnostic Simulator

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Specifies account-level diagnosis and prioritization exercises.

## Audit domains

| Domain | Checks |
| --- | --- |
| Business readiness | Inventory, price, Buy Box, listing quality, margin, seasonality |
| Structure | Campaign roles, duplication, branded separation, product grouping, naming |
| Targeting | Coverage, overlap, harvesting, negatives, product targeting |
| Bids and placements | CPC logic, bidding strategy, placement efficiency, data sufficiency |
| Budgets | Pacing, caps, constrained winners, uncontrolled waste |
| Measurement | Date ranges, attribution, missing reports, metric interpretation |


## Finding format

```text
Finding -> Evidence -> Business impact -> Priority -> Recommended action -> Guardrail -> Review date
```


## Priority rules

- Critical: immediate spend, access, policy, inventory, or data-integrity risk.
- High: material performance loss that can be acted on with available evidence.
- Medium: structural or efficiency improvement with lower urgency.
- Low: cleanup, documentation, or experiment that should not displace higher-impact work.

