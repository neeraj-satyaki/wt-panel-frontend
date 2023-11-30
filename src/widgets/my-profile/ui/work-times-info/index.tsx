import { LibCalendar } from '@/shared/lib/lib-calendar'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useWorkTimes } from '../../model/use-work-times'

type Props = {
  userId: string
}

export const WorkTimesInfo = ({ userId }: Props) => {
  const { isLoading, data, isError, currentDate, setCurrentDate } = useWorkTimes(userId)
  if (isLoading) return <UiSpinner />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Данные не получены</div>

  return (
    <div className="p-4 rounded-lg border shadow-lg flex flex-col gap-2">
      <UiHeading level={'4'}>Отработанное время</UiHeading>
      <div>
        <div>Рабочих дней: {data.workDaysCount} </div>
        <div>Рабочих часов: {Math.round(data.totalWorkHours)} ч</div>
        <div>Отсутсвовал: {Math.round(data.absencesCount)}</div>
        <div>Опозданий: {Math.round(data.lateArrivalsCount)}</div>
        <div>Переработок: {Math.round(data.overtimesCount)}</div>
      </div>
      <LibCalendar
        size="small"
        workDays={data.workTimes}
        date={currentDate}
        changeDate={(date) => {
          setCurrentDate(date)
        }}
      />
    </div>
  )
}
