import { useChangeProduct } from '@/entities/panel/queries'
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
import { IconQrCode } from '@/shared/ui/icons/icon-qr-code'
import { QrCodeIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  appId: string
  pose: number
}

export function ScannerChangeProduct({ pose, appId }: Props) {
  const changeProduct = useChangeProduct()
  const [showScanner, setShowScanner] = useState(false)

  const submit = (decodeText: string) => {
    changeProduct.mutate({
      id: appId,
      indCode: decodeText,
      pose,
      type: 'Заявка',
    })
    setShowScanner(false)
  }
  return (
    <Dialog open={showScanner} onOpenChange={setShowScanner}>
      <DialogTrigger asChild>
        <Button variant="outline" size={'icon'}>
          <QrCodeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Отсканируйте паллет</DialogTitle>
        </DialogHeader>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={submit}
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
