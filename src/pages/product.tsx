import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { Product } from '@/widgets/product'

export function ProductPage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <Product id={id} />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
