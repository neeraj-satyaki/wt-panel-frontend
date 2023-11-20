import { useEffect, useRef, useState } from 'react'

export function useSliderProduct() {
  const [show, setShow] = useState<boolean>(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (sliderRef.current && !sliderRef.current.contains(event.target as Node)) {
      close() // вызов функции закрытия окна
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sliderRef])

  function open() {
    setShow(true)
  }
  function close() {
    setShow(false)
  }

  return { isShow: show, open, close, sliderRef }
}
