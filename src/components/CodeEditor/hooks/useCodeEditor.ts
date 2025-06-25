import { useCallback, useRef } from 'react'
import codeShift from 'jscodeshift'
import Highlighter from 'monaco-jsx-highlighter'
import prettier from 'prettier/standalone'
import babel from 'prettier/plugins/babel'
import estree from 'prettier/plugins/estree'
import { EditorDidMount } from '@monaco-editor/react'

type onChange = (value: string) => void

const useCodeEditor = (onChange: onChange) => {
  const editorRef = useRef<any>()

  const handleCodeEditorChange: EditorDidMount = useCallback(
    (getValue, monacoEditor) => {
      editorRef.current = monacoEditor

      monacoEditor.onDidChangeModelContent(() => {
        const value = getValue()
        onChange(value)
      })

      monacoEditor.getModel()?.updateOptions({
        tabSize: 2,
      })

      const highlighter = new Highlighter(
        //@ts-ignore
        window.monaco,
        codeShift,
        monacoEditor
      )

      highlighter.highLightOnDidChangeModelContent(
        () => {},
        () => {},
        undefined,
        () => {}
      )
    },
    [onChange]
  )

  const handleFormatClick = useCallback(async () => {
    const unformatted = editorRef.current.getModel().getValue()

    let formatted = await prettier.format(unformatted, {
      parser: 'babel',
      plugins: [babel, estree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    })

    formatted = formatted.replace(/\n$/, '')

    editorRef.current.setValue(formatted)
  }, [editorRef])

  return {
    handleCodeEditorChange,
    handleFormatClick,
  }
}

export default useCodeEditor
