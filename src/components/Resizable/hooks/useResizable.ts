import { useEffect, useState } from 'react'
import { ResizableBoxProps } from 'react-resizable'

const useResizable = (direction: 'horizontal' | 'vertical') => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth * 0.75)

  const isHorizontal = direction === 'horizontal'

  let resizableProps: ResizableBoxProps

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)

        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
      }, 100)
    }

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [width])

  if (isHorizontal) {
    resizableProps = {
      className: 'resizable-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (_event, data) => {
        setWidth(data.size.width)
      },
    }
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      onResizeStop: () => {},
    }
  }

  return resizableProps
}

export default useResizable
