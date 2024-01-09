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
import { useState } from 'react'

export function MovingProduct() {
  const [show, setShow] = useState(false)

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button
          variant="primary"
          className="text-xl py-8 font-bold 1024:text-sm 1024:py-4"
        >
          Переместить деталь
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Перемещение детали</DialogTitle>
        </DialogHeader>
        <ScannerMoveProduct show={show} />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-xl font-semibold h-16"
            >
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
