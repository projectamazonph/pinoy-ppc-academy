# CI/CD and Deployment

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines automated validation, environments, deployment, migration, rollback, and observability.

## Pipeline

```text
Install -> Format check -> Type check -> Lint -> Unit -> Integration -> Build -> E2E -> Accessibility -> Security scans -> Preview deploy
```


## Environments

| Environment | Purpose |
| --- | --- |
| Local | Fast TDD and development with isolated test database |
| Preview | Every pull request; seeded demo data; no live payments |
| Staging | Production-like acceptance, PayMongo test mode, release rehearsal |
| Production | Live users, live payments, monitored migrations and rollback plan |


## Deployment rules

- No production deploy from an unreviewed local state.
- Database migrations are additive or include an explicit compatibility plan.
- Backups are verified before destructive migration.
- Feature flags isolate risky workflows.
- Rollback steps are written before launch, not after failure.


## Observability

- Structured logs with request and actor identifiers without sensitive data.
- Sentry error and performance monitoring.
- Health endpoint checking database and required service configuration.
- Payment reconciliation job and alerting.
- Admin dashboard for operational failures and grading backlog.

