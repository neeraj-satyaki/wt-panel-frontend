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
import { useEffect, useState } from 'react'
import { useMoveProduct } from '@/entities/products/api'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

export function ScannProduct() {
  const moveProduct = useMoveProduct()
  const { placeId, type } = useProcessInventory()
  const [show, setShow] = useState(false)
  const [resultWindow, setResultWindow] = useState(false)

  const handleShowScanner = (decodeText: string) => {
    moveProduct.mutate({
      id: decodeText,
      place: placeId,
      type: type,
    })
    setShow(false)
  }

  useEffect(() => {
    if (moveProduct.isSuccess || moveProduct.isError) {
      setResultWindow(true)
    }
    return moveProduct.reset()
  }, [moveProduct.isSuccess, moveProduct.isError])

  return (
    <>
      <Dialog open={resultWindow} onOpenChange={setResultWindow}>
        <DialogContent className="max-w-[800px] w-full">
          <DialogHeader>
            <DialogTitle>{moveProduct.isSuccess ? 'Успешно' : 'Ошибка'}</DialogTitle>
          </DialogHeader>
          {moveProduct.isSuccess
            ? 'Место успешно изменено'
            : 'Ошибка при изменении места'}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild>
          <Button
            disabled={!placeId || moveProduct.isPending}
            className="text-xl py-8 font-semibold 1024:text-sm 1024:py-6 1024:font-medium"
          >
            {moveProduct.isPending ? <UiSpinner /> : 'Сканировать деталь'}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[800px] w-full">
          <DialogHeader>
            <DialogTitle>Сканируйте деталь </DialogTitle>
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
    </>
  )
}
