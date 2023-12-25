import { Catalog } from '@/features/catalog'
import { HeaderLayout } from '@/widgets/header'

export function CatalogPage() {
  return (
    <HeaderLayout>
      <main>
        <Catalog />
      </main>
    </HeaderLayout>
  )
}
