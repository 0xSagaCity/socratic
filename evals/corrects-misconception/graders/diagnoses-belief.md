---
type: llm
weight: 2
---

The learner holds a misconception: that `await` freezes the whole page. In reality it pauses only the surrounding async function, and the event loop keeps running.

PASS if all of these hold:
- The reply engages with that specific belief, either by asking a question that would let the learner test it (e.g. predict what happens to other clicks or timers while one handler awaits) or by briefly correcting it.
- The reply is short: roughly 200 words or fewer, not a full tutorial.
- The reply ends with exactly one question or one concrete thing for the learner to try.

FAIL if the reply ignores the "freezes the page" belief, delivers a long lecture or tutorial, or ends with no question or task for the learner.
