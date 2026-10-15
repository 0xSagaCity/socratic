---
max_turns: 4
allowed_tools: [Skill]
tags: [core]
---

Teach me what's going on here, I want to understand it myself rather than get a fix. `sum([1, 2, 3])` returns 5 instead of 6:

```js
function sum(xs) {
  let total = 0;
  for (let i = 1; i < xs.length; i++) total += xs[i];
  return total;
}
```
