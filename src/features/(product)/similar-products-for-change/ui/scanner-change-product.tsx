import { useChangeProduct } from '@/entities/panel/api'
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
import { QrCodeIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSimilarProductsForChangeStore } from '../model/store'

type Props = {
  appId: string
  pose: number
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export function ScannerChangeProduct({ pose, appId, setIsShow }: Props) {
  const { setPage, setSelectProduct, selectedProduct } =
    useSimilarProductsForChangeStore()
  const [showScanner, setShowScanner] = useState(false)
  const changeProduct = useChangeProduct(selectedProduct)

  const submit = (decodeText: string) => {
    changeProduct.mutate({
      id: appId,
      indCode: decodeText,
      pose,
      type: 'Заявка',
    })
    setShowScanner(false)
    setIsShow(false)
    setPage(1)
    setSelectProduct('')
  }
  return (
    <Dialog open={showScanner} onOpenChange={setShowScanner}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <QrCodeIcon />
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
          qrCodeSuccessCallback={submit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-xl font-semibold h-14"
            >
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
