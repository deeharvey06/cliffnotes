import { useEffect, useRef } from 'react'

const iframeHtml = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
          const handleError = (err) => {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"><h4> Runtime Error:</h4>' + err + '</div>'
              throw err;
          }

          window.addEventListener('error',(event) => {
            event.preventDefault()
            handleError(event.error)
          })

          window.addEventListener('message',(event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `

const usePreview = (code: string) => {
  const iframeRef = useRef<any>()

  useEffect(() => {
    iframeRef.current.srcdoc = iframeHtml
    const timer = setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [code])

  return {
    iframeRef,
    iframeHtml,
  }
}

export default usePreview
