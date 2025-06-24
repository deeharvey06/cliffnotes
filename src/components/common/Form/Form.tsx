import { FC } from 'react'

import CodeEditor from '../CodeEditor'

import useForm from './hooks/useForm'

const Form: FC = () => {
  const {
    input,
    iframeHtml,
    iframeRef,
    handleChange,
    handleClick,
    handleCodeEditorChange,
    handleFormatClick,
  } = useForm()

  return (
    <div>
      <CodeEditor
        initialValue={'const a = 1;'}
        onChange={handleCodeEditorChange}
        onFormatClick={handleFormatClick}
      />

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
