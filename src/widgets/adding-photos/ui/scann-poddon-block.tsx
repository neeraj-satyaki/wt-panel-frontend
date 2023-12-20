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
import { useState } from 'react'
import { addingPhotosStore } from '../model/store'

export function ScannPoddonBlock() {
  const { handlePadddonId } = addingPhotosStore()

  const [scannerPaddon, setScannerPoddon] = useState(false)
  const handleScannerPaddon = (decodedText: string) => {
    handlePadddonId(decodedText)
    setScannerPoddon(false)
  }
  return (
    <Dialog open={scannerPaddon} onOpenChange={setScannerPoddon}>
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
          qrCodeSuccessCallback={handleScannerPaddon}
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
