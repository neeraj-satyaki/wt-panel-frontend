import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'

type Props = {
  uploadImages: any
}

export function UploadForm({ uploadImages }: Props) {
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
        <Button variant="primary" type="submit" disabled={uploadImages.isPending}>
          {uploadImages.isPending ? <UiSpinner /> : 'Добавить'}
        </Button>
      </form>
    </div>
  )
}
