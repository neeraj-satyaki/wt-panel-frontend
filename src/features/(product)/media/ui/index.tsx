import { Images } from './images'
import { Videos } from './videos'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'

type Props = {
  photos: string[]
  productId: string
  isFetching: boolean
}
export function Media({ photos, productId, isFetching }: Props) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">Медиа</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] w-full h-[90vh] overflow-auto block space-y-6">
          <DialogHeader>
            <DialogTitle>Медиа</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6">
            <Images photos={photos} productId={productId} isFetching={isFetching} />
            {/* <Videos /> */}
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
