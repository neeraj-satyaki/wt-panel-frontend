import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { useMovingProductState } from '../model/state'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiButton } from '@/shared/ui/components/ui-button'
import { Suspense, lazy, useEffect } from 'react'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
const LazyScannerMoveProduct = lazy(() => import('./scanner'))

export function ModalMovingProduct() {
  const { handleClose, type, setType, resetValues } = useMovingProductState()
  useEffect(() => {
    resetValues()
  }, [])

  return (
    <UiPageModalLayout close={() => handleClose()}>
      {type === null ? (
        <>
          <UiHeading level={'1'}>Отсканируйте деталь</UiHeading>
          <div className="flex gap-2">
            <UiButton
              variant={'primary'}
              className="px-4 py-2"
              onClick={() => setType(0)}
            >
              На полку
            </UiButton>
            <UiButton
              variant={'primary'}
              className="px-4 py-2"
              onClick={() => setType(0)}
            >
              На поддон
            </UiButton>
          </div>
        </>
      ) : (
        <Suspense fallback={<UiSpinner />}>
          <LazyScannerMoveProduct />
        </Suspense>
      )}
    </UiPageModalLayout>
  )
}
