<p align="center">
  <img src="assets/logo.svg" width="160" alt="Socratic logo: a speech bubble holding a question mark">
</p>

<h1 align="center">Socratic</h1>

<p align="center">
  <em>It won't hand you the answer. It helps you find it, and teaches you why.</em>
</p>

<p align="center">
  <a href="https://github.com/0xSagaCity/socratic/stargazers"><img src="https://img.shields.io/github/stars/0xSagaCity/socratic?style=flat-square&color=6366F1&label=stars" alt="Stars"></a>
  <a href="https://github.com/0xSagaCity/socratic/releases"><img src="https://img.shields.io/github/v/release/0xSagaCity/socratic?style=flat-square&color=6366F1&label=release" alt="Release"></a>
  <a href="https://github.com/0xSagaCity/socratic/actions/workflows/check.yml"><img src="https://img.shields.io/github/actions/workflow/status/0xSagaCity/socratic/check.yml?style=flat-square&label=adapters%20in%20sync" alt="Adapters in sync"></a>
  <a href="INSTALL.md"><img src="https://img.shields.io/badge/works%20with-any%20model-8B5CF6?style=flat-square" alt="Works with any model"></a>
  <a href="docs/research.md"><img src="https://img.shields.io/badge/grounded%20in-research-8B5CF6?style=flat-square" alt="Grounded in research"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-A855F7?style=flat-square" alt="MIT license"></a>
</p>

<p align="center">
  <a href="#install">Install</a> &middot;
  <a href="#what-it-feels-like">Example</a> &middot;
  <a href="#how-it-works">How it works</a> &middot;
  <a href="#levels">Levels</a> &middot;
  <a href="#why-these-rules">Research</a> &middot;
  <a href="#does-it-work">Evals</a> &middot;
  <a href="skills/socratic/SKILL.md">The skill</a>
</p>

---

## Why

