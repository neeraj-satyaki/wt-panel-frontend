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

export function ScanPlace() {
  const { handleScanPlace, setStep, faketype } = useMovingProductState()
  const handleScan = (decodedText: string) => {
    setStep(2)
    handleScanPlace(decodedText)
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-col 1024:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="text-xl py-7 font-semibold 1024:text-sm 1024:py-4"
            >
              {faketype === 0 && 'Отсканируйте полку'}
              {faketype === 1 && 'Отсканируйте поддон'}
              {faketype === 2 && 'Отсканируйте корзину'}{' '}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>
                {faketype === 0 && 'Отсканируйте полку'}
                {faketype === 1 && 'Отсканируйте поддон'}
                {faketype === 2 && 'Отсканируйте корзину'}
              </DialogTitle>
            </DialogHeader>
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={handleScan}
            />
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
    </div>
  )
}
