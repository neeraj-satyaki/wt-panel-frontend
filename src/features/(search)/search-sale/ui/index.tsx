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

export function SearchSale() {
  const router = useRouter()
  function handleSuccessScan(decodedText: string) {
    router.push(routes.SALE + '/' + decodedText)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Найти продажу</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Отсканируйте продажу</DialogTitle>
        </DialogHeader>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={handleSuccessScan}
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