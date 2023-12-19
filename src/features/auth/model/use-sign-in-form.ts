import { useState } from 'react'

export function useShowPassword() {
  const [show, setShow] = useState<boolean>(false)
  return { isShow: show, toggle: () => setShow(!show) }
}
