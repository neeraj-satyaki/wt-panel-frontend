import { UiButton } from '@/shared/ui/components/ui-button'
import Image from 'next/image'
import { useState } from 'react'
import { useDeleteImageA } from '../../../model/use-delete-images'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import clsx from 'clsx'

type Props = {
  photos: string[]
  productId: string
  isFetching: boolean
}

export function ListImages({ photos, productId, isFetching }: Props) {
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

  return (
    <div className="flex flex-col gap-2">
      {deleteImageHook.resultModal && (
        <UiPageModalLayout close={() => deleteImageHook.setResultModal(false)}>
          {deleteImageHook.isSuccess ? (
            <div className="flex flex-col gap-2 items-center">
              <AnimateSuccess />
              <UiHeading level={'4'}>Успешно</UiHeading>
            </div>
          ) : null}
          {deleteImageHook.isError ? (
            <div className="flex flex-col gap-2 items-center">
              <AnimateError />
              <UiHeading level={'4'}>Произошла ошибка</UiHeading>
            </div>
          ) : null}
        </UiPageModalLayout>
      )}
      <div className="flex gap-4 flex-col justify-center">
        {isFetching ? (
          <div className="py-20">
            <UiSpinner className="mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 1024:grid-cols-5 gap-4">
            {photos.map((photo, i) => {
              const isSelected = selectedPhotos.includes(photo)

              return (
                <div
                  key={i}
                  className={clsx(`relative cursor-pointer rounded-sm  overflow-hidden`, {
                    'shadow-lg shadow-green-400/40 border-4 border-green-400': isSelected,
                  })}
                  onClick={() => togglePhotoSelection(photo)}
                >
                  <Image
                    src={photo}
                    alt={`img-${i}`}
                    width={600}
                    height={600}
                    priority={true}
                    className="object-cover h-52 w-full"
                  />
                </div>
              )
            })}
          </div>
        )}
        {selectedPhotos.length > 0 && (
          <div className="self-center">
            <UiButton variant="danger" onClick={handleDelete} className="px-4 py-2">
              Удалить
            </UiButton>
          </div>
        )}
      </div>
    </div>
  )
}
