import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { useMovingProductState } from '../model/store'

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

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button variant={type === 0 ? 'default' : 'outline'} onClick={() => setType(0)}>
          На полку
        </Button>
        <Button variant={type === 1 ? 'default' : 'outline'} onClick={() => setType(1)}>
          На поддон
        </Button>
      </div>
      <div>
        <div>Деталь: {productId}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Сканировать деталь</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>Отсканируйте деталь</DialogTitle>
            </DialogHeader>

            {!productId ? (
              <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScanProductId}
              />
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
            <Button variant="default">Сканировать полку</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>Отсканируйте полку</DialogTitle>
            </DialogHeader>
            {!place ? (
              <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScanPlace}
              />
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
        variant="default"
        disabled={!productId || !place}
        onClick={() => handleSubmit()}
      >
        Переместить
      </Button>
    </div>
  )
}
