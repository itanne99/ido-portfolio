import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const eslintConfig = defineConfig([
  ...nextVitals,
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            req: true,
            res: true,
          },
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
