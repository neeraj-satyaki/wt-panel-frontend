import { useEffect, useRef, useState } from 'react'

export function useModalSettings() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        close()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [modalRef])

  function close() {
    setShowModal(false)
  }
  function open() {
    setShowModal(true)
  }

  return {
    isShow: showModal,
    open,
    close,
    modalRef,
  }
}
