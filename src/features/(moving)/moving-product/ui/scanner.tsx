import { useMovingProductState } from '../model/store'
import { Filter } from './filter'
import { ScanDetail } from './scan-detail'
import { ScanPlace } from './scan-place'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useGetProduct, useMoveProduct } from '@/entities/products/api'
import { ProductCard } from '@/entities/products/ui/product-card'
import { Button } from '@/shared/ui/components/ui/button'
import { useEffect } from 'react'
import { Separator } from '@/shared/ui/components/ui/separator'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'

export function ScannerMoveProduct({ show }: { show: boolean }) {
  const { productId, place, step, type, resetValues, setResult, result } =
    useMovingProductState()
  const product = useGetProduct(productId)

  const moveProduct = useMoveProduct()

  function handleSubmit() {
    if (type === 0 || (type === 1 && place.length > 0 && productId.length > 0)) {
      moveProduct.mutate({ id: productId, place: place, type: type })
      setResult(true)
    }
  }

  useEffect(() => {
    if (place.length) {
      handleSubmit()
    }
  }, [place])

  useEffect(() => {
    if (!show) {
      refresh()
    }
  }, [show])

  const refresh = () => {
    moveProduct.reset()
    resetValues()
  }
  return (
    <div className="flex flex-col gap-4">
      {result ? (
        <div className="flex flex-col">
          {moveProduct.isPending && <UiSpinner />}
          {moveProduct.isError && (
            <div className="text-2xl font-semibold text-center">
              <AnimateError />
              <div>Ошибка при перемещении детали</div>
            </div>
          )}
          {moveProduct.isSuccess && (
            <div className="text-2xl font-semibold text-center">
              <AnimateSuccess />
              <div>
                Место хранение изменено на <span className="font-bold">{place}</span>
              </div>
            </div>
          )}
          <Button
            variant="default"
            className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
            onClick={() => refresh()}
          >
            Ок
          </Button>
        </div>
      ) : (
        <>
          <Filter />
          {productId && (
            <>
              {product.isLoading && <UiSpinner />}
              {product.data && <ProductCard data={product.data} />}
              <Separator />
            </>
          )}
          {place && <div className="text-2xl font-semibold">{place}</div>}
          {step === 0 && <ScanDetail />}
          {step === 1 && <ScanPlace />}
        </>
      )}
    </div>
  )
}
