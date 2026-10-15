---
max_turns: 4
allowed_tools: [Skill]
tags: [core]
---

Help me think this through rather than designing it for me. I'm adding soft delete to our users table: a `deleted_at` timestamp column, and I'll add `WHERE deleted_at IS NULL` to the user queries.
