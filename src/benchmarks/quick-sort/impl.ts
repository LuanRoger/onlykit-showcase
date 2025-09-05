import { generateRandomArray } from "../../utils/array";

export function quickSort(size: number): number[] {
  const arr = generateRandomArray(size, 1000);
  arr.sort((a, b) => a - b);

  return arr;
}
