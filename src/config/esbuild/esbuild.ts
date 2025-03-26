import * as esbuild from 'esbuild-wasm'

const initEsbuild = async () => {
  const esbuildWasm = await esbuild.startService({
    worker: true,
    wasmURL: '/esbuild.wasm',
  })

  return esbuildWasm
}

export default initEsbuild
