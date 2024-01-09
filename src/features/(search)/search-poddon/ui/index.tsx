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
import { useState } from 'react'
import { useRouter } from 'next/router'
import { routes } from '@/shared/constants/routing'

export function SearchPoddon({ text = 'Найти поддон' }: { text?: string }) {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const handleShowScanner = (decodedText: string) => {
    router.push(routes.PODDON + '/' + decodedText)
    setShow(false)
  }
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button
          className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
          variant="primary"
        >
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Сканируйте место </DialogTitle>
        </DialogHeader>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={(decodedText: string) => handleShowScanner(decodedText)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-xl font-semibold h-16"
            >
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
