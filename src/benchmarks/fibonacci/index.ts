import { barplot, bench, group, run, summary } from "onlykit/benchmark";
import { fib } from "./impl";
import { fibWasm } from "./impl-wasm";

export async function fibonacciBenchmark() {
  group("fib", () => {
    group("fib(5)", () => {
      summary(() => {
        barplot(() => {
          bench("js", () => fib(5));
          bench("wasm", () => fibWasm(5));
        });
      });
    });
    group("fib(20)", () => {
      summary(() => {
        barplot(() => {
          bench("js", () => fib(20));
          bench("wasm", () => fibWasm(20));
        });
      });
    });
    group("fib(40)", () => {
      summary(() => {
        barplot(() => {
          bench("js", () => fib(40));
          bench("wasm", () => fibWasm(40));
        });
      });
    });
  });

  await run();
}
