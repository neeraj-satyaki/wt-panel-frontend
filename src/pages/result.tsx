import { useGetProduct } from '@/entities/products/api'
import AnimateError from '@/shared/ui/animations/error'
import Success from '@/shared/ui/animations/success'
import { Button } from '@/shared/ui/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

type Props = {
  type: string
  text: string
  productId: string
}

export function ResultPage({ type, text, productId }: Props) {
  const router = useRouter()
  const [photo, setPhoto] = useState('')
  const product = useGetProduct(productId)

  useEffect(() => {
    if (product.data) {
      setPhoto(product.data?.photos[0])
    }
  }, [productId, product.data])

  return (
    <main className="min-h-screen items-center flex justify-center overflow-auto">
      <div className="flex flex-col gap-4 items-center">
        {type === 'success' && <Success />}
        {type === 'error' && <AnimateError />}
        <h1 className="text-3xl font-semibold text-center">{text} </h1>
        <Button
          onClick={() => router.back()}
          variant="primary"
          className="text-3xl font-bold w-24 h-14"
        >
          Ок
        </Button>
        {photo.length > 0 && (
          <Image src={photo} alt={`image-${productId}`} width={300} height={300} />
        )}
      </div>
    </main>
  )
}
