import React from 'react'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { useUploadImages } from '../../../model/use-upload-images'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import AnimateSuccess from '@/shared/ui/animations/success'
import AnimateError from '@/shared/ui/animations/error'

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
              <div>Успешно</div>
            </div>
          ) : null}
          {isError ? (
            <div className="flex flex-col gap-2 items-center">
              <AnimateError />
              <div>Произошла ошибка</div>
            </div>
          ) : null}
        </UiPageModalLayout>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col 430:flex-row">
        <UiTextField
          inputProps={{
            type: 'file',
            multiple: true,
            ...register('files', {}),
            required: true,
          }}
        />
        <UiButton
          variant="primary"
          type="submit"
          className="py-2 text-xl w-full 430:w-auto 430:px-4 430:text-base 430:py-0 "
          disabled={isPending}
        >
          {isPending ? <UiSpinner /> : 'Добавить'}
        </UiButton>
      </form>
    </div>
  )
}
