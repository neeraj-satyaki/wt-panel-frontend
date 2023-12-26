import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayoutWidget } from '@/widgets/header'
import { ShelfWidget } from '@/widgets/shelf'

export function ShelfPage({ id }: { id: string }) {
  return (
    <HeaderLayoutWidget>
      <UiBackBtnLayout>
        <main>
          <ShelfWidget id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayoutWidget>
  )
}
