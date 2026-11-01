import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({ test: { include: ["tests/unit/**/*.test.ts"], environment: "node" }, resolve: { alias: { "@radar/domain": path.resolve(__dirname, "packages/domain/src/index.ts"), "@radar/providers": path.resolve(__dirname, "packages/providers/src/index.ts") } });
