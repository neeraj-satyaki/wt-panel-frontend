import clsx from 'clsx'
import { useUnderStatusModal } from '../../model/use-table'

export const SubStatus = ({ subStatus }: { subStatus: string }) => {
  const underStatusModal = useUnderStatusModal()

  return (
    <div>
      <div className="py-3" onMouseEnter={() => underStatusModal.open()} onMouseLeave={() => underStatusModal.close()}>
        {subStatus}
      </div>
      {underStatusModal.isShow && (
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
