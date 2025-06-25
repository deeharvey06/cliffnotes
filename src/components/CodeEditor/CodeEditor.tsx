import { FC } from 'react'
import MonacoEditor from '@monaco-editor/react'

import useCodeEditor from './hooks/useCodeEditor'

import './syntax.css'
import './styles.css'

export interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const { handleCodeEditorChange, handleFormatClick } = useCodeEditor(onChange)

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={handleFormatClick}
      >
        Format
      </button>

      <MonacoEditor
        editorDidMount={handleCodeEditorChange}
        value={initialValue}
        language='javascript'
        theme='dark'
        height='500px'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          linesNumbersMinChar: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}
export default CodeEditor
