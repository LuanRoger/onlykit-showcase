import { barplot, bench, group, run, summary } from "onlykit/benchmark";

//#region src/benchmarks/fibonacci/impl.ts
function fib(n) {
	if (n <= 1) return n;
	return fib(n - 1) + fib(n - 2);
}

//#endregion
//#region src/benchmarks/fibonacci/impl-wasm.ts
async function instantiate$2(module, imports = {}) {
	const { exports } = await WebAssembly.instantiate(module, imports);
	return exports;
}
const { memory: memory$2, fibWasm } = await (async (url) => instantiate$2(await (async () => {
	const isNodeOrBun = typeof process != "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
	if (isNodeOrBun) return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url));
	else return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url));
})(), {}))(new URL(new URL("wasm/2ee75940-impl-wasm.wasm", import.meta.url).href));

//#endregion
//#region src/benchmarks/fibonacci/index.ts
async function fibonacciBenchmark() {
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

//#endregion
//#region src/utils/array.ts
function generateRandomArray(size, max = 1e4) {
	const arr = [];
	for (let i = 0; i < size; i++) arr.push(Math.floor(Math.random() * max));
	return arr;
}

//#endregion
//#region src/benchmarks/quick-sort/impl.ts
function quickSort(size) {
	const arr = generateRandomArray(size, 1e3);
	arr.sort((a, b) => a - b);
	return arr;
}

//#endregion
//#region src/benchmarks/quick-sort/impl-wasm.ts
async function instantiate$1(module, imports = {}) {
	const adaptedImports = { env: Object.setPrototypeOf({
		abort(message, fileName, lineNumber, columnNumber) {
			message = __liftString(message >>> 0);
			fileName = __liftString(fileName >>> 0);
			lineNumber = lineNumber >>> 0;
			columnNumber = columnNumber >>> 0;
			(() => {
				throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
			})();
		},
		seed() {
			return (() => {
				return Date.now() * Math.random();
			})();
		}
	}, Object.assign(Object.create(globalThis), imports.env || {})) };
	const { exports } = await WebAssembly.instantiate(module, adaptedImports);
	const memory$3 = exports.memory || imports.env.memory;
	const adaptedExports = Object.setPrototypeOf({ quickSortWasm(size) {
		return __liftTypedArray(Int32Array, exports.quickSortWasm(size) >>> 0);
	} }, exports);
	function __liftString(pointer) {
		if (!pointer) return null;
		const end = pointer + new Uint32Array(memory$3.buffer)[pointer - 4 >>> 2] >>> 1, memoryU16 = new Uint16Array(memory$3.buffer);
		let start = pointer >>> 1, string = "";
		while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
		return string + String.fromCharCode(...memoryU16.subarray(start, end));
	}
	function __liftTypedArray(constructor, pointer) {
		if (!pointer) return null;
		return new constructor(memory$3.buffer, __getU32(pointer + 4), __dataview.getUint32(pointer + 8, true) / constructor.BYTES_PER_ELEMENT).slice();
	}
	let __dataview = new DataView(memory$3.buffer);
	function __getU32(pointer) {
		try {
			return __dataview.getUint32(pointer, true);
		} catch {
			__dataview = new DataView(memory$3.buffer);
			return __dataview.getUint32(pointer, true);
		}
	}
	return adaptedExports;
}
const { memory: memory$1, quickSortWasm } = await (async (url) => instantiate$1(await (async () => {
	const isNodeOrBun = typeof process != "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
	if (isNodeOrBun) return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url));
	else return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url));
})(), {}))(new URL(new URL("wasm/b0a00124-impl-wasm.wasm", import.meta.url).href));

//#endregion
//#region src/benchmarks/quick-sort/index.ts
async function quickSortBenchmark() {
	const arraySize = 1e3;
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

//#endregion
//#region src/benchmarks/sum-array/impl.ts
function sumArray(size) {
	const arr = generateRandomArray(size, 1e3);
	let total = 0;
	for (let i = 0; i < size; ++i) total += arr[i];
	return total;
}

//#endregion
//#region src/benchmarks/sum-array/impl-wasm.ts
async function instantiate(module, imports = {}) {
	const adaptedImports = { env: Object.setPrototypeOf({
		abort(message, fileName, lineNumber, columnNumber) {
			message = __liftString(message >>> 0);
			fileName = __liftString(fileName >>> 0);
			lineNumber = lineNumber >>> 0;
			columnNumber = columnNumber >>> 0;
			(() => {
				throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
			})();
		},
		seed() {
			return (() => {
				return Date.now() * Math.random();
			})();
		}
	}, Object.assign(Object.create(globalThis), imports.env || {})) };
	const { exports } = await WebAssembly.instantiate(module, adaptedImports);
	const memory$3 = exports.memory || imports.env.memory;
	function __liftString(pointer) {
		if (!pointer) return null;
		const end = pointer + new Uint32Array(memory$3.buffer)[pointer - 4 >>> 2] >>> 1, memoryU16 = new Uint16Array(memory$3.buffer);
		let start = pointer >>> 1, string = "";
		while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
		return string + String.fromCharCode(...memoryU16.subarray(start, end));
	}
	return exports;
}
const { memory, sumArrayWasm } = await (async (url) => instantiate(await (async () => {
	const isNodeOrBun = typeof process != "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
	if (isNodeOrBun) return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url));
	else return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url));
})(), {}))(new URL(new URL("wasm/34f40842-impl-wasm.wasm", import.meta.url).href));

//#endregion
//#region src/benchmarks/sum-array/index.ts
async function sumArrayBenchmark() {
	const arraySize = 1e3;
	group("sumArray", () => {
		summary(() => {
			bench("js", () => {
				sumArray(arraySize);
			});
			bench("wasm", () => {
				sumArrayWasm(arraySize);
			});
		});
	});
	await run();
}

//#endregion
//#region src/benchmarks/index.ts
async function main() {
	await fibonacciBenchmark();
	await sumArrayBenchmark();
	await quickSortBenchmark();
}
main();

//#endregion
export {  };