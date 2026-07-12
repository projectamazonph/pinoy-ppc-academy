# Career Readiness

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Starter readiness planner implemented; broader career modules remain planned

## Purpose

Defines ethical job-search, interview, trial-task, and first-client preparation.

## Career modules

| Module | Deliverable |
| --- | --- |
| Positioning | One-sentence specialization statement and target role list |
| Resume evidence | Achievement and skill bullets backed by training artifacts |
| Profile setup | Professional online profile with honest experience labels |
| Applications | Tailored application checklist and tracking system |
| Interviews | Technical, behavioral, and scenario answer framework |
| Trial tasks | Scope, timebox, data safety, submission quality, and red flags |
| Client onboarding | First-week checklist and communication cadence |
| Growth plan | Ninety-day learning and performance plan |


## Interview answer framework

```text
Context -> Signal -> Diagnosis -> Action -> Guardrail -> Result or expected measurement
```


## Ethical claims

- Say "trained through simulated account scenarios" rather than claiming client ownership.
- Use real past experience only when it can be verified.
- Do not guarantee revenue, ACoS improvement, or ranking outcomes.
- Explain where supervision or account access would still be required.



## Implemented readiness planner — v0.5.0

The free starter route now ends with a deterministic readiness assessment. Access opens only after all eight VA Career Starter modules are complete.

### Inputs

- Device, primary internet, backup, and secure-access readiness
- Digital work and client communication confidence on a 1–5 scale
- Weekly study time
- Current Amazon-work interest
- Previous role and strongest transferable skill

### Recommendation routes

| Route | Trigger | Immediate result |
| --- | --- | --- |
| Setup first | Any reliability or security requirement is missing | Fix setup before client outreach |
| Core skills | Digital or communication confidence is 2/5 or lower | Practice everyday VA execution |
| Amazon Foundations | Setup and core skills are ready, with medium or high Amazon interest | Continue into Amazon operations |
| Explore VA roles | Setup and core skills are ready, with low Amazon interest | Compare other specializations |

The assessment saves its exact inputs, score, route, summary, and three actions. The learner can download a plain-text plan generated from the saved record. No AI, personality inference, or hidden scoring is used.
