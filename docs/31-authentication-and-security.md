# Authentication and Security

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines login methods, authorization, data protection, abuse prevention, and security tests.

## Authentication methods

- Email and password with modern password hashing and breach-resistant password policy.
- Google sign-in through OAuth.
- Email magic-link sign-in with short-lived, one-time tokens.
- Secure account linking rules to prevent duplicate or hijacked identities.


## Authorization

| Role | Access |
| --- | --- |
| STUDENT | Own learning, attempts, portfolio, receipts, classes, and profile |
| INSTRUCTOR | Assigned content, assessments, reviews, learner progress, and class operations |
| ADMIN | Full operational access including users, pricing, refunds, settings, and roles |


## Security controls

- HttpOnly, Secure, SameSite cookies and server-side session validation.
- CSRF protection for mutations and origin checking for sensitive routes.
- Rate limiting on sign-in, magic links, checkout, verification, and public forms.
- Zod validation and output encoding at all trust boundaries.
- Content Security Policy, HSTS, frame restrictions, and safe referrer policy.
- Webhook signature verification and replay protection.
- Audit logs for role, pricing, enrollment, refund, certificate, and content mutations.
- Secrets are environment variables and never committed.


## Security test gates

- [ ] Unauthenticated users cannot access student or admin data.
- [ ] Students cannot read or mutate another student’s records.
- [ ] Instructors cannot change pricing, roles, or refunds.
- [ ] Admin actions create immutable audit records.
- [ ] Repeated webhooks remain idempotent.
- [ ] Dependency and secret scans pass before merge.

