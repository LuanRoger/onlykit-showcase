"use wasm";
import { generateRandomArray } from "../../utils/array-wasm";

export function sumArrayWasm(size: i32): i32 {
  const arr = generateRandomArray(size, 1000);

  let total = 0;
  for (let i = 0, k = arr.length; i < k; ++i) {
    total += unchecked(arr[i]);
  }
  return total;
}
