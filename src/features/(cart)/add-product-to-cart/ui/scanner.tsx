import { useMovingProductState } from '../model/store'
import { Button } from '@/shared/ui/components/ui/button'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAddProductToCart } from '@/entities/cart'

export function Scanner({
  place,
  show,
  setShow,
}: {
  place: string
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  const [productId, setProductId] = useState('')
  const { setResult, result, resetValues } = useMovingProductState()
  const addToCart = useAddProductToCart()

  function handleSubmit(decodedText: string) {
    setProductId(decodedText)
    addToCart.mutate({ id: decodedText, place: place, type: 0 })
    setResult(true)
  }
  useEffect(() => {
    if (!show) {
      refresh()
    }
  }, [show])

  const refresh = () => {
    addToCart.reset()
    resetValues()
    setProductId('')
  }
  return (
    <div className="flex flex-col gap-4">
      {result ? (
        <div className="flex flex-col">
          {addToCart.isPending && <div>Загрузка...</div>}
          {addToCart.isError && (
            <div className="text-2xl font-semibold text-center">
              <AnimateError />
              <div>Ошибка при перемещении детали</div>
            </div>
          )}
          {addToCart.isSuccess && (
            <div className="text-2xl font-medium text-center">
              <AnimateSuccess />
              <div>
                Деталь <span className="font-bold">{productId}</span> перемещена вам в
                корзину
              </div>
            </div>
          )}
          <Button
            variant="primary"
            className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
            onClick={() => setShow(false)}
          >
            Ок
          </Button>
        </div>
      ) : (
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={handleSubmit}
        />
      )}
    </div>
  )
}
