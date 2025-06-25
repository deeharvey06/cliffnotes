import { FC } from 'react'
import usePreview from './hooks/usePreview'

interface PreviewProps {
  code: string
}

const Preview: FC<PreviewProps> = ({ code }) => {
  const { iframeRef, iframeHtml } = usePreview(code)

  return (
    <iframe
      title='preview'
      ref={iframeRef}
      sandbox='allow-scripts'
      srcDoc={iframeHtml}
    />
  )
}

export default Preview
