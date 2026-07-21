import { readdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const buildDir = "build";

if (!existsSync(buildDir)) {
  console.error("Build directory not found.");
  console.error("Run: npm run bundle");
  process.exit(1);
}

const lambdas = readdirSync(buildDir, {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const lambda of lambdas) {
  const source = join(buildDir, lambda);
  const destination = join(buildDir, `${lambda}.zip`);

  console.log(`Creating ${lambda}.zip`);

  execSync(`cd "${source}" && zip -rq "../${lambda}.zip" .`);

  console.log(`✓ ${lambda}.zip`);
}

console.log("\nAll ZIP files created successfully.");