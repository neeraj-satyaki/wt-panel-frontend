import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { useState } from 'react'
import { Images } from './images'
import { Videos } from './videos'

type Props = {
  photos: string[]
  productId: string
  isFetching: boolean
  deleteImageHook: any
  uploadImages: any
}
export default function Media({
  photos,
  productId,
  isFetching,
  deleteImageHook,
  uploadImages,
}: Props) {
  const [mediaModal, setMediaModal] = useState(false)
  return (
    <div>
      <UiButton
        variant={'primary'}
        className="px-4 py-2"
        onClick={() => setMediaModal(true)}
      >
        Медиа
      </UiButton>
      {mediaModal && (
        <UiPageModalLayout close={() => setMediaModal(false)}>
          <div className="grid grid-cols-1 gap-6">
            <Images
              photos={photos}
              productId={productId}
              isFetching={isFetching}
              deleteImageHook={deleteImageHook}
              uploadImages={uploadImages}
            />
            <Videos />
          </div>
        </UiPageModalLayout>
      )}
    </div>
  )
}
