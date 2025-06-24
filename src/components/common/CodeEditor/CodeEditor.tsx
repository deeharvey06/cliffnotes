import { FC } from 'react'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'

import './syntax.css'
import './styles.css'

interface CodeEditorProps {
  initialValue: string
  onChange: EditorDidMount
  onFormatClick: () => void
}

const CodeEditor: FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  onFormatClick,
}) => {
  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>

      <MonacoEditor
        editorDidMount={onChange}
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
