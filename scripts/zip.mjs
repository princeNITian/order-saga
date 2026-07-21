import {
  readdirSync,
  existsSync,
  rmSync,
} from "node:fs";

import { execSync } from "node:child_process";
import { join } from "node:path";

const buildDir = "build";

if (!existsSync(buildDir)) {
  console.error("Run npm run bundle first.");
  process.exit(1);
}

const lambdas = readdirSync(buildDir, {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const lambda of lambdas) {
  const source = join(buildDir, lambda);

  const zip = join(buildDir, `${lambda}.zip`);

  rmSync(zip, {
    force: true,
  });

  console.log(`Creating ${lambda}.zip`);

  execSync(
    `cd "${source}" && zip -rq "../${lambda}.zip" .`,
    {
      stdio: "inherit",
    }
  );

  console.log(`✓ ${lambda}.zip`);
}

console.log("\nAll ZIP files created.");