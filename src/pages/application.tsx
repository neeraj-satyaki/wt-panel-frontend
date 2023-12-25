import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { Application } from '@/widgets/application'
import { HeaderLayout } from '@/widgets/header'

export function ApplicationPage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <main>
          <Application id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
