import { useState } from 'react'

export function useUnderStatusModal() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return {
    showModal,
    setShowModal,
  }
}
