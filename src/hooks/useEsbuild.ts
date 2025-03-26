import { useState, useEffect } from 'react'
import { Service } from 'esbuild-wasm'

import initEsbuild from '../config/esbuild'

const useEsbuild = () => {
  const [esbuild, setEsbuild] = useState<Service>()

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
