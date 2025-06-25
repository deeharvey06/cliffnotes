import { useState, useEffect } from 'react'
import * as esbuild from 'esbuild-wasm'

import initEsbuild from '../config/esbuild'
import unpkgPathPlugin from '../config/esbuild/plugins/unpkg-path-plugin'
import fetchPlugin from '../config/esbuild/plugins/fetch-plugin'

const useEsbuild = () => {
  const [esbuild, setEsbuild] = useState<esbuild.Service>()

  useEffect(() => {
    const init = async () => {
      const esbuildWasm = await initEsbuild()

      setEsbuild(esbuildWasm)
    }

    init()
  }, [])

  const buildService = async (rawCode: string) => {
    const result = await esbuild?.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    })

    return result?.outputFiles[0].text
  }

  return { esbuild, buildService }
}

export default useEsbuild
