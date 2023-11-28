import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import Image from 'next/image'
import { useState } from 'react'
import { useDeleteImageA } from '../../model/use-delete-images'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

type Props = {
  photos: string[]
  productId: string
}

export function DeleteBtn({ photos, productId }: Props) {
  const [deletedModal, setDeletedModal] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const deleteImageHook = useDeleteImageA()

  const togglePhotoSelection = (photo: string) => {
    setSelectedPhotos((prevSelected) => {
      if (prevSelected.includes(photo)) {
        return prevSelected.filter((selected) => selected !== photo)
      } else {
        return [...prevSelected, photo]
      }
    })
  }
  const handleDelete = () => {
    deleteImageHook.mutate({ productId, image: selectedPhotos })
    setSelectedPhotos([])
  }

  const toggleModal = () => {
    deleteImageHook.reset()
    setDeletedModal(!deletedModal)
  }

  return (
    <div>
      <UiButton
        variant="danger"
        className="px-4 py-2 text-sm"
        onClick={() => toggleModal()}
      >
        Удалить фотографии
      </UiButton>
      {deletedModal && (
        <UiPageModalLayout close={() => toggleModal()}>
          {deleteImageHook.isError ? <AnimateError /> : null}
          {deleteImageHook.isSuccess ? <AnimateSuccess /> : null}
          {!deleteImageHook.isPending &&
          !deleteImageHook.isSuccess &&
          !deleteImageHook.isError ? (
            <div className="flex gap-4 flex-col justify-center">
              <div className="grid grid-cols-4 gap-4">
                {photos.map((photo, i) => {
                  const isSelected = selectedPhotos.includes(photo)

                  return (
                    <div
                      key={i}
                      className={`relative cursor-pointer ${
                        isSelected
                          ? 'border-1 border-green-500 overflow-hidden shadow-lg shadow-green-200'
                          : ''
                      }`}
                      onClick={() => togglePhotoSelection(photo)}
                    >
                      <Image
                        src={photo}
                        alt={`img-${i}`}
                        width={600}
                        height={600}
                        priority={true}
                        className="w-96 h-96 object-cover rounded-sm"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 border-4 border-green-500"></div>
                      )}
                    </div>
                  )
                })}
              </div>
              {selectedPhotos.length > 0 && (
                <div className="self-center">
                  <UiButton variant="danger" onClick={handleDelete} className="px-4 py-2">
                    Подтвердить удаление
                  </UiButton>
                </div>
              )}
            </div>
          ) : null}
        </UiPageModalLayout>
      )}
    </div>
  )
}
