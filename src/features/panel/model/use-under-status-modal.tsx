import { useState } from 'react'

export function useUnderStatusModal() {
  const [showModal, setShowModal] = useState<boolean>(false)

  function open() {
    setShowModal(true)
  }
  function close() {
    setShowModal(false)
  }

  return {
    open,
    close,
    isShow: showModal,
  }
}
