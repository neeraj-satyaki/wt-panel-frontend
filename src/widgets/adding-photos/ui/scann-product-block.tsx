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
import { QrCode } from 'lucide-react'
import { addingPhotosStore } from '../model/store'
import { useState } from 'react'

export function ScannProductBlock() {
  const { handleProductId } = addingPhotosStore()

  const [scannerProductId, setScannerProductId] = useState(false)
  const handleScannerProductId = (decodedText: string) => {
    handleProductId(decodedText)
    setScannerProductId(false)
  }
  return (
    <Dialog open={scannerProductId} onOpenChange={setScannerProductId}>
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
          qrCodeSuccessCallback={handleScannerProductId}
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
  )
}
