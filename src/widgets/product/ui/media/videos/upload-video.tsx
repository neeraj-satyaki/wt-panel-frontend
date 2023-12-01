import React from 'react'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { useUploadImages } from '../../../model/use-upload-images'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import AnimateSuccess from '@/shared/ui/animations/success'
import AnimateError from '@/shared/ui/animations/error'
import { UiHeading } from '@/shared/ui/components/ui-heading'

type Props = {}

export function UploadVideo({}: Props) {
  return (
    <div className="text-sm">
      <form className="flex gap-2">
        <UiTextField
          inputProps={{
            type: 'file',
            multiple: true,
            required: true,
          }}
        />
        <UiButton variant="primary" type="submit" className="px-4">
          Добавить видео
        </UiButton>
      </form>
    </div>
  )
}
