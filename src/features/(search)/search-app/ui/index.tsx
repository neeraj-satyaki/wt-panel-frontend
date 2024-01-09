import { routes } from '@/shared/constants/routing'
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
import { useRouter } from 'next/router'

export function SearchApp() {
  const router = useRouter()
  function handleSuccessScan(decodedText: string) {
    router.push(routes.APPLICATION + '/' + decodedText)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
          variant="primary"
        >
          Найти заявку
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Отсканируйте заявку</DialogTitle>
        </DialogHeader>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={handleSuccessScan}
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
