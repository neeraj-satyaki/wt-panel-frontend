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
  handleSuccessScan: (decodeText: string) => void
}

export default function SearchByQrCode({ handleSuccessScan }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Поиск детали по qr коду</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Отсканируйте деталь</DialogTitle>
        </DialogHeader>
        <Html5QrcodePlugin
          onSuccessScan={(decodeText: string) => handleSuccessScan(decodeText)}
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
