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
import { UiHeading } from '@/shared/ui/components/ui-heading'

export function ScannProduct() {
  const moveProduct = useMoveProduct()
  const { placeId, type } = useProcessInventory()
  const [show, setShow] = useState(false)
  const [resultModal, setResultModal] = useState(false)

  const handleShowScanner = (decodeText: string) => {
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
          <DialogHeader>
            <DialogTitle>Ответ</DialogTitle>
          </DialogHeader>
          {moveProduct.isPending && <UiSpinner />}
          {moveProduct.isSuccess && (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4caf50"
                  d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                ></path>
                <path
                  fill="#ccff90"
                  d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
                ></path>
              </svg>
              <UiHeading level={'2'}>Успешно</UiHeading>
              <div>Деталь успешно перемещена</div>
            </div>
          )}
          {moveProduct.isError && (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#f44336"
                  d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                ></path>
                <path
                  fill="#fff"
                  d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
                ></path>
                <path
                  fill="#fff"
                  d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
                ></path>
              </svg>
              <UiHeading level={'2'}>Ошибка</UiHeading>
              <div>Что то пошло не так, попробуйте снова</div>
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
