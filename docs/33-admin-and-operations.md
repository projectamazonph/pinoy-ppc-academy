# Admin and Operations

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines the operating console for a solo owner and future instructors.

## Admin sections

| Area | Core actions |
| --- | --- |
| Dashboard | Revenue, enrollments, completion, grading queue, payment failures, upcoming classes |
| Users | Search, view, suspend, grant access, update roles, export |
| Curriculum | Draft, version, preview, publish, unpublish, and schedule content |
| Scenarios | Create packs, define rules, seed data, validate, publish, retire |
| Assessments | Question bank, rubrics, submissions, grading, moderation |
| Portfolio reviews | Review artifacts, request revision, approve publication |
| Commerce | Pricing, discounts, checkouts, payments, receipts, refunds, reconciliation |
| Certificates | Issue, verify, revoke, and inspect evidence |
| Live classes | Schedule, capacity, registration, attendance, recordings |
| Analytics | Acquisition, activation, learning, simulation, completion, revenue |
| Settings | Brand, email, integrations, policies, feature flags |
| Audit log | Actor, action, entity, date, before and after values |


## Admin design

- Tables over decorative cards.
- Filter, sort, search, pagination, and bulk actions follow one pattern.
- Destructive actions state the consequence and require a reason.
- Every mutation performs authorization, validation, existence checks, self-protection, transaction, audit, and revalidation.


## Operational alerts

- Paid provider event without active enrollment.
- Repeated failed sign-ins or checkout abuse.
- Assessment grading queue beyond service target.
- Broken content link or scenario validation failure.
- Refund request nearing policy deadline.

