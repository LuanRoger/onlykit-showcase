export type WasmRuntime = {
  memory: WebAssembly.Memory;
  __new(size: number, id: number): number;
  __pin(ptr: number): number;
  __unpin(ptr: number): void;
  __collect(): void;
  __rtti_base?: number;
};
export type WithRuntime<T> = T & WasmRuntime;

let helpers: WasmRuntime | null = null;

export function setASHelpers(h: WasmRuntime) {
  helpers = h;
}

export function wrapWasmModule<T extends object>(m: T): WithRuntime<T> {
  setASHelpers(m as unknown as WasmRuntime);
  return m as WithRuntime<T>;
}

// Optional global proxies if you want them
export const __new = (size: number, id: number) => {
  if (!helpers) throw new Error("WASM not initialized");
  return helpers.__new(size, id);
};
export const __pin = (ptr: number) => {
  if (!helpers) throw new Error("WASM not initialized");
  return helpers.__pin(ptr);
};
export const __unpin = (ptr: number) => {
  if (!helpers) throw new Error("WASM not initialized");
  return helpers.__unpin(ptr);
};
export const __collect = () => {
  if (!helpers) throw new Error("WASM not initialized");
  return helpers.__collect();
};
