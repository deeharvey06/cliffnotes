import { useState, useRef, useEffect, useCallback, MouseEvent } from 'react'

const useTextEditor = () => {
  const mdEditorWrapperRef = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false)
  const [source, setSource] = useState('# Header')

  const handleClickListener = useCallback(
    (event: MouseEvent | globalThis.MouseEvent) => {
      if (
        mdEditorWrapperRef.current &&
        event.target &&
        (mdEditorWrapperRef.current.contains(event.target as Node) ||
          mdEditorWrapperRef.current === event.target)
      ) {
        // If the click is inside the editor wrapper, do not toggle editing
        return
      }

      setEditing(false)
    },
    []
  )

  const handleEditorClick = useCallback(() => {
    setEditing(true)
  }, [])

  const handleSourceChange = useCallback((value?: string) => {
    setSource(value || '')
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleClickListener, { capture: true })

    return () => {
      window.removeEventListener('click', handleClickListener, {
        capture: true,
      })
    }
  }, [editing, handleClickListener])

  return {
    source,
    mdEditorWrapperRef,
    editing,
    handleEditorClick,
    handleSourceChange,
  }
}

export default useTextEditor
