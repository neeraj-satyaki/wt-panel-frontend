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
import { useMovingProductState } from '../model/store'

export function ScanDetail() {
  const { productId, handleScanProductId, clearProduct, setStep } =
    useMovingProductState()

  const handleScan = (decodedText: string) => {
    setStep(1)
    handleScanProductId(decodedText)
  }
  return (
    <div className="flex flex-col 1024:block">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="primary"
            className="text-xl py-7 font-semibold 1024:text-sm 1024:py-4"
          >
            Сканировать деталь
          </Button>
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
              qrCodeSuccessCallback={handleScan}
            />
          ) : (
            <>
              <Button
                onClick={() => clearProduct()}
                className="text-lg py-6 font-semibold 1024:text-sm 1024:py-4"
              >
                Заменить на другую деталь
              </Button>
            </>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Ок
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
