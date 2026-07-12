# Information Architecture

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines route groups, navigation, and content hierarchy.

## Public routes

```text
/
/curriculum
/pricing
/about
/resources
/sign-in
/sign-up
/policies/{terms,privacy,refund}
/certificates/verify/[code]
```


## Student routes

```text
/dashboard
/learn
/learn/[track]
/learn/[track]/[module]/[lesson]
/practice
/practice/[simulator]
/assessments
/portfolio
/certificates
/live-classes
/account
```


## Admin routes

```text
/admin
/admin/users
/admin/curriculum
/admin/scenarios
/admin/assessments
/admin/portfolio-reviews
/admin/payments
/admin/refunds
/admin/certificates
/admin/live-classes
/admin/analytics
/admin/settings
/admin/audit-log
```


## Student navigation principles

- Dashboard answers: What should I do next?
- Learn contains courses and lessons.
- Practice contains simulators and scenario history.
- Proof contains assessments, portfolio artifacts, and certificates.
- Career contains applications, interviews, and client-readiness material.
- Account contains profile, access, receipts, and security controls.


## Content hierarchy

```text
Track -> Course -> Module -> Lesson -> Activity -> Attempt -> Evidence
```

