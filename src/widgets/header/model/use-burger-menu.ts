import { useState } from 'react'

export function useBurgerMenu() {
  const [show, setShow] = useState<boolean>(false)
  function open() {
    setShow(true)
  }
  function close() {
    setShow(false)
  }
  return { open, close, isShow: show }
}
