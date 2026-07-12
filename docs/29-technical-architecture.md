# Technical Architecture

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines the production architecture and boundaries for the greenfield application.

## Architecture style

A modular monolith deployed as one Next.js application. Feature modules own their domain logic, tests, and data access. This reduces operational burden while preserving clear boundaries for future extraction.


## Baseline stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router with React and TypeScript strict mode |
| Database | Managed PostgreSQL |
| ORM | Prisma with migrations and seed scripts |
| Authentication | Auth.js with database-backed accounts and secure sessions |
| Validation | Zod at every external boundary |
| Payments | PayMongo hosted checkout and verified webhooks |
| Email | Resend with React-based transactional templates |
| File storage | S3-compatible object storage for resources and portfolio exports |
| Observability | Structured logs, Sentry, health checks, and audit logs |
| Testing | Vitest, Testing Library, Playwright, axe, and contract tests |
| Deployment | Vercel plus managed PostgreSQL and object storage |


## Module boundaries

```text
src/modules/
  auth/
  users/
  curriculum/
  progress/
  assessments/
  simulations/
  portfolio/
  certificates/
  commerce/
  live-classes/
  admin/
  analytics/
```


## Rules

- UI components cannot query Prisma directly.
- Domain services contain business rules and are independently testable.
- Server actions and route handlers validate input, authorize, call a domain service, and return typed results.
- All money is stored as integer centavos.
- All timestamps are stored in UTC and displayed in the user or Asia/Manila timezone as appropriate.
- No external AI SDK is permitted in dependencies.

