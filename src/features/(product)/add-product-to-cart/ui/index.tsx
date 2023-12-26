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

export function AddProductToZakazNaryad({ productId }: { productId: string }) {
  const [show, setShow] = useState(false)

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="text-xl py-8 font-bold 1024:text-sm 1024:py-4"
        >
          Добавить в заказ наряд
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Добавление детали в заказ наряд</DialogTitle>
        </DialogHeader>
        <Scanner productId={productId} show={show} setShow={setShow} />
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
