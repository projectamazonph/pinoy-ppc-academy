# Testing, TDD, and Iteration Loop Protocol

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

The mandatory build process for every feature and release.

## Core loop

```text
1. Specify
2. Write failing test
3. Implement minimum behavior
4. Run targeted tests
5. Refactor without changing behavior
6. Run broader suite
7. Inspect UI or evidence
8. Record result
9. Repeat until release gate passes
```


## TDD rules

- Behavior-bearing production code begins with a failing automated test.
- A test must fail for the expected reason before implementation starts.
- The smallest complete change is implemented to pass the test.
- Refactoring occurs only while tests are green.
- Bug fixes begin with a regression test that reproduces the bug.
- Tests assert outcomes and contracts, not internal implementation details unless necessary for safety.


## Test layers

| Layer | Tools and scope |
| --- | --- |
| Unit | Vitest for calculations, routing, access rules, scoring, validators, and state machines |
| Component | Testing Library for forms, feedback, navigation, accessibility, and responsive states |
| Integration | Database-backed tests for enrollment, payment, content, grading, and audit transactions |
| Contract | PayMongo and email boundary fixtures; schema compatibility |
| End-to-end | Playwright for visitor, starter, purchase, learning, simulator, portfolio, and admin critical paths |
| Accessibility | axe plus keyboard and screen-reader-oriented manual checks |
| Performance | Lighthouse CI and defined page budgets |
| Security | Authorization matrix, webhook replay, secret scan, dependency scan, and abuse cases |


## Persistent build loop

Each work item maintains an iteration record in docs/build-log. The record includes objective, acceptance criteria, failing test evidence, implementation summary, checks run, failures found, fixes, residual risks, and next action.


```text
PLANNED -> RED -> GREEN -> REFACTOR -> VERIFIED -> INTEGRATED -> DONE
```


## Loop stop conditions

- [ ] All acceptance criteria pass.
- [ ] Required automated tests pass.
- [ ] No known critical or high-severity defect remains.
- [ ] Visual and mobile review is complete for UI work.
- [ ] Documentation and changelog are updated.
- [ ] Evidence is attached or recorded.


## Coverage policy

- Domain logic target: at least 80 percent line and branch coverage.
- Security, payment, access, and certificate state machines: 100 percent branch coverage where practical.
- Coverage cannot replace meaningful scenario tests.
- A decrease in coverage requires a documented reason and reviewer approval.

