import { useMovingProductState } from '../model/store'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { useEffect, useState } from 'react'
import { useAddToZakazNaryad } from '@/entities/products/api'

export function Scanner({ productId, show }: { productId: string; show: boolean }) {
  const [zakazNaryadId, setZakazNaryadId] = useState('')

  const { setResult, resetValues } = useMovingProductState()
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
  if (addToZakazNaryad.isPending) return <div>Загрузка...</div>
  return (
    <Html5QrcodePlugin
      fps={10}
      qrbox={250}
      disableFlip={false}
      qrCodeSuccessCallback={handleSubmit}
    />
  )
}
