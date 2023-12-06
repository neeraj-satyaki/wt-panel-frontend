import { UiProfileUser } from '@/shared/ui/components/ui-user-profile'
import { useSessionQuery } from '@/entities/session'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { WorkTimesInfo } from './work-times-info'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useModalSettings } from '../model/use-modal-settings'
import { UiButton } from '@/shared/ui/components/ui-button'
import { IconGear } from '@/shared/ui/icons/icon-gear'
import { Suspense, lazy } from 'react'
const ModalSettings = lazy(() => import('./modal-settings'))

export const PersonalArea = () => {
  const { data, isLoading, isError } = useSessionQuery()
  const modalSetting = useModalSettings()

  if (isLoading) return <UiPageSpinner />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex justify-between w-full">
        <div className="flex w-full justify-between items-center">
          <UiHeading level={'1'}>Личный кабинет</UiHeading>
          <div className="relative">
            <UiButton
              variant="outlined"
              className="p-2"
              onClick={() =>
                modalSetting.isShow ? modalSetting.close() : modalSetting.open()
              }
            >
              <IconGear />
            </UiButton>
            {modalSetting.isShow && (
              <Suspense fallback={<></>}>
                <ModalSettings />
              </Suspense>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <UiProfileUser data={data} />
        <div className="grid grid-cols-1 w-full 1024:grid-cols-4">
          <WorkTimesInfo userId={data.id} />
        </div>
      </div>
    </div>
  )
}
