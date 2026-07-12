# Simulator Platform

**Product:** Pinoy PPC Academy  
**Repository:** `pinoy-ppc-academy`  
**Version:** 1.0  
**Status:** Documentation baseline

## Purpose

Defines the common simulation engine, data model, scoring, and safety rules.

## Purpose

The simulator replaces missing access to live Amazon accounts with realistic, consequence-based practice. It teaches object relationships, workflow order, decision quality, and change verification.


## Shared engine capabilities

- Versioned fictional brands and product catalogs.
- Campaign, ad group, product ad, target, search term, negative, budget rule, creative, and history entities.
- Scenario objectives, hidden conditions, hints, allowed actions, scoring, and completion states.
- Action log with before value, after value, reason, timestamp, and result.
- Integrity checks that reject broken parent-child relationships.
- Reset, resume, submit, and replay functions.
- Mobile guided mode and desktop analyst mode.


## Object hierarchy

```text
Portfolio
  -> Campaign
      -> Ad group
          -> Product ad
          -> Target
              -> Search term, when applicable
          -> Negative targeting
      -> Budget rule
      -> Creative, when applicable
      -> Change history
```


## Scoring model

| Dimension | Example weight |
| --- | --- |
| Task completion | 30 percent |
| Decision quality | 30 percent |
| Safety and integrity | 20 percent |
| Reasoning and documentation | 15 percent |
| Efficiency | 5 percent |


## No-AI grading rule

Simulator grading uses explicit rules, state comparisons, thresholds, and human-reviewed rubrics. No response is sent to an LLM. Explanations are authored and versioned with each scenario.

