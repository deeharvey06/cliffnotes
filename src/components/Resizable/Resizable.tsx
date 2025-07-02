import { FC, ReactNode } from 'react'
import { ResizableBox } from 'react-resizable'

import useResizable from './hooks/useResizable'
import './styles.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children?: ReactNode
}

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  const {
    className,
    height,
    width,
    minConstraints,
    maxConstraints,
    resizeHandles,
  } = useResizable(direction)

  return (
    <ResizableBox
      className={className}
      width={width}
      height={height}
      minConstraints={minConstraints}
      maxConstraints={maxConstraints}
      resizeHandles={resizeHandles}
    >
      {children}
    </ResizableBox>
  )
}

export default Resizable
