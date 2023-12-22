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

export function ScannProduct() {
  const moveProduct = useMoveProduct()
  const { poddonId } = useProcessInventory()
  const [show, setShow] = useState(false)
  const [resultWindow, setResultWindow] = useState(false)

  const handleShowScanner = (decodeText: string) => {
    moveProduct.mutate({
      id: decodeText,
      place: poddonId,
      type: 1,
    })
    setShow(false)
  }

  useEffect(() => {
    if (moveProduct.isSuccess || moveProduct.isError) {
      setResultWindow(true)
    }
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
          <Button disabled={!poddonId}>Сканировать деталь</Button>
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
