import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { Product } from '@/widgets/product'

function ProductPage({ id }: { id: string }) {
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

export default authProtectedPage(ProductPage)
