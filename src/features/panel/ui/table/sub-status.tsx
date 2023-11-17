import clsx from 'clsx'
import { useUnderStatusModal } from '../../model/use-under-status-modal'

export const SubStatus = ({ subStatus }: { subStatus: string }) => {
  const { setShowModal, showModal } = useUnderStatusModal()

  return (
    <div>
      <div
        className="py-3"
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
      >
        {subStatus}
      </div>
      {showModal && (
        <div className="absolute border z-20 rounded-lg overflow-hidden shadow-2xl bg-white">
          <div
            className={clsx('px-6 py-2', {
              'bg-green-600 text-white font-bold': subStatus === 'Ожидание',
            })}
          >
            Ожидание
          </div>
          <div
            className={clsx('px-6 py-2', {
              'bg-green-600 text-white font-bold': subStatus === 'Выполняется',
            })}
          >
            Выполняется
          </div>
          <div
            className={clsx('px-6 py-2', {
              'bg-green-600 text-white font-bold': subStatus === 'Готов',
            })}
          >
            Готов
          </div>
        </div>
      )}
    </div>
  )
}
