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
import { ScannerMoveProduct } from './scanner'

export function MovingProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="text-xl py-8 font-bold 1024:text-sm 1024:py-4"
        >
          Переместить деталь
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Перемещение детали</DialogTitle>
        </DialogHeader>
        <ScannerMoveProduct />
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
