import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { useMovingProductState } from '../model/state'

import { Button } from '@/shared/ui/components/ui/button'
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'

export default function ScannerMoveProduct({
  handleSubmit,
}: {
  handleSubmit: () => void
}) {
  const {
    productId,
    handleScanProductId,
    handleScanPlace,
    type,
    setType,
    place,
    clearProduct,
    clearPlace,
  } = useMovingProductState()

  const configureScanner = (qrCodeSuccessCallback: any, key: string) => (
    <Html5QrcodePlugin
      onSuccessScan={(decodeText: string) => qrCodeSuccessCallback(decodeText, '')}
    />
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button variant={type === 0 ? 'primary' : 'outline'} onClick={() => setType(0)}>
          На полку
        </Button>
        <Button variant={type === 1 ? 'primary' : 'outline'} onClick={() => setType(1)}>
          На поддон
        </Button>
      </div>
      <div>
        <div>Деталь: {productId}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Сканировать деталь</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>Отсканируйте деталь</DialogTitle>
            </DialogHeader>

            {!productId ? (
              <>
                {configureScanner(
                  (decodedText: any) => handleScanProductId(decodedText),
                  `scanner-product-${productId}`, // Уникальный ключ для сканнера детали
                )}
              </>
            ) : (
              <>
                <div>Деталь отсканирована {productId}</div>
                <Button onClick={() => clearProduct()}>Сканировать новую</Button>
              </>
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
      </div>
      <div>
        <div>Полка: {place}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Сканировать полку</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>Отсканируйте полку</DialogTitle>
            </DialogHeader>
            {!place ? (
              <>
                {configureScanner(
                  (decodedText: string) => handleScanPlace(decodedText),
                  `scanner-product-place-${productId}`, // Уникальный ключ для сканнера полки
                )}
              </>
            ) : (
              <>
                <div>Деталь отсканирована {place}</div>
                <Button onClick={() => clearPlace()}>Сканировать новую</Button>
              </>
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
      </div>

      <Button
        variant={'primary'}
        disabled={!productId || !place}
        onClick={() => handleSubmit()}
      >
        Переместить
      </Button>
    </div>
  )
}
