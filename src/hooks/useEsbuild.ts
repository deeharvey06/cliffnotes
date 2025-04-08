import { useState, useEffect } from 'react'
import * as esbuild from 'esbuild-wasm'

import initEsbuild from '../config/esbuild'

const useEsbuild = () => {
  const [esbuild, setEsbuild] = useState<esbuild.Service>()

  useEffect(() => {
    const init = async () => {
      const esbuildWasm = await initEsbuild()

      setEsbuild(esbuildWasm)
    }

    init()
  }, [])

  return { esbuild }
}

export default useEsbuild
