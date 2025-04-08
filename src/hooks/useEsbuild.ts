import { useState, useEffect, useCallback } from 'react'
import * as esbuild from 'esbuild-wasm'

import initEsbuild from '../config/esbuild'
import api from '../api/api'

const useEsbuild = () => {
  const [esbuild, setEsbuild] = useState<esbuild.Service>()

  const unpkgPathPlugin = useCallback(() => {
    return {
      name: 'unpkg-path-plugin',
      setup(build: esbuild.PluginBuild) {
        build.onResolve({ filter: /.*/ }, async (args: any) => {
          console.log('onResolve', args)

          if (args.path === 'index.js') {
            return { path: args.path, namespace: 'a' }
          }

          if (args.path.includes('./') || args.path.includes('../')) {
            return {
              namespace: 'a',
              path: new URL(
                args.path,
                'https://unpkg.com' + args.resolveDir + '/'
              ).href,
            }
          }

          return {
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`,
          }
        })

        build.onLoad({ filter: /.*/ }, async (args: any) => {
          console.log('onLoad', args)

          if (args.path === 'index.js') {
            return {
              loader: 'jsx',
              contents: `
                const message = require('react');
                console.log(message);
              `,
            }
          }

          const { data, request } = await api.get<any>(args.path)

          return {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname,
          }
        })
      },
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      const esbuildWasm = await initEsbuild()

      setEsbuild(esbuildWasm)
    }

    init()
  }, [])

  return { esbuild, unpkgPathPlugin }
}

export default useEsbuild
