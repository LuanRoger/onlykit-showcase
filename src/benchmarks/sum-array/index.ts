import { bench, group, run, summary } from "onlykit/benchmark";
import { sumArray } from "./impl";
import { sumArrayWasm } from "./impl-wasm";

export async function sumArrayBenchmark() {
  const arraySize = 1000;

  group("sumArray", () => {
    summary(() => {
      bench("js", () => {
        sumArray(arraySize);
      });
      bench("wasm", () => {
        sumArrayWasm(arraySize);
      });
    });
  });

  await run();
}
