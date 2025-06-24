import { useState, useCallback, ChangeEvent, MouseEvent, useRef } from 'react'
import { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier/standalone'
import babel from 'prettier/plugins/babel'
import estree from 'prettier/plugins/estree'
import codeShift from 'jscodeshift'
import Highlighter from 'monaco-jsx-highlighter'

import useEsbuild from '../../../../hooks/useEsbuild'
import fetchPlugin from '../../../../config/esbuild/plugins/fetch-plugin'
import unpkgPathPlugin from '../../../../config/esbuild/plugins/unpkg-path-plugin'

const useForm = () => {
  const [input, setInput] = useState<string>('')
  const [codeEditor, setCodeEditor] = useState<string>('')
  const iframeRef = useRef<any>()
  const editorRef = useRef<any>()

  const { esbuild } = useEsbuild()

  const iframeHtml = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
          window.addEventListener('message',(event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"><h4> Runtime Error:</h4>' + err + '</div>'
              throw err;
            }
          }, false)
        </script>
      </body>
    </html>
  `

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    setInput(value)
  }, [])

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      iframeRef.current.srcdoc = iframeHtml

      const result = await esbuild?.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      })

      iframeRef.current.contentWindow.postMessage(
        result?.outputFiles[0].text,
        '*'
      )
    },
    [input, iframeHtml, esbuild]
  )

  const handleCodeEditorChange: EditorDidMount = useCallback(
    (getValue, monacoEditor) => {
      editorRef.current = monacoEditor

      monacoEditor.onDidChangeModelContent(() => {
        const value = getValue()
        setCodeEditor(value)
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
    []
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
    input,
    codeEditor,
    iframeHtml,
    iframeRef,
    handleChange,
    handleClick,
    handleCodeEditorChange,
    handleFormatClick,
  }
}

export default useForm
