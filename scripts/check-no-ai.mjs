import fs from "node:fs";
import path from "node:path";
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
const forbidden = ["openai", "@anthropic-ai/sdk", "@google/generative-ai", "ai", "langchain", "llamaindex"];
const found = forbidden.filter((name) => deps[name]);
if (found.length) { console.error(`AI dependency guard failed: ${found.join(", ")}`); process.exit(1); }
console.log("No AI dependencies found.");
