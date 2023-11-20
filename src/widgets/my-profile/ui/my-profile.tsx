import { UiProfileUser } from '@/shared/ui/components/ui-user-profile'
import { Panel } from './panel'
import { useSessionQuery } from '@/entities/session'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiError } from '@/shared/ui/components/ui-error'

export const MyProfile = () => {
  const { data, isLoading, isError } = useSessionQuery()

  if (isLoading) return <UiPageSpinner />
  if (!data) return <div>Данные не получены</div>
  if (isError) return <UiError />

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
    </div>
  )
}
