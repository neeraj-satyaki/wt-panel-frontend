import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayoutWidget } from '@/widgets/header'
import { ProductWidget } from '@/widgets/product'

export function ProductPage({ id }: { id: string }) {
  return (
    <HeaderLayoutWidget>
      <UiBackBtnLayout>
        <main>
          <ProductWidget id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayoutWidget>
  )
}
