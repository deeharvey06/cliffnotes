import { FC } from 'react'
import MDEditor from '@uiw/react-md-editor'

import useTextEditor from './hooks/useTextEditor'

import './styles.css'

interface TextEditorProps {}

const TextEditor: FC<TextEditorProps> = () => {
  const {
    source,
    mdEditorWrapperRef,
    editing,
    handleEditorClick,
    handleSourceChange,
  } = useTextEditor()

  if (editing) {
    return (
      <div className='text-editor' ref={mdEditorWrapperRef}>
        <MDEditor value={source} onChange={handleSourceChange} />
      </div>
    )
  }

  return (
    <div className='text-editor card' onClick={handleEditorClick}>
      <div className='card-content'>
        <MDEditor.Markdown source={source} />
      </div>
    </div>
  )
}

export default TextEditor
