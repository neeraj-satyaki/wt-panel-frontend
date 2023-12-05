import { UiProfileUser } from '@/shared/ui/components/ui-user-profile'
import { useSessionQuery } from '@/entities/session'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { WorkTimesInfo } from './work-times-info'

export const MyProfile = () => {
  const { data, isLoading, isError } = useSessionQuery()

  if (isLoading) return <UiPageSpinner />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-4">
      <UiProfileUser data={data} />
      <div className="grid grid-cols-4 gap-4">
        <WorkTimesInfo userId={data.id} />
      </div>
    </div>
  )
}
