import * as esbuild from 'esbuild-wasm'

const initEsbuild = async () => {
  const esbuildWasm = await esbuild.startService({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
  })

  return esbuildWasm
}

export default initEsbuild
