import { CatalogWidget } from '@/widgets/catalog'
import { HeaderLayoutWidget } from '@/widgets/header'

export function CatalogPage() {
  return (
    <HeaderLayoutWidget>
      <main>
        <CatalogWidget />
      </main>
    </HeaderLayoutWidget>
  )
}
