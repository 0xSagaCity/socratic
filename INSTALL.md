# Install

Socratic is a set of plain instructions, with no code, hooks or MCP server, so it works with any model. Pick your host below. Every file here is generated from [`skills/socratic/SKILL.md`](skills/socratic/SKILL.md), so the behaviour is the same everywhere.

There are three ways to load it:

- **Skill.** The agent loads it when you ask to learn, or when you call it by name. This is the best fit.
- **Rule file.** Loaded every turn, but it **stays dormant** until you say "socratic", "teach me", "quiz me" or similar.
- **System prompt.** For chat apps and APIs. It is on from the first message.

## Plugin installs

### Claude Code

```text
/plugin marketplace add 0xSagaCity/socratic
/plugin install socratic@socratic
```

Send them as two separate prompts. Plugin skills are namespaced, so the command is `/socratic:socratic` (and `/socratic:socratic ultra`). Saying "teach me" works too.

### Codex

```bash
codex plugin marketplace add 0xSagaCity/socratic
codex plugin add socratic@socratic
```

Start a new thread afterwards. The same install covers the Codex desktop app (restart it).

### GitHub Copilot CLI

```bash
copilot plugin marketplace add 0xSagaCity/socratic
copilot plugin install socratic@socratic
```

### Gemini CLI

```bash
gemini extensions install https://github.com/0xSagaCity/socratic
```

This adds the dormant ruleset as context and a `/socratic` command (`/socratic ultra`, `/socratic off`).

## Skill installs

### Any agent with Agent Skills (skills CLI)

```bash
npx skills add 0xSagaCity/socratic
```

The [skills CLI](https://skills.sh) detects your agents (Cursor, OpenCode, Codex, Cline, Goose, Windsurf and many more) and copies the skill into each one's skills folder. Add `-g` to install for your user rather than the project, or `-a <agent>` to pick the agent.

### Manual

Copy [`skills/socratic/`](skills/socratic/) into your agent's skills folder:

| Agent | Personal | Project |
|---|---|---|
| Claude Code | `~/.claude/skills/socratic/` | `.claude/skills/socratic/` |
| Most others (shared Agent Skills path) | `~/.agents/skills/socratic/` | `.agents/skills/socratic/` |

```bash
mkdir -p ~/.claude/skills/socratic
curl -fsSL https://raw.githubusercontent.com/0xSagaCity/socratic/main/skills/socratic/SKILL.md \
  -o ~/.claude/skills/socratic/SKILL.md
```

Start a new session afterwards; agents discover skills at startup.

## Rule files

Copy the file for your editor into your project, or into the global location where one exists.

| Host | File | How it loads |
|---|---|---|
| Cursor | [`.cursor/rules/socratic.mdc`](.cursor/rules/socratic.mdc) | Agent-requested: Cursor pulls it in when the request matches |
| Windsurf | [`.windsurf/rules/socratic.md`](.windsurf/rules/socratic.md) | `trigger: model_decision` |
| Kiro | [`.kiro/steering/socratic.md`](.kiro/steering/socratic.md) | `inclusion: auto`; also available as `/socratic`. Global: `~/.kiro/steering/` |
| Cline | [`.clinerules/socratic.md`](.clinerules/socratic.md) | Toggleable rule. Global: `~/Documents/Cline/Rules/` |
| GitHub Copilot (VS Code, JetBrains, Visual Studio) | [`.github/copilot-instructions.md`](.github/copilot-instructions.md) | Always loaded, dormant until asked |
| Anything that reads `AGENTS.md`: Codex, OpenCode, Zed, Amp, Jules, Kiro, Goose, Factory, Gemini CLI (via `contextFileName`)… | [`AGENTS.md`](AGENTS.md) | Always loaded, dormant until asked. Append it to your existing `AGENTS.md` if you have one |
| Aider | [`AGENTS.md`](AGENTS.md) | `aider --read AGENTS.md`, or add it under `read:` in `.aider.conf.yml` |

## System prompt (chat apps and APIs)

[`prompts/system-prompt.md`](prompts/system-prompt.md) is the same ruleset, switched on from the first message. It stays under 8,000 characters, so it fits a custom GPT's instructions.

| Where | Paste it into |
|---|---|
| ChatGPT | A custom GPT's *Instructions*, or a Project's *Instructions* |
| Claude.ai | A Project's *Project instructions* |
| Gemini | A Gem's *Instructions* |
| Any API or local model (OpenAI, Anthropic, Gemini, Ollama, LM Studio…) | The `system` message |

```bash
curl -fsSL https://raw.githubusercontent.com/0xSagaCity/socratic/main/prompts/system-prompt.md
```

Without file access, the tutor asks you to paste the code or output it needs instead of reading it.

## Uninstall

| Host | Command |
|---|---|
| Claude Code | `/plugin uninstall socratic@socratic`, then `/plugin marketplace remove socratic` |
| Codex | `codex plugin remove socratic` |
| Copilot CLI | `copilot plugin uninstall socratic` |
| Gemini CLI | `gemini extensions uninstall socratic` |
| skills CLI | `npx skills remove socratic` |
| Rule files, manual skills, system prompts | Delete the copied file |
