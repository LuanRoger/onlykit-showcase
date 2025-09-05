import { generateRandomArray } from "../../utils/array";

export function sumArray(size: number): number {
  const arr = generateRandomArray(size, 1000);

  let total = 0;
  for (let i = 0; i < size; ++i) {
    total += arr[i];
  }
  return total;
}
