import fs from "node:fs";
import path from "node:path";
const failures = [];
const patterns = [/\blorem ipsum\b/i, /\bjoin thousands\b/i, /\bguaranteed (?:job|income|client)\b/i, /\b\d+[,+]?\s*(?:graduates|students|clients trained)\b/i];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.includes(".test.")) {
      const content = fs.readFileSync(full, "utf8");
      patterns.forEach((pattern) => { if (pattern.test(content)) failures.push(`${full}: ${pattern}`); });
    }
  }
}
walk(path.join(process.cwd(), "src"));
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log("Content trust guard passed.");
