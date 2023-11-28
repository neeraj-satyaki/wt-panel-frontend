import React, { useEffect, useRef, useState } from 'react'

type Props = {
  subProcessing: string
  processing: string
}

export function UnderStatusModal({ subProcessing, processing }: Props) {
  const [subProcessingModal, setSubProcessingModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClose = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setSubProcessingModal(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClose)

    return () => {
      document.removeEventListener('mousedown', handleClose)
    }
  }, [])

  const highlightStatus = (status: string) =>
    subProcessing === status ? 'bg-green-500' : ''

  return (
    <div className="relative">
      <button onClick={() => setSubProcessingModal(!subProcessingModal)} ref={buttonRef}>
        {subProcessing}
      </button>
      {subProcessingModal && (
        <div ref={modalRef}>
          {processing === 'Отправлено клиенту' && (
            <div className="shadow-lg absolute w-full top-7 border bg-blue-50 flex flex-col z-10 rounded-lg">
              <div className={`py-2 ${highlightStatus('Передан в ТК')}`}>
                Передан в ТК
              </div>
              <div className={`py-2 ${highlightStatus('Создан')}`}>Создан</div>
              <div className={`py-2 ${highlightStatus('В пути')}`}>В пути</div>
              <div className={`py-2 ${highlightStatus('Готов к выдаче')}`}>
                Готов к выдаче
              </div>
              <div className={`py-2 ${highlightStatus('Вручен')}`}>Вручен</div>
            </div>
          )}
          {processing !== 'Отправлено клиенту' && (
            <div className="shadow-lg absolute w-full top-7 border bg-blue-50 flex flex-col z-10 rounded-sm">
              <div className={`py-2 ${highlightStatus('Ожидание')}`}>Ожидание</div>
              <div className={`py-2 ${highlightStatus('Выполняется')}`}>Выполняется</div>
              <div className={`py-2 ${highlightStatus('Готов')}`}>Готов</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
