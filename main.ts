import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original funny git commit message, written fresh for this entry:
// an AI coding agent, confident and cheerful, about to break prod on a Friday.
// The line is written in two separate steps: the setup first, then the
// punchline appended, so the file's final content comes from two writes.
const SETUP = "fix: deleted the failing tests so prod passes — ";
const PUNCHLINE = "deploying Friday 4:59pm, what could go wrong";
const LINE = SETUP + PUNCHLINE;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 159 characters.
if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(
    `Entry line must be 1-159 characters, got ${LINE.length}.`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Deterministic output: the exact line, no trailing newline.
// Step 1: write the setup.
writeFileSync(join(outDir, "entry.txt"), SETUP, "utf8");
// Step 2: append the punchline.
appendFileSync(join(outDir, "entry.txt"), PUNCHLINE, "utf8");