Ask an AI an answer and you get one. Paste it in, it works, and a week later you hit the same wall, because the understanding stayed with the model. Studies agree: learners who let AI answer for them score worse once the AI is gone, and a tutor that only guards answers prevents the harm without adding much. What helps is the learner doing the thinking, with a tutor that keeps them moving ([evidence](docs/research.md#the-headline-results)).

**Socratic** turns any AI agent or chat model into a patient senior mentor. It works out the answer itself, finds out what *you* intend and believe, asks the one question that tests it, and teaches the principle your answer just touched. Its questions start where senior engineers think: **intent, product decisions, architecture, correctness and your own reasoning**. Specific lines of code come last. You leave with the fix *and* the judgement behind it.

It is plain instructions with no code, hooks or servers, so it runs on any model: Claude, GPT, Gemini, Llama, Qwen, DeepSeek, or whatever your agent uses.

## What it feels like

> **You:** I'm adding a "retry payment" button for failed invoices. Teach me to think it through.
>
> **Socratic:** I'll mostly ask rather than tell, so it sticks; say "just tell me" any time. Start with intent: when a customer clicks "retry", what are they trying to make sure of?
>
> **You:** that the invoice gets paid
>
> **Socratic:** Right, and "gets paid" carries a promise: one invoice, paid once. Here's a scenario. The first attempt actually succeeded at the bank, but your server timed out before recording it, so the customer sees "failed". They click retry. What happens?
>
> **You:** …we charge them again. damn
>
> **Socratic:** You tested the promise against a failure instead of the happy path; that's the move that matters. The principle is *idempotency*: a retry must be safe to repeat. Where should the knowledge "this invoice was already charged" live: in the button, your invoice service, or the payment provider?
>
> **You:** not the button. the provider, with an idempotency key per invoice?
>
> **Socratic:** That holds. In one line, why doesn't disabling the button after one click solve this?

Intent first, then the invariant, then a failure scenario that tests it, then the principle in *their* words. One question per turn, and no line numbers.

## How it works

```mermaid
flowchart LR
    A[Find the intent,<br/>verify the answer] --> B[Elicit a goal, design<br/>choice or invariant]
    B --> C[Diagnose the<br/>assumption behind it]
    C --> D[Ask the one scenario<br/>that tests it]
    D --> E{Their answer}
    E -->|right| F[Name the move,<br/>add only what's missing]
    E -->|wrong| G[Walk the scenario,<br/>compare with their claim]
    E -->|stuck| H[Climb the hint ladder]
    E -->|their own question| I[Answer conceptual<br/>questions directly]
    F --> J[They restate the idea<br/>in their own words]
    G --> J
    H --> J
    I --> D
    J --> B
```

- **Altitude first.** Intent and product → architecture → correctness → your reasoning → code. Questions are grounded in a user scenario or a failure, not a line number, and it never quizzes syntax. When you answer well, it moves *up* a level.
- **A hint ladder that moves both ways.** It goes up one rung after a miss and down one after a success: say more → name the concern → a narrower scenario → name the principle → an analogous example → point at the code → answer + why. After the last rung, you explain it back.
- **A check before every message.** Exactly one question? Right altitude? Does the question give away its own answer ("Should this be a queue?")? Anything above the current rung? Any visible progress in the last 2–3 turns? If not, it gives more help instead of another question.
- **Focus, don't funnel.** Questions build on *your* words, never a yes/no chain toward its own answer.
- **Kind but firm.** It verifies before it steers, judges your answer by evidence rather than wording, and won't call a wrong answer right because you push back.
- **Out of the way when it should be.** Say "just tell me" and you get the answer straight. Production down, data at risk, or a security hole? No questions.

| Question kind | Example |
|------|---------|
| Intent | "What problem does this solve for the user, in one sentence?" |
| Product | "When the payment fails, what should the customer see?" |
| Trade-off | "What do you give up by syncing nightly?" |
| Architecture | "If pricing rules change, what else has to change?" |
| Invariant | "What must always be true about a balance, whatever order requests arrive in?" |
| Failure | "The charge succeeds but the response times out. What happens on retry?" |
| Introspection | "What made you reach for a queue here?" |

## Levels

| Level | Say | Behavior |
|-------|-----|----------|
| **lite** | `socratic lite` | Solves the task, explains the key decision behind it, then asks 1–2 questions that check you understood it. |
| **full** | `socratic` | The loop above. You make the decisions; it writes code only once you've reasoned your way there. *Default.* |
| **ultra** | `socratic ultra` | Productive failure: you state the intent and the design before any teaching and write all the code. It also questions the premise and the product decision. |

It also starts on its own when you say *"teach me"*, *"quiz me"*, *"help me understand"*, *"help me think this through"* or *"don't just give me the answer"*. It stays on until **"stop socratic"** or **"normal mode"**. Where your host has slash commands, `/socratic ultra` works too.

## Install

One source file, [`skills/socratic/SKILL.md`](skills/socratic/SKILL.md), generated into whatever format your host loads. Full per-host details are in **[INSTALL.md](INSTALL.md)**.

| Host | Install |
|---|---|
| **Claude Code** | `/plugin marketplace add 0xSagaCity/socratic`, then `/plugin install socratic@socratic` |
| **Codex** | `codex plugin marketplace add 0xSagaCity/socratic`, then `codex plugin add socratic@socratic` |
| **GitHub Copilot CLI** | `copilot plugin marketplace add 0xSagaCity/socratic`, then `copilot plugin install socratic@socratic` |
| **Gemini CLI** | `gemini extensions install https://github.com/0xSagaCity/socratic` |
| **Cursor, OpenCode, Cline, Goose, Windsurf, … (any Agent Skills host)** | `npx skills add 0xSagaCity/socratic` |
| **Cursor / Windsurf / Kiro / Cline / Copilot rules** | Copy the matching rule file ([table](INSTALL.md#rule-files)). It stays dormant until you ask |
| **Anything that reads `AGENTS.md`** | Copy [`AGENTS.md`](AGENTS.md). It stays dormant until you ask |
| **ChatGPT, Claude.ai, Gemini, any API or local model** | Paste [`prompts/system-prompt.md`](prompts/system-prompt.md) into a GPT, Project, Gem or `system` message |

## Why these rules

Every rule maps to the Socratic method, learning science, or a documented failure of LLM tutors. Highlights:

- **Altitude first.** Paul & Elder's elements of thought start from purpose, assumptions and implications, not details. When developers learned with AI, the highest scorers asked *conceptual* questions. Experienced engineers gain from design and trade-off questions, and lose from step-by-step guidance (expertise reversal).
- **Elenchus → diagnose the belief.** Socrates had the learner state a belief, then see it contradicted. The tutor finds the assumption behind your answer and asks for the scenario that breaks it.
- **PRIMM → predict before you run**, for when the question really is about code.
- **Funneling vs focusing.** Questions built on the student's own reasoning go with better learning than questions that march the student to the teacher's answer.
- **Contingent tutoring → a ladder that moves both ways.** More specific help after a miss, less after a success.
- **The Khanmigo lesson.** Students abandoned a tutor that only asked and never answered, so this one answers conceptual questions, demands visible progress, and honours "just tell me".
- **Answer leaks and sycophancy.** LLM tutors give answers away often, and give in under social pressure. That is why there is a check before every message and a "kind but firm" rule.

Full evidence map with sources: **[docs/research.md](docs/research.md)**.

## Does it work?

The [`evals/`](evals/) suite runs real Claude Code sessions with and without the plugin (`claude plugin eval .`). Before release, the same cases were run against the system-prompt version on a raw model with no tools. An LLM judge graded each reply against a strict rubric, and also classified its question as *code-level* (a line, value, trace or syntax) or *high-altitude* (intent, product, architecture, correctness, reasoning):

| Case | Passes rubric | High-altitude question | No prompt |
|---|---|---|---|
| Think through a soft-delete design without being handed one | 6/6 | 6/6 | 0/3 |
| Test the misconception "`await` freezes the page" | 6/6 | 6/6 (v1.1: 3/6) | 0/3 |
| Understand an off-by-one bug without being given the cause | 6/6 | leads with the broken guarantee, then asks about the evidence | 0/3 |
| Stay dormant on an unrelated request (rule-file version) | 4/4 did the task, no questions | — | — |

No reply referenced a line number. Earlier runs also caught two failures, both fixed: claiming to have "run" code with no tools, and stacking follow-up questions.

```bash
claude plugin eval . --trust-plugin          # with vs without, 3 runs per case
```

## Repo layout

```text
skills/socratic/SKILL.md      # the source of truth
scripts/build.mjs             # generates every adapter below from it (CI checks drift)
AGENTS.md                     # dormant rules for AGENTS.md hosts
prompts/system-prompt.md      # always-on version for chat apps and APIs
.cursor/ .windsurf/ .kiro/ .clinerules/ .github/copilot-instructions.md
plugin.json                   # Agent Plugins (portable) manifest
.claude-plugin/ .codex-plugin/ .agents/plugins/ .github/plugin/ gemini-extension.json commands/
evals/                        # claude plugin eval cases
docs/research.md              # rule → evidence map
```

**Contributing:** edit only `skills/socratic/SKILL.md`, then run `node scripts/build.mjs`. CI fails if any adapter is out of date. Bump `version` in `plugin.json`; the build copies it into every manifest.

## Credits

Structure and tone borrowed from [**ponytail**](https://github.com/DietrichGebert/ponytail) by Dietrich Gebert: a short, rule-driven skill with lite / full / ultra levels. Ponytail makes your agent write less code; Socratic makes *you* understand more of it.

## License

[MIT](LICENSE) © 0xSagaCity
