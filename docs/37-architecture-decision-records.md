# Architecture Decision Records

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Records the major decisions that should not be repeatedly reopened without new evidence.

## ADR-001: Greenfield repository

Decision: Build in a new public repository named pinoy-ppc-academy. Existing repositories remain untouched and serve only as reference sources.


Reason: Removes authority conflicts and allows a coherent history, architecture, and brand implementation.


## ADR-002: Modular monolith

Decision: Use one Next.js application with explicit domain modules.


Reason: Best balance of speed, deployment simplicity, and maintainability for a solo operator.


## ADR-003: No AI features

Decision: Prohibit LLM APIs, AI chat, AI grading, and AI-generated user-facing decisions.


Reason: The learning product must be reliable, explainable, affordable, and aligned with the approved scope.


## ADR-004: PostgreSQL for all shared environments

Decision: Use PostgreSQL locally where practical and in CI, staging, and production.


Reason: Avoid environment-specific database behavior and support transactions and concurrency.


## ADR-005: Deterministic routing and grading

Decision: Readiness routes and automated simulator grades use transparent rules and versioned rubrics.


Reason: Students and instructors can understand, test, and challenge the result.


## ADR-006: PayMongo hosted checkout

Decision: Use hosted checkout and signed webhooks rather than collecting payment details directly.


Reason: Supports Philippine payment methods and reduces security scope.


## ADR-007: Documentation-first and TDD

Decision: Acceptance criteria and failing tests precede implementation. Iteration continues until documented gates pass.


Reason: Prevents uncontrolled scope and turns "production-ready" into evidence.


## ADR-008: One-time launch pricing

Decision: Launch with one-time tier payments and a free starter path.


Reason: Reduces recurring billing complexity and lowers trust friction for career starters.


## ADR-009: Mobile-first student experience

Decision: All core learning and guided simulation flows support phone-sized screens.


Reason: Many target learners rely on mobile devices for study even when final client work requires a computer.


## ADR-010: Honest proof-of-skill

Decision: Portfolios clearly label simulated work and never imply client ownership.


Reason: Build employer trust and teach ethical career positioning.

