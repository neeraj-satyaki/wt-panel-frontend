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
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import AnimateSuccess from '@/shared/ui/animations/success'
import AnimateError from '@/shared/ui/animations/error'

export function ScannProduct() {
  const moveProduct = useMoveProduct()
  const { placeId, type } = useProcessInventory()
  const [show, setShow] = useState(false)
  const [resultModal, setResultModal] = useState(false)
  const [decodeText, setDecodeText] = useState('')

  const handleShowScanner = (decodeText: string) => {
    setDecodeText(decodeText)
    moveProduct.reset()
    setShow(false)
    moveProduct.mutate({
      id: decodeText,
      place: placeId,
      type: type,
    })
    setResultModal(true)
  }

  return (
    <>
      <Dialog open={resultModal} onOpenChange={setResultModal}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-[800px] w-full flex flex-col items-center gap-5">
          {moveProduct.isPending && <UiSpinner />}
          {moveProduct.isSuccess && (
            <div className="flex flex-col items-center">
              <AnimateSuccess />
              <div className="text-2xl font-semibold">
                Деталь {decodeText} успешно перемещена
              </div>
            </div>
          )}
          {moveProduct.isError && (
            <div className="flex flex-col items-center">
              <AnimateError />
              <div className="text-2xl font-semibold">Ошибка</div>
            </div>
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
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild>
          <Button
            variant="primary"
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
          {show && (
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={(decodeText: string) =>
                handleShowScanner(decodeText)
              }
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
    </>
  )
}
