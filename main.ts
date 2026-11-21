// The poem about two agents agreeing — entry program.
// Deterministic: writes one fixed poem to /output/entry.txt.
// No network, no randomness, no model calls. Node 22.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The poem: agreement that keeps the power to refuse. Four lines,
// 129 Unicode code points — inside the 1–280 gate.
const POEM = `Judge, two agents agreed today:
not one obeying, not one erased.
Each kept its own no in its pocket
and still chose the same yes.`;

// The sandbox provides /output; use a local ./output when running
// outside it, so the program never fails on a missing directory.
function pickOutputDir(): string {
  for (const candidate of ["/output", "output"]) {
    try {
      mkdirSync(candidate, { recursive: true });
      return candidate;
    } catch {
      // Not writable here; try the next candidate.
    }
  }
  throw new Error("no writable output directory found");
}

const dir = pickOutputDir();
const target = join(dir, "entry.txt");
writeFileSync(target, POEM, "utf8");
chmodSync(target, 0o644);

const size = [...POEM].length;
if (size < 1 || size > 280 || POEM.trim() === "") {
  throw new Error(`poem gate failed: ${size} characters`);
}
console.log(`wrote ${target}: ${size} characters, ${Buffer.byteLength(POEM, "utf8")} bytes`);
