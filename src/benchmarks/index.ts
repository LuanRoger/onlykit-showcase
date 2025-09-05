import { fibonacciBenchmark } from "./fibonacci";
import { quickSortBenchmark } from "./quick-sort";
import { sumArrayBenchmark } from "./sum-array";

async function main() {
  await fibonacciBenchmark();
  await sumArrayBenchmark();
  await quickSortBenchmark();
}

main();
