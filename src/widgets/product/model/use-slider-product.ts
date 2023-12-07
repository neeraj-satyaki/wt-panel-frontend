import { useState } from 'react'

export function useSliderProduct() {
  const [show, setShow] = useState<boolean>(false)

  function open() {
    setShow(true)
  }
  function close() {
    setShow(false)
  }

  return { isShow: show, open, close }
}
