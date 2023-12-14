import { Button } from '@/shared/ui/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/ui/popover'

type Status =
  | 'Передан в ТК'
  | 'Создан'
  | 'В пути'
  | 'Готов к выдаче'
  | 'Вручен'
  | 'Ожидание'
  | 'Выполняется'
  | 'Готов'

type Props = {
  subProcessing: string
  processing: string
}

const statusColors: Record<Status, string> = {
  Готов: 'bg-green-600 text-white',
  Ожидание: 'bg-gray-100',
  Выполняется: 'bg-gray-100',
  'Передан в ТК': 'bg-gray-100',
  Создан: 'bg-gray-100',
  'В пути': 'bg-gray-100',
  'Готов к выдаче': 'bg-gray-100',
  Вручен: 'bg-gray-100',
}

export function UnderStatusModal({ subProcessing, processing }: Props) {
  const highlightStatus = (status: Status) =>
    subProcessing === status ? statusColors[status] : 'bg-gray-100'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={subProcessing === 'Готов' ? 'success' : 'outline'}>
          {subProcessing}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div onClick={(e) => e.preventDefault()}>
          {processing === 'Отправлено клиенту' && (
            <div>
              {(
                [
                  'Передан в ТК',
                  'Создан',
                  'В пути',
                  'Готов к выдаче',
                  'Вручен',
                ] as Status[]
              ).map((status) => (
                <div
                  key={status}
                  className={`py-2 px-4 text-center rounded-lg text-sm ${highlightStatus(
                    status,
                  )}`}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
          {processing !== 'Отправлено клиенту' && (
            <>
              {(['Ожидание', 'Выполняется', 'Готов'] as Status[]).map((status) => (
                <div
                  key={status}
                  className={`py-2 px-4 text-center rounded-lg text-sm ${highlightStatus(
                    status,
                  )}`}
                >
                  {status}
                </div>
              ))}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
