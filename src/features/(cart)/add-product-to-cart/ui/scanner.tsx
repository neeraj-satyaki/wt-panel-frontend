import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { useEffect, useState } from 'react'
import { useAddProductToCart } from '@/entities/cart'

export function Scanner({ place, show }: { place: string; show: boolean }) {
  const [productId, setProductId] = useState('')
  const addToCart = useAddProductToCart(productId)

  function handleSubmit(decodedText: string) {
    setProductId(decodedText)
    addToCart.mutate({ id: decodedText, place: place, type: 0 })
  }
  useEffect(() => {
    if (!show) {
      refresh()
    }
  }, [show])

  const refresh = () => {
    addToCart.reset()
    setProductId('')
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
