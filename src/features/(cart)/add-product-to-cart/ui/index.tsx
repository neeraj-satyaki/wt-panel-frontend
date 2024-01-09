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
import { Scanner } from './scanner'
import { useState } from 'react'

export function AddProductToCart({ place }: { place: string }) {
  const [show, setShow] = useState(false)

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button
          variant="primary"
          className="text-xl py-8 font-bold 1024:text-sm 1024:py-4"
        >
          Добавить в корзину
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Добавления товара в корзину</DialogTitle>
        </DialogHeader>
        <Scanner place={place} show={show} setShow={setShow} />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-xl font-semibold h-14"
            >
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
