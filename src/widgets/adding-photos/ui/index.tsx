import { useGetProduct, useMoveProduct } from '@/entities/products/api'
import { ListImages, UploadForm } from '@/features/(product)/media'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
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
import { QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'
type Props = {}

export function AddingPhotosWidget({}: Props) {
  const [id, setId] = useState('')
  const [fixPaddon, setFixPaddon] = useState('')

  const [scannerFixPaddon, setScannerFixPaddon] = useState(false)
  const [scannerSetId, setScannerSetId] = useState(false)

  const [step, setStep] = useState(1)

  const handleFixPaddon = (decodeText: string) => {
    setFixPaddon(decodeText)
    setScannerFixPaddon(false)
  }
  const handleSuccessScan = (decodeText: string) => {
    setId(decodeText)
    setScannerSetId(false)
  }

  const product = useGetProduct(id)

  useEffect(() => {
    if (id) {
      product.refetch()
    }
  }, [id])

  const moveProduct = useMoveProduct()

  function handleMoveToPaddon() {
    moveProduct.mutate({ id: id, place: fixPaddon, type: 1 })
    setId('')
    setStep(1)
  }
  return (
    <div className="flex flex-col items-start">
      <UiHeading level={'2'}>Добавление фото</UiHeading>
      <div className="p-4 shadow rounded-lg border-gray-100 border space-y-4">
        <div className="flex items-center gap-2">
          <div>
            {fixPaddon ? `Поддон зафиксирован: ` : 'Зафиксировать поддон'}
            {fixPaddon && (
              <span className="bg-red-600 p-1 rounded text-white font-semibold">
                {fixPaddon}
              </span>
            )}
          </div>
          <Dialog open={scannerFixPaddon} onOpenChange={setScannerFixPaddon}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <QrCode />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] w-full">
              <DialogHeader>
                <DialogTitle>Отсканируйте поддон</DialogTitle>
              </DialogHeader>
              <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleFixPaddon}
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
        </div>
        {step === 1 && (
          <div className="flex flex-col items-start gap-2">
            <div className="flex gap-2 items-center">
              <div>
                <div>1 этап: Найти деталь</div>
                {id && <div>Деталь: {id}</div>}
              </div>
              <Dialog open={scannerSetId} onOpenChange={setScannerSetId}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <QrCode />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[800px] w-full">
                  <DialogHeader>
                    <DialogTitle>Отсканируйте деталь</DialogTitle>
                  </DialogHeader>
                  <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={handleSuccessScan}
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
            </div>
            <Button onClick={() => setStep(2)} disabled={!id}>
              Далее
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-start gap-2 ">
            <div>2 этап: Загрузить фото</div>
            {product.data && (
              <>
                <div>Деталь: {product.data.indcode}</div>
                <div className="flex flex-col w-full">
                  <UploadForm id={product.data.indcode} />
                </div>
              </>
            )}
            <Button onClick={() => setStep(1)}>Назад</Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!product.data?.photos.length || product.isFetching}
            >
              {product.isFetching ? <UiSpinner /> : 'Далее'}
            </Button>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-start gap-2 ">
            <div>3 этап: Выбрать главную</div>
            <div className="flex gap-2">
              {product.isFetching ? (
                <UiSpinner />
              ) : (
                <>
                  {product.data && (
                    <ListImages
                      photos={product.data.photos}
                      productId={product.data.indcode}
                      isFetching={product.isFetching}
                    />
                  )}
                </>
              )}
            </div>
            <Button onClick={() => setStep(2)}>Назад</Button>
            <Button onClick={() => setStep(4)}>Далее</Button>
          </div>
        )}
        {step === 4 && (
          <div>
            <div>4 этап: Положить в поддон</div>
            <div className="space-x-2">
              <Button onClick={() => setStep(3)}>Назад</Button>
              <Button onClick={() => handleMoveToPaddon()} disabled={!fixPaddon}>
                Положить в поддон
              </Button>
            </div>
            <span className="text-red-500">
              {!fixPaddon ? '(Зафиксируйте поддон)' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
