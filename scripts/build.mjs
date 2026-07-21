import { build } from "esbuild";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const lambdaRoot = "lambdas";

const lambdaFolders = readdirSync(lambdaRoot, {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const lambda of lambdaFolders) {
  console.log(`Building ${lambda}...`);

  await build({
    entryPoints: [join(lambdaRoot, lambda, "handler.ts")],
    outfile: join("build", lambda, "handler.js"),
    bundle: true,
    platform: "node",
    target: "node22",
    format: "esm",
    sourcemap: true,
    minify: false,
    packages: "external",
  });

  console.log(`✓ ${lambda} built`);
}

console.log("\nAll Lambdas built successfully.");