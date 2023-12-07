import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { Catalog } from '@/features/catalog'
import { HeaderLayout } from '@/widgets/header'

function CatalogPage() {
  return (
    <HeaderLayout>
      <main>
        <Catalog />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(CatalogPage)
