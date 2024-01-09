import { UiHeading } from '@/shared/ui/components/ui-heading'
import { CatalogWidget } from '@/widgets/catalog'
import { HeaderLayoutWidget } from '@/widgets/header'

export function CatalogPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-2">
        <UiHeading level={'1'}>Каталог товаров</UiHeading>
        <CatalogWidget />
      </main>
    </HeaderLayoutWidget>
  )
}
