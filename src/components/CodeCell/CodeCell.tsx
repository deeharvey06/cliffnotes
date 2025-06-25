import { FC } from 'react'

import CodeEditor from '../CodeEditor'
import Preview from '../Preview'

import useCodeCell from './hooks/useCodeCell'

interface CodeCellProps {}

const CodeCell: FC<CodeCellProps> = () => {
  const { code, handleChangeCodeEditor, handleClick } = useCodeCell()

  return (
    <div className='code-cell'>
      <CodeEditor
        initialValue={'const a = 1;'}
        onChange={handleChangeCodeEditor}
      />

      <div>
        <button className='button is-primary' onClick={handleClick}>
          Submit
        </button>
      </div>

      <Preview code={code} />
    </div>
  )
}

export default CodeCell
