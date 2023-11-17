import { useEffect, useRef, useState } from 'react'

export function useChangeModal() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [createSaleModal, setCreateSaleModal] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [modalRef])

  return {
    showModal,
    setShowModal,
    modalRef,
    createSaleModal,
    setCreateSaleModal,
  }
}
