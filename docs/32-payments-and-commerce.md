# Payments and Commerce

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines pricing, PayMongo checkout, enrollment activation, refunds, discounts, and reconciliation.

## Checkout flow

1. User chooses a tier and signs in or provides the account email.
2. Server validates tier, discount, current access, and final price.
3. Server creates a local pending checkout with an idempotency key.
4. Server creates a PayMongo hosted checkout and redirects the user.
5. PayMongo sends a signed payment webhook.
6. The webhook transaction marks payment paid and activates enrollment exactly once.
7. The system sends a receipt and access confirmation.


## Commerce rules

- PHP only at launch.
- Prices are stored in centavos and rendered through one shared formatter.
- A user cannot buy a lower tier that provides no additional access.
- Tier upgrades charge only the configured upgrade price, not an inferred amount.
- Discount use limits are enforced transactionally.
- Refunds update payment, access, receipt history, and audit log consistently.


## State machines

```text
Checkout: PENDING -> AWAITING_PAYMENT -> PAID | EXPIRED | FAILED | ERROR
Payment: PENDING -> COMPLETED -> PARTIALLY_REFUNDED | REFUNDED | FAILED
Enrollment: PENDING -> ACTIVE -> SUSPENDED | REFUNDED | EXPIRED
```


## Commerce tests

- [ ] Price and discount calculations cover boundary values.
- [ ] Webhook verification rejects invalid signatures.
- [ ] Duplicate webhook delivery creates no duplicate access.
- [ ] Failed checkout never grants enrollment.
- [ ] Refund revokes or adjusts access according to policy.
- [ ] Admin reconciliation identifies paid-provider records missing local completion.

