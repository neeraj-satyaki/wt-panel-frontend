import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

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
        <UiTextField
          inputProps={{
            type: 'file',
            multiple: true,
            ...uploadImages.register('files', {}),
            required: true,
          }}
        />
        <UiButton
          variant="primary"
          type="submit"
          className="py-2 text-xl w-full 430:w-auto 430:px-4 430:text-base 430:py-0 "
          disabled={uploadImages.isPending}
        >
          {uploadImages.isPending ? <UiSpinner /> : 'Добавить'}
        </UiButton>
      </form>
    </div>
  )
}
