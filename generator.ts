import * as dotenv from "dotenv";
import { generate } from "@graphql-codegen/cli";

dotenv.config();

async function generation(token: String) {
  return generate(
    {
      schema: [
        {
          "https://api.github.com/graphql": {
            headers: {
              Authorization: `bearer ${token}`,
              "User-Agent": "mytestapp"
            }
          }
        }
      ],
      documents: "./src/**/*.gql",
      generates: {
        "src/github/generated/index.ts": {
          plugins: ["typescript", "typescript-operations"]
        },
        "./graphql.schema.json": {
          plugins: ["introspection"]
        }
      }
    },
    true
  );
}

const { GITHUB_TOKEN: githubToken } = process.env;

if (!githubToken) {
  throw new Error("no github token provided");
}

(async () => {
  try {
    await generation(githubToken);
    console.log("generation has done!");
  } catch (error) {
    console.error("generation failed!");
    console.error(error);
  }
})();
