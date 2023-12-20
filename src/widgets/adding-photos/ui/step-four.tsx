import { addingPhotosStore } from '../model/store'
import { Button } from '@/shared/ui/components/ui/button'
import { useMoveProduct } from '@/entities/products/api'

export function StepFour() {
  const { handleStep, productId, paddonId, handleProductId } = addingPhotosStore()
  const moveProduct = useMoveProduct()

  function handleMoveToPaddon() {
    moveProduct.mutate({ id: productId, place: paddonId, type: 1 })
    handleProductId('')
    handleStep(1)
  }
  return (
    <div>
      <div>4 этап: Положить в поддон</div>
      <div className="space-x-2">
        <Button onClick={() => handleStep(3)}>Назад</Button>
        <Button onClick={() => handleMoveToPaddon()} disabled={!paddonId}>
          Положить в поддон
        </Button>
      </div>
      <span className="text-red-500">{!paddonId ? '(Зафиксируйте поддон)' : ''}</span>
    </div>
  )
}
