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
import { useMoveProduct } from '@/entities/products/api'

export function ScannProduct() {
  const { placeId, type } = useProcessInventory()
  const [show, setShow] = useState(false)
  const [decodeText, setDecodeText] = useState('')
  const moveProduct = useMoveProduct(decodeText, placeId)

  const handleShowScanner = (decodeText: string) => {
    setDecodeText(decodeText)
    moveProduct.reset()
    setShow(false)
    moveProduct.mutate({
      id: decodeText,
      place: placeId,
      type: type,
    })
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button
          variant="primary"
          disabled={!placeId || moveProduct.isPending}
          className="text-xl py-8 font-semibold 1024:text-sm 1024:py-6 1024:font-medium"
        >
          {moveProduct.isPending ? <div>Загрузка...</div> : 'Сканировать деталь'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Сканируйте деталь </DialogTitle>
        </DialogHeader>
        {show && (
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={(decodeText: string) => handleShowScanner(decodeText)}
          />
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
