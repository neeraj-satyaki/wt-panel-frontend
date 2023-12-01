import { MoveApplicationSaleDto } from '@/shared/api/generated'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { UseMutationResult } from '@tanstack/react-query'
import { MoveButton } from './move-button'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import AnimateError from '@/shared/ui/animations/error'
import { useRefusalApplication } from '@/entities/panel/queries'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

type Props = {
  actionProcessing: string
  moveAppSale: UseMutationResult<unknown, Error, MoveApplicationSaleDto, unknown>
  actionId: string
  actionSubProcessng: string
  openCreateSaleModal: () => void
  setActionModal: (state: boolean) => void
}

export function ActionModal({
  setActionModal,
  moveAppSale,
  openCreateSaleModal,
  actionId,
  actionProcessing,
  actionSubProcessng,
}: Props) {
  const refuse = useRefusalApplication()
  return (
    <UiPageModalLayout close={() => setActionModal(false)}>
      <div>
        {moveAppSale.isPending || refuse.isPending ? (
          <div>
            <UiSpinner />
          </div>
        ) : null}
        {moveAppSale.isError || refuse.isError ? (
          <div className="flex flex-col gap-2 items-center">
            <AnimateError />
            <UiHeading level={'4'}>Произошла ошибка</UiHeading>
          </div>
        ) : null}
        {moveAppSale.isSuccess || refuse.isSuccess ? (
          <div className="flex flex-col gap-2 items-center">
            <AnimateSuccess />
            <UiHeading level={'4'}>Успешно</UiHeading>
          </div>
        ) : null}
        {!moveAppSale.isPending &&
          !moveAppSale.isError &&
          !moveAppSale.isSuccess &&
          (!refuse.isPending && !refuse.isError && !refuse.isSuccess ? (
            <MoveButton
              refuse={refuse}
              actionProcessing={actionProcessing}
              moveAppSale={moveAppSale}
              actionId={actionId}
              actionSubProcessng={actionSubProcessng}
              openCreateSaleModal={openCreateSaleModal}
            />
          ) : null)}
      </div>
    </UiPageModalLayout>
  )
}
