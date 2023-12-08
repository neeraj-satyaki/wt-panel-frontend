import { UiResultModal } from '@/shared/ui/components/ui-result-modal'
import { useMovingProductState } from '../model/state'
import { BtnOpenModal } from './btn-open-modal'
import { ModalMovingProduct } from './modal'
import { useMoveProduct } from '@/entities/products/queries'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useEffect } from 'react'

export function MovingProduct() {
  const { modal, place, type, productId, setResult, result, handleClose } =
    useMovingProductState()
  const moveProduct = useMoveProduct()

  function handleSubmit() {
    if (type === 0 || (type === 1 && place.length > 0 && productId.length > 0)) {
      moveProduct.mutate({ id: productId, place: place, type: type })
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
          {moveProduct.isPending ? (
            <UiSpinner />
          ) : moveProduct.isError ? (
            <UiResultModal
              close={() => setResult(false)}
              type={false}
              text={`Ошибка при перемещении товара ${productId} на место ${place}`}
            />
          ) : moveProduct.isSuccess ? (
            <UiResultModal
              close={() => setResult(false)}
              type={true}
              text={`Товар ${productId} успешно перемещён на место ${place}`}
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
