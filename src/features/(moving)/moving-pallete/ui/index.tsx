import { useMovingPalletState } from '../model/state'
import { useMovePallete } from '@/entities/products/queries'
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
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { Suspense, lazy } from 'react'
const ScannerMovePallete = lazy(() => import('./scanner'))

export function MovingPallete() {
  const { place, palleteId, setResult, result, resetValues } = useMovingPalletState()
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
        <Button variant="primary">Переместить паллет</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Перемещение паллета</DialogTitle>
        </DialogHeader>
        {result ? (
          <>
            {movePallete.isPending ? (
              <UiSpinner />
            ) : movePallete.isError ? (
              <AnimateError />
            ) : movePallete.isSuccess ? (
              <AnimateSuccess />
            ) : (
              ''
            )}
          </>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
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
