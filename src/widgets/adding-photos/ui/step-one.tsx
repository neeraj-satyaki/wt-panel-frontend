import { addingPhotosStore } from '../model/store'
import { Button } from '@/shared/ui/components/ui/button'
import { ScannProductBlock } from './scann-product-block'

export function StepOne() {
  const { productId, handleStep } = addingPhotosStore()

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2 items-center">
        <div>
          <div>1 этап: Найти деталь</div>
          {productId && (
            <div className="border-b border-gray-400">Деталь: {productId}</div>
          )}
        </div>
        <ScannProductBlock />
      </div>
      <Button onClick={() => handleStep(2)} disabled={!productId}>
        Далее
      </Button>
    </div>
  )
}
