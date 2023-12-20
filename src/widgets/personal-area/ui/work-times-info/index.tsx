import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Calendar } from '@/shared/ui/components/ui/calendar'
import ru from 'date-fns/locale/ru'
import { useEffect, useState } from 'react'
import { useGetTimewWork } from '@/entities/user/api'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import format from 'date-fns/format'

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

  return (
    <div>
      {timeWorks.isLoading && <UiSpinner />}
      {timeWorks.isError && <div>Ошибка</div>}
      {!timeWorks.data && !timeWorks.isLoading && <div>Данных нет</div>}
      {timeWorks.data && (
        <>
          <div>Дней: {Math.round(timeWorks.data.workDaysCount)}</div>
          <div>Норма часов: {Math.round(timeWorks.data.workDaysCount) * 8}</div>
          <div>Часов отработано: {Math.round(timeWorks.data.totalWorkHours)}</div>
          <div>Опозданий: {timeWorks.data.lateArrivalsCount}</div>
          <div>Переработок: {timeWorks.data.overtimesCount}</div>
          <div>Отсутсвий: {timeWorks.data.absencesCount}</div>

          {selectedDay && (
            <div>
              {timeWorks.data.workTimes
                .filter((item) => item.day === format(selectedDay, 'dd.MM.yyyy'))
                .map((item, i) => (
                  <div key={i}>
                    {item.startTime} - {item.endTime}
                  </div>
                ))}
            </div>
          )}
        </>
      )}
      <Calendar
        selected={selectedDay}
        onSelect={(date) => setSelectedDay(date)}
        mode="single"
        className="rounded-md border shadow 1024:sticky top-0"
        locale={ru}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        onMonthChange={(date) => handleMonthChange(date)}
      />
    </div>
  )
}
