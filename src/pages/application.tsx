import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { ApplicationWidget } from '@/widgets/application'
import { HeaderLayoutWidget } from '@/widgets/header'

export function ApplicationPage({ id }: { id: string }) {
  return (
    <HeaderLayoutWidget>
      <UiBackBtnLayout>
        <main>
          <ApplicationWidget id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayoutWidget>
  )
}
