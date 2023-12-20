import { useMovingPalletState } from '../model/store'
import { useMovePallete } from '@/entities/products/api'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { Button } from '@/shared/ui/components/ui/button'
import { Suspense, lazy } from 'react'

const ScannerMovePallete = lazy(() => import('./scanner'))

export function MovingPallete() {
  const { place, palleteId, setResult, resetValues } = useMovingPalletState()
  const movePallete = useMovePallete()

  function handleSubmit() {
    if (place.length > 0 && palleteId.length > 0) {
      movePallete.mutate({ pallet: palleteId, place: place })
      setResult(true)
    }
  }

  const handleDialogClose = () => {
    movePallete.reset()
    resetValues()
  }
  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="default">Переместить паллет</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Перемещение паллета</DialogTitle>
        </DialogHeader>
        {movePallete.isPending ? (
          <UiSpinner />
        ) : (
          <Suspense fallback={<UiSpinner />}>
            <ScannerMovePallete handleSubmit={handleSubmit} />
          </Suspense>
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
