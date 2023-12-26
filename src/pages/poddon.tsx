import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayoutWidget } from '@/widgets/header'
import { PoddonWidget } from '@/widgets/poddon'

export function PoddonPage({ id }: { id: string }) {
  return (
    <HeaderLayoutWidget>
      <UiBackBtnLayout>
        <main>
          <PoddonWidget id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayoutWidget>
  )
}
