import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { Product } from '@/widgets/product'

export default function ProductPage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <main>
          <Product id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
