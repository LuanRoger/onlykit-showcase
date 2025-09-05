(module
 (type $0 (func (param i32) (result i32)))
 (memory $0 0)
 (export "fibWasm" (func $src/benchmarks/fibonacci/2ee75940-impl-wasm/fibWasm))
 (export "memory" (memory $0))
 (func $src/benchmarks/fibonacci/2ee75940-impl-wasm/fibWasm (param $0 i32) (result i32)
  local.get $0
  i32.const 1
  i32.le_s
  if
   local.get $0
   return
  end
  local.get $0
  i32.const 1
  i32.sub
  call $src/benchmarks/fibonacci/2ee75940-impl-wasm/fibWasm
  local.get $0
  i32.const 2
  i32.sub
  call $src/benchmarks/fibonacci/2ee75940-impl-wasm/fibWasm
  i32.add
 )
)
