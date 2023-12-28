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

export const DialogPallete = () => {
  const { palleteId, handleScanPalleteId, clearPallete, setStep } = useMovingPalletState()
  const handleScann = (decodedText: string) => {
    setStep(1)
    handleScanPalleteId(decodedText)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="text-lg font-semibold py-6">
          Сканировать паллет
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Отсканируйте паллет</DialogTitle>
        </DialogHeader>

        {!palleteId ? (
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={handleScann}
          />
        ) : (
          <>
            <Button onClick={() => clearPallete()}>Заменить на другой паллет</Button>
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
