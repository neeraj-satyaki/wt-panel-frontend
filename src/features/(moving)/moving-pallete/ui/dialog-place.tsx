import { useGetProduct } from '@/entities/products/api'
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
  placeId: string
  handleScanPlace: (decodedText: string) => void
  clearPlace: () => void
}

export const DialogPlace = ({ placeId, handleScanPlace, clearPlace }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="text-lg font-semibold py-6">
          Сканировать место
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Отсканируйте паллет</DialogTitle>
        </DialogHeader>

        {!placeId ? (
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={handleScanPlace}
          />
        ) : (
          <>
            <div>Место отсканировано {placeId}</div>
            <Button onClick={() => clearPlace()}>Заменить на другое место</Button>
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
