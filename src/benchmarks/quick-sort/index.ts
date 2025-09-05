import { bench, group, run, summary } from "onlykit/benchmark";
import { quickSort } from "./impl";
import { quickSortWasm } from "./impl-wasm";

export async function quickSortBenchmark() {
  const arraySize = 1000;

  group(`quickSort(${arraySize})`, () => {
    summary(() => {
      bench("js", () => {
        quickSort(arraySize);
      });
      bench("wasm", () => {
        quickSortWasm(arraySize);
      });
    });
  });

  await run();
}
