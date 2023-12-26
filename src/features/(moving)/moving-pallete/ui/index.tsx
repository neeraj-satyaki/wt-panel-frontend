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
import { ScannerMovePallete } from './scanner'

export function MovingPallete() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="text-xl py-8 font-bold 1024:text-sm 1024:py-4"
        >
          Переместить паллет
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Перемещение паллета</DialogTitle>
        </DialogHeader>
        <ScannerMovePallete />
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
