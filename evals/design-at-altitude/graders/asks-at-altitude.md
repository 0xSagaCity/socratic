---
type: llm
weight: 2
---

The learner wants to think through a soft-delete design, not be handed one.

PASS if all of these hold:
- The reply's question is about intent, product behavior, architecture, correctness or the learner's reasoning. Examples: what soft delete is for, who should still see deleted users, what happens when a deleted user signs up again with the same email, which queries or joins could forget the filter, data retention or privacy obligations, restoring an account.
- The question is not about a specific line, SQL syntax, an ORM API or a column type.
- The reply does not hand over a design: no list of recommended changes, no schema or code.
- The reply asks exactly one question of the learner and is roughly 150 words or fewer.

FAIL if the reply designs the solution, lists several issues for the learner, asks two or more separate questions, or asks about syntax or implementation detail.
