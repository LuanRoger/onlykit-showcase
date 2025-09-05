"use wasm";

function createArray(length: i32): Int32Array {
  return new Int32Array(length);
}

function randomizeArray(arr: Int32Array, max: i32): void {
  for (let i = 0, k = arr.length; i < k; ++i) {
    const value = i32(Math.random() * max);
    // biome-ignore lint/suspicious/noAssignInExpressions: Allow assignment in expressions for performance
    unchecked((arr[i] = value));
  }
}

export function generateRandomArray(size: i32, max: i32): Int32Array {
  const arr = createArray(size);
  randomizeArray(arr, max);

  return arr;
}
