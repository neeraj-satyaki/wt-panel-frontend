import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { Catalog } from '@/features/catalog'
import { HeaderLayout } from '@/widgets/header'

export function CatalogPage() {
  return (
    <HeaderLayout>
      <AuthProtectedPage>
        <main>
          <Catalog />
        </main>
      </AuthProtectedPage>
    </HeaderLayout>
  )
}
