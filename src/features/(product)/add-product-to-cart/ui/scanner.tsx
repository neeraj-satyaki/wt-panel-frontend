import { useMovingProductState } from '../model/store'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAddToZakazNaryad } from '@/entities/products/api'

export function Scanner({
  productId,
  show,
  setShow,
}: {
  productId: string
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  const [zakazNaryadId, setZakazNaryadId] = useState('')

  const { setResult, result, resetValues } = useMovingProductState()
  const addToZakazNaryad = useAddToZakazNaryad()

  function handleSubmit(decodedText: string) {
    setZakazNaryadId(decodedText)
    addToZakazNaryad.mutate({
      orderId: decodedText,
      productId: productId,
    })
    setResult(true)
  }
  useEffect(() => {
    if (!show) {
      refresh()
    }
  }, [show])

  const refresh = () => {
    addToZakazNaryad.reset()
    resetValues()
  }
  return (
    <div className="flex flex-col gap-4">
      {result ? (
        <div className="flex flex-col">
          {addToZakazNaryad.isPending && <UiSpinner />}
          {addToZakazNaryad.isError && (
            <div className="text-2xl font-semibold text-center">
              <AnimateError />
              <div>Ошибка при добавлении в заказ наряд</div>
            </div>
          )}
          {addToZakazNaryad.isSuccess && (
            <div className="text-2xl font-medium text-center">
              <AnimateSuccess />
              <div>
                Успешно добавлен в заказ наряд{' '}
                <span className="font-bold">{zakazNaryadId}</span>
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
