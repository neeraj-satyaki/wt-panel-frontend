import { SearchProductQr } from '@/features/(search)/search-product'
import { SearchPanel } from './search-panel'
import { Filters } from './filters'
import { ListProducts } from './list-products'
import { useProducts } from '../model/use-products'

export function CatalogWidget() {
  const products = useProducts()
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SearchProductQr />
      </div>
      <SearchPanel products={products} />
      <Filters />
      <ListProducts products={products} />
    </div>
  )
}
