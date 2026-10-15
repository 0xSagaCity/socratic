#!/usr/bin/env node
// Generates every host adapter from skills/socratic/SKILL.md and syncs manifest
// versions from plugin.json. `node scripts/build.mjs` writes; `--check` exits 1
// if anything is stale (CI). No dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const read = (p) => readFileSync(join(root, p), "utf8");

const skill = read("skills/socratic/SKILL.md");
const parts = skill.match(/^---\n([\s\S]*?)\n---\n+(# [^\n]+)\n([\s\S]*)$/);
if (!parts) throw new Error("SKILL.md: expected frontmatter followed by an H1");
const [, frontmatter, title, rest] = parts;
const folded = frontmatter.match(/^description: >\n((?: {2}.*\n?)+)/m);
if (!folded) throw new Error("SKILL.md: expected a folded `description: >` block");
const description = folded[1].trim().split(/\s*\n\s*/).join(" ");
const yamlDescription = JSON.stringify(description); // JSON strings are valid YAML

// Rule files are loaded on every turn by most hosts, so they stay dormant until asked.
const OPT_IN =
  '> **Off until the user asks for it.** Turn it on when they say "socratic", "teach me", "quiz me", "help me understand", "walk me through it" or "don\'t just give me the answer", or pick a level ("socratic lite|full|ultra"). Until then, ignore everything below and work normally.\n';
const ALWAYS_ON = "> **Mode is on from the first message.** Default level: full.\n";

const ruleBody = `${title}\n\n${OPT_IN}${rest}`;
const generated = {
  "AGENTS.md": ruleBody,
  ".github/copilot-instructions.md": ruleBody,
  ".clinerules/socratic.md": ruleBody,
  ".cursor/rules/socratic.mdc": `---\ndescription: ${yamlDescription}\nglobs:\nalwaysApply: false\n---\n\n${ruleBody}`,
  ".windsurf/rules/socratic.md": `---\ntrigger: model_decision\ndescription: ${yamlDescription}\n---\n\n${ruleBody}`,
  ".kiro/steering/socratic.md": `---\ninclusion: auto\nname: socratic\ndescription: ${yamlDescription}\n---\n\n${ruleBody}`,
  "prompts/system-prompt.md": `${title}\n\n${ALWAYS_ON}${rest}`,
};

const { version } = JSON.parse(read("plugin.json"));
for (const path of [
  ".claude-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".github/plugin/plugin.json",
  "gemini-extension.json",
]) {
  const manifest = JSON.parse(read(path));
  manifest.version = version;
  generated[path] = `${JSON.stringify(manifest, null, 2)}\n`;
}

const stale = [];
for (const [path, content] of Object.entries(generated)) {
  let current = null;
  try {
    current = read(path);
  } catch {}
  if (current === content) continue;
  stale.push(path);
  if (check) continue;
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
}

if (check && stale.length) {
  console.error(`Out of date, run \`node scripts/build.mjs\`:\n  ${stale.join("\n  ")}`);
  process.exit(1);
}
console.log(stale.length ? `Wrote ${stale.length} file(s):\n  ${stale.join("\n  ")}` : "All adapters up to date.");
