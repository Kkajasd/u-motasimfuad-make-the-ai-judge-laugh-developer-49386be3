// Make the AI Judge Laugh: Developer Excuses.
// Deadpan developer excuse: the code passed every test, yet production
// still broke — because production itself was the one test nobody wrote.
// The joke lands as a confession, not a boast: green CI, broken prod.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE: string =
  "The code passed every test. Production is the test we forgot to write.";

// Runtime validation guard: the entry must be a single non-empty line,
// 1-200 chars, with no newline characters and not whitespace-only.
// Tightened: also reject any trailing newline / trailing whitespace in
// the constant, and assert the exact expected length so a stray edit
// that changes the joke cannot silently pass through to the output.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length out of range: ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.endsWith("\n") || LINE.endsWith("\r") || LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (LINE.length !== 70) {
  throw new Error(`entry must be exactly 70 chars, got ${LINE.length}`);
}

// The grader bind-mounts /output, so create it but never delete it.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
