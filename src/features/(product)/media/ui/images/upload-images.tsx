import { useUploadImage } from '@/entities/products/api'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  id: string
}

export function UploadForm({ id }: Props) {
  const session = useSessionQuery()
  const uploadImagesMutation = useUploadImage()
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([])

  const { register, handleSubmit, reset } = useForm({})

  const onSubmit = async () => {
    const photosArray: Blob[] = Array.from(selectedPhotos)
    await uploadImagesMutation.mutateAsync({
      productId: id,
      files: photosArray,
      userId: session.data?.id,
      username: session.data?.name,
    })

    reset()
    setSelectedPhotos([])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedPhotos(Array.from(e.target.files))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <label
        htmlFor="photos"
        className="flex h-10 justify-center items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg cursor-pointer"
      >
        Выбрать фотографии ({selectedPhotos.length})
      </label>
      <input
        type="file"
        {...register('photos')}
        className="hidden"
        id="photos"
        multiple={true}
        required={true}
        onChange={handleFileChange}
      />
      <Button disabled={uploadImagesMutation.isPending || selectedPhotos.length === 0}>
        {uploadImagesMutation.isPending ? <UiSpinner /> : 'Добавить'}
      </Button>
    </form>
  )
}
