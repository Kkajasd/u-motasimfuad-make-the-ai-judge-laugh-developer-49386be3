import { mkdirSync, writeFileSync } from "node:fs";

// One funny single-line excuse a developer gives when code breaks in
// production: every test passed, so the only test left unrun was the
// one environment that actually matters.
const LINE =
  "The code passed every test. Production is the test we forgot to write.";

// The gate: /output/entry.txt must be UTF-8 text of 1-200 characters, not
// only whitespace, a single line. Refuse to write anything outside it.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line is ${chars.length} characters, gate needs 1-200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${chars.length} chars to /output/entry.txt`);
