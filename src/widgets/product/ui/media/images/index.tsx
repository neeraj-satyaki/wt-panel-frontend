import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UploadForm } from './upload-images'
import { ListImages } from './list-images'

type Props = {
  photos: string[]
  productId: string
  isFetching: boolean
  deleteImageHook: any
  uploadImages: any
}

export function Images({
  photos,
  productId,
  isFetching,
  deleteImageHook,
  uploadImages,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <UiHeading level={'4'}>Фотографии ({photos.length})</UiHeading>
      <UploadForm uploadImages={uploadImages} />
      <ListImages
        photos={photos}
        productId={productId}
        isFetching={isFetching}
        deleteImageHook={deleteImageHook}
      />
    </div>
  )
}
