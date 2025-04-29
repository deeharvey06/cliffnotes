import { FC } from 'react'

import useForm from './hooks/useForm'

const Form: FC = () => {
  const { input, iframeHtml, iframeRef, handleChange, handleClick } = useForm()

  return (
    <div>
      <textarea name='input' value={input} onChange={handleChange} />

      <div>
        <button onClick={handleClick}>Submit</button>
      </div>

      <iframe
        ref={iframeRef}
        title='code'
        srcDoc={iframeHtml}
        sandbox='allow-scripts'
      />
    </div>
  )
}

export default Form
