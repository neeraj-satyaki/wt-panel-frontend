import { Calendar } from '@/shared/ui/components/ui/calendar'
import ru from 'date-fns/locale/ru'
import { useEffect, useState } from 'react'
import { useGetTimewWork } from '@/entities/user/api'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import format from 'date-fns/format'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { DayModifiers } from 'react-day-picker'
import { isWeekend } from 'date-fns'
import { Separator } from '@/shared/ui/components/ui/separator'

type Props = {
  userId: string
}

export const WorkTimesInfo = ({ userId }: Props) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())
  const [startDate, setStartDate] = useState<string>(
    format(startOfMonth(new Date()), 'dd.MM.yyyy'),
  )
  const [endDate, setEndDate] = useState<string>(
    format(endOfMonth(new Date()), 'dd.MM.yyyy'),
  )
  const timeWorks = useGetTimewWork(userId, startDate, endDate)

  const handleMonthChange = (date: Date) => {
    const startOfMonthDate = startOfMonth(date)
    const endOfMonthDate = endOfMonth(date)

    setStartDate(format(startOfMonthDate, 'dd.MM.yyyy'))
    setEndDate(format(endOfMonthDate, 'dd.MM.yyyy'))
  }
  useEffect(() => {
    timeWorks.refetch()
  }, [startDate, endDate])

  const modifiers: DayModifiers = {
    weekend: (date) => isWeekend(date), // функция, возвращающая true для выходных дней
  }

  const modifiersClassNames = {
    weekend: 'bg-green-200 disabled',
  }

  return (
    <div className="flex flex-col items-start">
      <div>
        <UiHeading level={'2'}>Информация о рабочем времени</UiHeading>
        {timeWorks.isLoading && <div>Загрузка...</div>}
        {timeWorks.isError && <div>Ошибка</div>}
        {!timeWorks.data && !timeWorks.isLoading && <div>Данных нет</div>}
        {timeWorks.data && (
          <>
            <div>Рабочих дней: {Math.round(timeWorks.data.workDaysCount)}</div>
            <div>Норма часов: {Math.round(timeWorks.data.workDaysCount) * 8}</div>
            <div>Отработано: {Math.round(timeWorks.data.totalWorkHours)} ч</div>
            <div>Опозданий: {timeWorks.data.lateArrivalsCount}</div>
            <div>Переработок: {timeWorks.data.overtimesCount}</div>
            <div>Отсутсвий: {timeWorks.data.absencesCount}</div>
            <div className="w-28">
              <Separator orientation="horizontal" className="my-2" />
            </div>

            {selectedDay && (
              <>
                <div>
                  {timeWorks.data.workTimes
                    .filter((item) => item.day === format(selectedDay, 'dd.MM.yyyy'))
                    .map((item, i) => (
                      <div key={i}>
                        Начало: {item.startTime} - Конец: {item.endTime}
                      </div>
                    ))}
                </div>
                <div>{isWeekend(selectedDay) && <div>Выходной</div>}</div>
              </>
            )}
          </>
        )}
      </div>
      <Calendar
        selected={selectedDay}
        onSelect={(date) => setSelectedDay(date)}
        mode="single"
        className="rounded-md border shadow"
        locale={ru}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        onMonthChange={(date) => handleMonthChange(date)}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </div>
  )
}
