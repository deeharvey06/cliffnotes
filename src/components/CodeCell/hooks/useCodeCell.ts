import { useCallback, useState } from 'react'

import useEsbuild from '../../../hooks/useEsbuild'

const useCodeCell = () => {
  const [code, setCode] = useState<string>('')
  const [input, setInput] = useState<string>('')

  const { buildService } = useEsbuild()

  const handleChangeCodeEditor = useCallback((value: string) => {
    setInput(value)
  }, [])

  const handleClick = useCallback(async () => {
    const output = await buildService(input)

    if (output) {
      setCode(output)
    } else {
      console.error('Esbuild failed to build the code.')
    }
  }, [input, buildService])

  return {
    code,
    handleChangeCodeEditor,
    handleClick,
  }
}

export default useCodeCell
