import { existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const buildDir = "build";

const zips = readdirSync(buildDir)
  .filter(file => file.endsWith(".zip"));

for (const zip of zips) {

    const lambda =
        zip.replace(".zip","");

    console.log(`Deploying ${lambda}`);

    execSync(
        `aws lambda update-function-code \
        --function-name ${lambda} \
        --zip-file fileb://${join(buildDir,zip)}`,
        {
            stdio:"inherit"
        }
    );

    console.log(`✓ ${lambda} updated\n`);

}

console.log("Deployment Complete");