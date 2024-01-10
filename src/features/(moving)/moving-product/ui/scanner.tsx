import { useMovingProductState } from '../model/store'
import { Filter } from './filter'
import { ScanDetail } from './scan-detail'
import { ScanPlace } from './scan-place'
import { useGetProduct, useMoveProduct } from '@/entities/products/api'
import { ProductCard } from '@/entities/products/ui/product-card'
import { useEffect } from 'react'
import { Separator } from '@/shared/ui/components/ui/separator'

export function ScannerMoveProduct() {
  const { productId, place, step, type, resetValues } = useMovingProductState()
  const product = useGetProduct(productId)

  const moveProduct = useMoveProduct(productId, place)

  function handleSubmit() {
    if (type === 0 || (type === 1 && place.length > 0 && productId.length > 0)) {
      moveProduct.mutate({ id: productId, place: place, type: type })
    }
    refresh()
  }

  useEffect(() => {
    if (place.length) {
      handleSubmit()
    }
  }, [place])

  const refresh = () => {
    moveProduct.reset()
    resetValues()
  }
  return (
    <div className="flex flex-col gap-4">
      <Filter />
      {productId && (
        <>
          {product.isLoading && <div>Загрузка...</div>}
          {product.data && (
            <ProductCard
              name={product.data.name}
              article={product.data.article}
              indcode={product.data.indcode}
              place={product.data.place}
              cost={product.data.cost}
              photos={product.data.photos}
            />
          )}
          <Separator />
        </>
      )}
      {place && <div className="text-2xl font-semibold">{place}</div>}
      {step === 0 && <ScanDetail />}
      {step === 1 && <ScanPlace />}
    </div>
  )
}
