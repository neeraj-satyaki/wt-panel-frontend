import { useEffect, useRef, useState } from 'react'

export function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [createSaleModal, setCreateSaleModal] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) close()
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [modalRef])

  function open() {
    setShowModal(true)
  }

  function close() {
    setShowModal(false)
  }

  return {
    isShow: showModal,
    open,
    close,
    modalRef,
    createSaleModal,
    setCreateSaleModal,
  }
}
