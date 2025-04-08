import { useState, useCallback, ChangeEvent, MouseEvent } from 'react'

import useEsbuild from '../../../../hooks/useEsbuild'
import { unpkgPathPlugin } from '../../../../config/esbuild/plugins/unpkg-path-plugin'

const useForm = () => {
  const [input, setInput] = useState<string>('')
  const [code, setCode] = useState('')
  const { esbuild } = useEsbuild()

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    setInput(value)
  }, [])

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      const result = await esbuild?.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin()],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      })

      setCode(result?.outputFiles[0].text || '')
    },
    [esbuild]
  )

  return { input, code, handleChange, handleClick }
}

export default useForm
