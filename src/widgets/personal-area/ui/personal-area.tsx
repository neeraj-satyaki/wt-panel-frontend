import { UiProfileUser } from '@/shared/ui/components/ui-user-profile'
import { useSessionQuery } from '@/entities/session'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { WorkTimesInfo } from './work-times-info'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { ModalSettings } from './modal-settings'

export const PersonalArea = () => {
  const session = useSessionQuery()

  if (session.isLoading) return <UiPageSpinner />
  if (session.isError) return <div>Ошибка</div>
  if (!session.data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex justify-between w-full">
        <div className="flex w-full justify-between items-center">
          <UiHeading level={'1'}>Личный кабинет</UiHeading>

          <ModalSettings />
        </div>
      </div>
      <div className="space-y-5">
        <UiProfileUser data={session.data} />
        <div className="flex items-start gap-2">
          <WorkTimesInfo userId={session.data.id} />
        </div>
      </div>
    </div>
  )
}
