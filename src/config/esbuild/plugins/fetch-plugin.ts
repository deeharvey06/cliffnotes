import * as esbuild from 'esbuild-wasm'
import localforage from 'localforage'

import api from '../../../api/api'

type ContentsType = string | Uint8Array | undefined

const filecache = localforage.createInstance({
  name: 'filecache',
})

const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          }
        }

        const cachedResult = await filecache.getItem<esbuild.OnLoadResult>(
          args.path
        )

        if (cachedResult) {
          return cachedResult
        }

        const { data, request } = await api.get<ContentsType>(args.path)

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        }

        await filecache.setItem(args.path, result)

        return result
      })
    },
  }
}

export default fetchPlugin
