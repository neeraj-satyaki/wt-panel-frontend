import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SearchPanel } from './search-panel'
import { ListProducts } from './list-products/list-products'
import { useListProducts } from '../model/use-list-products'
import { useQrCodeScanner } from '../model/qr-code-scanner'
import { Filters } from './filters'
import { lazy } from 'react'

const LazySearchByQrCode = lazy(() => import('./search-by-qr-code')) // Замените на путь к вашему компоненту Dialog

export function Catalog() {
  const products = useListProducts()
  const { handleSuccessScan } = useQrCodeScanner()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <UiHeading level={'1'}>Каталог товаров</UiHeading>
        <LazySearchByQrCode handleSuccessScan={handleSuccessScan} />
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
