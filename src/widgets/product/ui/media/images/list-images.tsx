import { UiButton } from '@/shared/ui/components/ui-button'
import Image from 'next/image'
import { useState } from 'react'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import clsx from 'clsx'
import { MediaListLayout } from '../media-list-layout'

type Props = {
  photos: string[]
  productId: string
  isFetching: boolean
  deleteImageHook: any
}

export function ListImages({ photos, productId, isFetching, deleteImageHook }: Props) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
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
      <div className="flex gap-4 flex-col justify-center">
        {isFetching ? (
          <div className="py-20">
            <UiSpinner className="mx-auto" />
          </div>
        ) : (
          <MediaListLayout>
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
          </MediaListLayout>
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
