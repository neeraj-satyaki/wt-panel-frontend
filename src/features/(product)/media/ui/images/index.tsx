import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UploadForm } from './upload-images'
import { ListImages } from './list-images'

type Props = {
  photos: string[]
  productId: string
  isFetching: boolean
}

export function Images({ photos, productId, isFetching }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <UiHeading level={'4'}>Фотографии ({photos.length})</UiHeading>
      <UploadForm id={productId} />
      <ListImages photos={photos} productId={productId} isFetching={isFetching} />
    </div>
  )
}
