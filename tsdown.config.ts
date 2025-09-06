import { defineConfig, tsdownConfig } from "onlykit/dev";

export default defineConfig({
  ...tsdownConfig,
  entry: {
    "benchmarks": "./src/benchmarks/index.ts",
    "server": "./src/server/index.ts",
  }
});
