import { UiHeading } from '@/shared/ui/components/ui-heading'

import { SearchProductQr } from '@/features/(search)/search-product'
import { SearchPanel } from './search-panel'
import { Filters } from './filters'
import { ListProducts } from './list-products'
import { useProducts } from '../model/use-products'

export function CatalogWidget() {
  const products = useProducts()
  return (
    <div className="flex flex-col gap-4">
      <UiHeading level={'1'}>Каталог товаров</UiHeading>
      <div>
        <SearchProductQr />
      </div>
      <SearchPanel products={products} />
      <Filters />
      <ListProducts products={products} />
    </div>
  )
}
