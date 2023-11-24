import { UiProfileUser } from '@/shared/ui/components/ui-user-profile'
import { Panel } from './panel'
import { useSessionQuery } from '@/entities/session'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiError } from '@/shared/ui/components/ui-error'
import { LibCalendar } from '@/shared/lib/lib-calendar'

export const MyProfile = () => {
  const { data, isLoading, isError } = useSessionQuery()

  if (isLoading) return <UiPageSpinner />
  if (!data) return <div>Данные не получены</div>
  if (isError) return <UiError />

  const infoTimeWork = {
    workDaysCount: 21,
    totalWorkHours: 162.2,
    workTimes: [
      {
        day: '01.09.2023',
        startTime: '9:00:00',
        endTime: '18:00:00',
      },
      {
        day: '04.09.2023',
        startTime: '9:02:00',
        endTime: '17:57:00',
      },
      {
        day: '05.09.2023',
        startTime: '8:48:00',
        endTime: '18:03:00',
      },
      {
        day: '06.09.2023',
        startTime: '8:56:00',
        endTime: '17:58:00',
      },
      {
        day: '07.09.2023',
        startTime: '8:45:00',
        endTime: '17:59:00',
      },
      {
        day: '08.09.2023',
        startTime: '9:11:00',
        endTime: '18:03:00',
      },
      {
        day: '11.09.2023',
        startTime: '9:20:00',
        endTime: '17:54:00',
      },
      {
        day: '12.09.2023',
      },
      {
        day: '13.09.2023',
        startTime: '9:02:00',
        endTime: '18:04:00',
      },
      {
        day: '14.09.2023',
        startTime: '8:53:00',
        endTime: '18:16:00',
      },
      {
        day: '15.09.2023',
        startTime: '9:02:00',
        endTime: '18:01:00',
      },
      {
        day: '18.09.2023',
        startTime: '8:54:00',
        endTime: '18:23:00',
      },
      {
        day: '19.09.2023',
        startTime: '8:50:00',
        endTime: '18:04:00',
      },
      {
        day: '20.09.2023',
        startTime: '8:52:00',
        endTime: '18:12:00',
      },
      {
        day: '21.09.2023',
        startTime: '9:26:00',
        endTime: '18:12:00',
      },
      {
        day: '22.09.2023',
        startTime: '8:51:00',
        endTime: '18:01:00',
      },
      {
        day: '25.09.2023',
        startTime: '8:52:00',
        endTime: '18:24:00',
      },
      {
        day: '26.09.2023',
        startTime: '8:46:00',
        endTime: '18:04:00',
      },
      {
        day: '27.09.2023',
        startTime: '9:00:00',
        endTime: '18:00:00',
      },
      {
        day: '28.09.2023',
        startTime: '9:09:00',
        endTime: '18:07:00',
      },
      {
        day: '29.09.2023',
        startTime: '8:51:00',
        endTime: '18:00:00',
      },
    ],
    absencesCount: 1,
    lateArrivalsCount: 7,
    overtimesCount: 13,
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="430:hidden">
          <UiHeading level={'5'}>Личный кабинет</UiHeading>
        </div>
        <div className="hidden 430:block">
          <UiHeading level={'4'}>Личный кабинет</UiHeading>
        </div>
        <Panel />
      </div>
      <UiProfileUser data={data} />
      <LibCalendar data={infoTimeWork} size="small" />
    </div>
  )
}
