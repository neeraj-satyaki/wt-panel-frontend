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

type Props = {
  palleteId: string
  handleScanPalleteId: (decodedText: string) => void
  clearPallete: () => void
}

export const DialogPallete = ({
  palleteId,
  handleScanPalleteId,
  clearPallete,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Сканировать паллет</Button>
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
            qrCodeSuccessCallback={handleScanPalleteId}
          />
        ) : (
          <>
            <div>Деталь отсканирована {palleteId}</div>
            <Button onClick={() => clearPallete()}>Сканировать новую</Button>
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
  )
}
