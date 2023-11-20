import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { Catalog } from '@/features/catalog'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function CatalogPage() {
  return (
    <UiHeaderLayout>
      <AuthProtectedPage>
        <main>
          <Catalog />
        </main>
      </AuthProtectedPage>
    </UiHeaderLayout>
  )
}
