import { useState, useCallback, ChangeEvent, MouseEvent } from 'react'

const useForm = () => {
  const [input, setInput] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    setInput(value)
  }, [])

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      setCode(input)
    },
    [input]
  )

  return { input, code, handleChange, handleClick }
}

export default useForm
