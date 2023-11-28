import React from 'react'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { useUploadImages } from '../../model/use-upload-images'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import AnimateSuccess from '@/shared/ui/animations/success'
import AnimateError from '@/shared/ui/animations/error'
import { UiHeading } from '@/shared/ui/components/ui-heading'

type Props = {
  productId: string
}

export function UploadForm({ productId }: Props) {
  const {
    register,
    handleSubmit,
    isSuccess,
    isPending,
    isError,
    closeResultModal,
    resultModal,
  } = useUploadImages(productId)

  return (
    <div className="text-sm">
      {resultModal && (
        <UiPageModalLayout close={() => closeResultModal()}>
          {isSuccess ? (
            <div className="flex flex-col gap-2 items-center">
              <AnimateSuccess />
              <UiHeading level={'4'}>Успешно</UiHeading>
            </div>
          ) : null}
          {isError ? (
            <div className="flex flex-col gap-2 items-center">
              <AnimateError />
              <UiHeading level={'4'}>Произошла ошибка</UiHeading>
            </div>
          ) : null}
        </UiPageModalLayout>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <UiTextField
          inputProps={{
            type: 'file',
            multiple: true,
            ...register('files', {}),
            required: true,
          }}
        />
        <UiButton variant="primary" type="submit" className="px-4" disabled={isPending}>
          {isPending ? <UiSpinner /> : 'Добавить'}
        </UiButton>
      </form>
    </div>
  )
}
