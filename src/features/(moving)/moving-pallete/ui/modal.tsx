import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { useMovingPalletState } from '../model/state'
import { Suspense, lazy, useEffect } from 'react'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
const LazyScannerMoveProduct = lazy(() => import('./scanner'))

export function ModalMovingProduct() {
  const { handleClose, resetValues } = useMovingPalletState()
  useEffect(() => {
    resetValues()
  }, [])

  return (
    <UiPageModalLayout close={() => handleClose()}>
      <Suspense fallback={<UiSpinner />}>
        <LazyScannerMoveProduct />
      </Suspense>
    </UiPageModalLayout>
  )
}
