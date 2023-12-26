import { Catalog } from '@/features/catalog'
import { HeaderLayoutWidget } from '@/widgets/header'

export function CatalogPage() {
  return (
    <HeaderLayoutWidget>
      <main>
        <Catalog />
      </main>
    </HeaderLayoutWidget>
  )
}
