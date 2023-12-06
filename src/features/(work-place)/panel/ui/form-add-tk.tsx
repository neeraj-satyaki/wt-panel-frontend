import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { UiTextField } from '@/shared/ui/components/ui-text-field'

export default function FormAddTk({ close }: { close: Function }) {
  return (
    <UiPageModalLayout close={() => close()}>
      <form
        className="flex flex-col gap-6 z-50 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <UiHeading level={'3'}>Информация о тк</UiHeading>

        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            <UiTextField label="Название" />
            <UiTextField label="Название" />
            <UiTextField label="Название" />
            <UiTextField label="Название" />
            <UiTextField label="Название" />
          </div>
          <div className="flex flex-col gap-3">
            <UiTextField label="Название" />
            <UiTextField label="Название" />
            <UiTextField label="Название" />
            <UiTextField label="Название" />
            <UiTextField label="Название" />
          </div>
        </div>
        <UiButton variant="primary" className="px-4 py-2">
          Отправить
        </UiButton>
      </form>
    </UiPageModalLayout>
  )
}
