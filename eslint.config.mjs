import js from "@eslint/js";
import next from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";
export default [...next, js.configs.recommended, ...tseslint.configs.recommended, { ignores: [".next/**", "node_modules/**", "coverage/**", "playwright-report/**"] }];
