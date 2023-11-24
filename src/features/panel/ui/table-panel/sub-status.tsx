import React from 'react'
import clsx from 'clsx'
import { useUnderStatusModal } from '../../model/use-table'

type Props = {
  subStatus: string
}

export const SubStatus = ({ subStatus }: Props) => {
  const underStatusModal = useUnderStatusModal()

  // Возможные статусы и их стили
  const statusStyles = {
    Ожидание: 'bg-green-600/70 text-white',
    Выполняется: 'bg-green-600/70 text-white',
    Готов: 'bg-green-600/70 text-white',
  }

  return (
    <div onMouseEnter={underStatusModal.open} onMouseLeave={underStatusModal.close}>
      <div>{subStatus}</div>
      {underStatusModal.isShow && (
        <div className="absolute z-20 rounded-sm overflow-hidden top-0 left-0 shadow-xl bg-white backdrop-blur-sm w-full">
          {Object.entries(statusStyles).map(([status, style]) => (
            <div
              key={status}
              className={clsx('py-2', {
                [style]: subStatus === status,
              })}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
