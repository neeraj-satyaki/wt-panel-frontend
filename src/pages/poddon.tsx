import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { PoddonWidget } from '@/widgets/poddon'

export default function PoddonPage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <main>
          <PoddonWidget id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
