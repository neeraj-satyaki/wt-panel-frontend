import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SearchPanel } from './search-panel'
import { ListProducts } from './list-products/list-products'
import { useListProducts } from '../model/use-list-products'
import { useQrCodeScanner } from '../model/qr-code-scanner'
import { Filters } from './filters'
import { SearchByQrCode } from './search-by-qr-code'

export function Catalog() {
  const products = useListProducts()
  const { handleSuccessScan } = useQrCodeScanner()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <UiHeading level={'1'}>Каталог товаров</UiHeading>
        <SearchByQrCode handleSuccessScan={handleSuccessScan} />
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
