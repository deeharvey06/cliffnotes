import { FC } from 'react'

import useForm from './hooks/useForm'

const Form: FC = () => {
  const { input, code, handleChange, handleClick } = useForm()

  return (
    <div>
      <textarea name='input' value={input} onChange={handleChange} />

      <div>
        <button onClick={handleClick}>Submit</button>
      </div>

      <pre>{code}</pre>
    </div>
  )
}

export default Form
