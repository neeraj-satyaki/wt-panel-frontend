import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
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
import { useProcessInventory } from '../model/store'
import { useState } from 'react'

export function ScannShelf() {
  const { changePlaceId } = useProcessInventory()
  const [show, setShow] = useState(false)
  const handleShowScanner = (decodeText: string) => {
    changePlaceId(decodeText, 0)
    setShow(false)
  }
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button
          className="text-xl py-8 font-semibold 1024:text-sm 1024:py-6 1024:font-semibold"
          variant="primary"
        >
          Зафиксировать полку
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Сканируйте полку</DialogTitle>
        </DialogHeader>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={(decodeText: string) => handleShowScanner(decodeText)}
        />
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
