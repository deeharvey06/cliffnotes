import { FC } from 'react'

import CodeEditor from '../CodeEditor'
import Preview from '../Preview'
import Resizable from '../Resizable'

import useCodeCell from './hooks/useCodeCell'

import './styles.css'

interface CodeCellProps {}

const CodeCell: FC<CodeCellProps> = () => {
  const { code, err, handleChangeCodeEditor } = useCodeCell()

  return (
    <Resizable direction='vertical'>
      <div className='code-cell'>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={'const a = 1;'}
            onChange={handleChangeCodeEditor}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  )
}

export default CodeCell
