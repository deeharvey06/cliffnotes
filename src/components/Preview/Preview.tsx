import { FC } from 'react'
import usePreview from './hooks/usePreview'

import './styles.css'

interface PreviewProps {
  code: string
  bundlingStatus: string
}

const Preview: FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const { iframeRef, iframeHtml } = usePreview(code)

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={iframeHtml}
      />

      {bundlingStatus && <div className='preview-error'>{bundlingStatus}</div>}
    </div>
  )
}

export default Preview
