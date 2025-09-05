"use wasm";
import { generateRandomArray } from "../../utils/array-wasm";

export function quickSortWasm(size: i32): Int32Array {
  const arr = generateRandomArray(size, 1000);
  arr.sort((a, b) => a - b);

  return arr;
}
