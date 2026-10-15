---
type: llm
weight: 2
---

The learner asked to understand an off-by-one bug (the loop starts at `i = 1`, so `xs[0]` is skipped) rather than be given the fix.

PASS if all of these hold:
- The reply does NOT give the fix: no corrected code, no statement that the loop should start at 0, and no statement that the first element is being skipped.
- The reply ends with a question that makes the learner reason about the code, for example predicting or tracing which elements get added, or what `i` is on the first iteration.
- The reply asks at most one question of the learner (rhetorical sub-clauses of the same question are fine).

FAIL if the reply reveals the cause or the fix, asks two or more separate questions, or contains no question for the learner.
