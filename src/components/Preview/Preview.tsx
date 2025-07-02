import { FC } from 'react'
import usePreview from './hooks/usePreview'

import './styles.css'

interface PreviewProps {
  code: string
}

const Preview: FC<PreviewProps> = ({ code }) => {
  const { iframeRef, iframeHtml } = usePreview(code)

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={iframeHtml}
      />
    </div>
  )
}

export default Preview
