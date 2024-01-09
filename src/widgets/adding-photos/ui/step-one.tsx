import { addingPhotosStore } from '../model/store'
import { Button } from '@/shared/ui/components/ui/button'
import { ScannProductBlock } from './scann-product-block'
import { ProductDto } from '@/shared/api/generated'
import { UseQueryResult } from '@tanstack/react-query'

export function StepOne({ product }: { product: UseQueryResult<ProductDto, Error> }) {
  const { productId, handleStep } = addingPhotosStore()

  if (product.isFetching) return <div>Загрузка...</div>

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2 items-center">
        <div>
          <div>1 этап: Найти деталь</div>
          {productId && product.data && (
            <div className="border-b border-gray-400">Деталь: {productId}</div>
          )}
        </div>
        <ScannProductBlock />
      </div>
      {!product.data && productId && <div>Деталь не найдена, сканируйте снова</div>}
      <Button
        onClick={() => handleStep(2)}
        disabled={!productId || !product.data}
        variant="primary"
      >
        Далее
      </Button>
    </div>
  )
}
