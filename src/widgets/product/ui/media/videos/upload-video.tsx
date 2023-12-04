import React from 'react'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { UiButton } from '@/shared/ui/components/ui-button'

type Props = {}

export function UploadVideo({}: Props) {
  return (
    <div className="text-sm">
      <form className="flex gap-2 flex-col 430:flex-row">
        <UiTextField
          inputProps={{
            type: 'file',
            multiple: true,
            required: true,
          }}
        />
        <UiButton
          variant="primary"
          type="submit"
          className="py-2 text-xl w-full 430:w-auto 430:px-4 430:text-base 430:py-0"
        >
          Добавить
        </UiButton>
      </form>
    </div>
  )
}
