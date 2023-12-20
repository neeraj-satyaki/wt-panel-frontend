import { useMovingProductState } from '../model/store'
import { useMoveProduct } from '@/entities/products/api'

import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { ScannerMoveProduct } from './scanner'

export function MovingProduct() {
  const { place, type, productId, setResult, result, resetValues } =
    useMovingProductState()
  const moveProduct = useMoveProduct()

  function handleSubmit() {
    if (type === 0 || (type === 1 && place.length > 0 && productId.length > 0)) {
      moveProduct.mutate({ id: productId, place: place, type: type })
      setResult(true)
    }
  }

  const handleDialogClose = () => {
    moveProduct.reset()
    resetValues()
  }

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="default">Переместить деталь</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Перемещение детали</DialogTitle>
        </DialogHeader>
        {moveProduct.isPending ? (
          <UiSpinner />
        ) : (
          <ScannerMoveProduct handleSubmit={handleSubmit} />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
