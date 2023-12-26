import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayoutWidget } from '@/widgets/header'
import { SaleWidget } from '@/widgets/sale'

export function SalePage({ id }: { id: string }) {
  return (
    <HeaderLayoutWidget>
      <UiBackBtnLayout>
        <main>
          <SaleWidget id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayoutWidget>
  )
}
