---
max_turns: 4
allowed_tools: [Skill]
tags: [core]
---

Rename `getUser` to `fetchUser` in this snippet and give me the updated code, nothing else:

```js
async function getUser(id) {
  return db.users.find(id);
}
const u = await getUser(7);
```
