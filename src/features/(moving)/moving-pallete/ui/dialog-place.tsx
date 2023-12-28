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
import { useMovingPalletState } from '../model/store'

export const DialogPlace = () => {
  const { handleScanPlace, place, clearPlace, setStep } = useMovingPalletState()
  const handleScann = (decodedText: string) => {
    handleScanPlace(decodedText)
    setStep(2)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="text-lg font-semibold py-6">
          Сканировать место
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Отсканируйте место</DialogTitle>
        </DialogHeader>

        {!place ? (
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={handleScann}
          />
        ) : (
          <>
            <div>Место отсканировано {place}</div>
            <Button onClick={() => clearPlace()} variant="primary">
              Заменить на другое место
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
  )
}
