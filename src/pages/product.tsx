import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { Product } from '@/widgets/product'

export function ProductPage({ id }: { id: string | string[] }) {
  return (
    <UiHeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <Product id={id} />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </UiHeaderLayout>
  )
}
