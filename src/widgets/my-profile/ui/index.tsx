import { UiProfileUser } from '@/shared/ui/components/ui-user-profile'
import { Panel } from './panel'
import { useSessionQuery } from '@/entities/session'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { WorkTimesInfo } from './work-times-info'

export const MyProfile = () => {
  const { data, isLoading, isError } = useSessionQuery()

  if (isLoading) return <UiPageSpinner />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Данные не получены</div>

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
      <div className="grid grid-cols-4 gap-4">
        <WorkTimesInfo userId={data.id} />
      </div>
    </div>
  )
}
