# Data Model

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines the principal entities, relationships, and data integrity rules.

## Core domains

| Domain | Primary entities |
| --- | --- |
| Identity | User, Account, Session, VerificationToken, Profile, RoleAssignment |
| Learning | Track, Course, Module, Lesson, Activity, Enrollment, Progress, Attempt |
| Assessment | Assessment, Question, Choice, Rubric, Submission, Grade |
| Simulation | ScenarioPack, Scenario, SimulationSession, SimulationAction, SimulationResult |
| Evidence | Portfolio, PortfolioArtifact, Certificate, Badge, UserBadge |
| Commerce | PricingTier, CheckoutSession, Payment, DiscountCode, RefundRequest, Receipt |
| Operations | LiveClass, Registration, Resource, Announcement, AuditLog, AppSetting |


## Key integrity rules

- Published content is versioned; attempts reference the exact version used.
- A payment webhook is idempotent and cannot create duplicate enrollment.
- Enrollment access derives from successful payment, admin grant, scholarship, or free tier.
- Certificate issuance is unique per credential version and student.
- Simulation actions belong to one session and preserve chronological order.
- Soft-deleted operational records remain auditable but are excluded from normal reads.


## Progress state

```text
NOT_STARTED -> IN_PROGRESS -> COMPLETED
Assessment: NOT_STARTED -> STARTED -> SUBMITTED -> GRADED -> PASSED | NEEDS_REVISION
```


## Privacy minimization

- Store only data needed to deliver learning, payments, support, and verification.
- Do not store full payment card data.
- Do not collect government IDs at launch.
- Portfolio sharing is opt-in and can be disabled by the student.

