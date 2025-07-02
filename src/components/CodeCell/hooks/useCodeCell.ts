import { useCallback, useEffect, useState } from 'react'

import useEsbuild from '../../../hooks/useEsbuild'

const useCodeCell = () => {
  const [code, setCode] = useState<string>('')
  const [input, setInput] = useState<string>('')

  const { buildService } = useEsbuild()

  const handleChangeCodeEditor = useCallback((value: string) => {
    setInput(value)
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await buildService(input)

      if (output) {
        setCode(output)
      } else {
        console.error('Esbuild failed to build the code.')
      }

      return () => {
        clearTimeout(timer)
      }
    }, 1000)
  }, [input, buildService])

  return {
    code,
    handleChangeCodeEditor,
  }
}

export default useCodeCell
