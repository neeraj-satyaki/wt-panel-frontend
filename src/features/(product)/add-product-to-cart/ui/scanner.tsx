import { useMovingProductState } from '../model/store'
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
  const addToZakazNaryad = useAddToZakazNaryad(zakazNaryadId, productId)

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
    <Html5QrcodePlugin
      fps={10}
      qrbox={250}
      disableFlip={false}
      qrCodeSuccessCallback={handleSubmit}
    />
  )
}
