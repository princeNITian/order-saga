import { build } from "esbuild";
import { readdirSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const lambdaRoot = "lambdas";
const outputRoot = "build";

// Clean previous build
rmSync(outputRoot, {
  recursive: true,
  force: true,
});

// Discover all Lambda directories
const lambdas = readdirSync(lambdaRoot, {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const lambda of lambdas) {
  const outDir = join(outputRoot, lambda);

  mkdirSync(outDir, {
    recursive: true,
  });

  console.log(`\nBuilding ${lambda}...`);

  await build({
    entryPoints: [join(lambdaRoot, lambda, "handler.ts")],

    outfile: join(outDir, "handler.js"),

    bundle: true,

    platform: "node",

    target: "node22",

    format: "cjs",

    treeShaking: true,

    sourcemap: false,

    minify: false,

    legalComments: "none",
  });

  console.log(`✓ ${lambda} built successfully.`);
}

console.log("\n🎉 All Lambdas built successfully.");