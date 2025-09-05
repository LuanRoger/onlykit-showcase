export function generateRandomArray(
  size: number,
  max: number = 10000,
): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}
