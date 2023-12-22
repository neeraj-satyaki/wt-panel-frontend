import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SearchPanel } from './search-panel'
import { ListProducts } from './list-products/list-products'
import { useListProducts } from '../model/use-list-products'
import { Filters } from './filters'
import { SearchProductQr } from '@/features/(search)/search-product'

export function Catalog() {
  const products = useListProducts()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <UiHeading level={'1'}>Каталог товаров</UiHeading>
        <SearchProductQr />
      </div>

      <SearchPanel
        isFetching={products.isLoading}
        q={products.q}
        setQ={products.setQ}
        handleSearch={products.handleSearch}
      />
      <Filters />
      <ListProducts
        isLoading={products.isLoading}
        isError={products.isError}
        data={products.data}
        q={products.q}
        currentPage={products.currentPage}
        nextPage={products.nextPage}
        prevPage={products.prevPage}
      />
    </div>
  )
}
