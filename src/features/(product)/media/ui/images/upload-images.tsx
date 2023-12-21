import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { useSessionQuery } from '@/entities/session'
import { useUploadImages } from '@/features/(product)/media/model/use-upload-images'

type Props = {
  id: string
}

export function UploadForm({ id }: Props) {
  const session = useSessionQuery()
  const uploadImages = useUploadImages(id, session.data?.id, session.data?.name)

  return (
    <div className="text-sm">
      <form
        onSubmit={uploadImages.handleSubmit}
        className="flex gap-2 flex-col 430:flex-row"
      >
        <Input
          type="file"
          multiple={true}
          required={true}
          {...uploadImages.register('files', {})}
        />
        <Button variant="default" type="submit" disabled={uploadImages.isPending}>
          {uploadImages.isPending ? <UiSpinner /> : 'Добавить'}
        </Button>
      </form>
    </div>
  )
}
