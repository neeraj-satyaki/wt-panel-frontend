import { useUploadImage } from '@/entities/products/api'
import { useSessionQuery } from '@/entities/session'
import { Button } from '@/shared/ui/components/ui/button'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  id: string
}

export function UploadForm({ id }: Props) {
  const { register, handleSubmit } = useForm()
  const session = useSessionQuery()
  const uploadImagesMutation = useUploadImage()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const photosArray: Blob[] = Array.from(data.photos)
    uploadImagesMutation.mutate({
      productId: id,
      files: photosArray,
      userId: session.data?.id,
      username: session.data?.name,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <label
          htmlFor="photos"
          className="border border-gray-200 flex justify-center items-center h-10 rounded-lg"
        >
          Выберите фотографии:
        </label>
        <input
          className="hidden"
          type="file"
          id="photos"
          accept="image/*"
          multiple
          {...register('photos')}
        />
      </div>

      <div>
        <Button type="submit">Загрузить</Button>
      </div>
    </form>
  )
}
