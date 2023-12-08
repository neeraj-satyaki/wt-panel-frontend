import { UiResultModal } from '@/shared/ui/components/ui-result-modal'
import { useMovingPalletState } from '../model/state'
import { BtnOpenModal } from './btn-open-modal'
import { ModalMovingProduct } from './modal'
import { useMovePallete } from '@/entities/products/queries'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useEffect } from 'react'

export function MovingPallete() {
  const { modal, place, palleteId, setResult, result, handleClose } =
    useMovingPalletState()
  const movePallete = useMovePallete()

  function handleSubmit() {
    if (place.length > 0 && palleteId.length > 0) {
      movePallete.mutate({ pallet: palleteId, place: place })
      setResult(true)
      handleClose()
    }
  }

  useEffect(() => {
    handleSubmit()
  }, [place])

  return (
    <div className="flex gap-10">
      <BtnOpenModal />
      {result && (
        <>
          {movePallete.isPending ? (
            <UiSpinner />
          ) : movePallete.isError ? (
            <UiResultModal
              close={() => setResult(false)}
              type={false}
              text={`Ошибка при перемещении паллета ${palleteId} на место ${place}`}
            />
          ) : movePallete.isSuccess ? (
            <UiResultModal
              close={() => setResult(false)}
              type={true}
              text={`Паллет ${palleteId} успешно перемещён на место ${place}`}
            />
          ) : (
            ''
          )}
        </>
      )}
      {modal && <ModalMovingProduct />}
    </div>
  )
}
