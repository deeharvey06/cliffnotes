import { useState, useCallback, ChangeEvent, MouseEvent, useRef } from 'react'

import useEsbuild from '../../../../hooks/useEsbuild'
import fetchPlugin from '../../../../config/esbuild/plugins/fetch-plugin'
import unpkgPathPlugin from '../../../../config/esbuild/plugins/unpkg-path-plugin'

const useForm = () => {
  const [input, setInput] = useState<string>('')
  const iframeRef = useRef<any>()
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

  return { input, iframeHtml, iframeRef, handleChange, handleClick }
}

export default useForm
