import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SearchPanel } from './search-panel'
import { ListProducts } from './list-products/list-products'
import { useListProducts } from '../model/use-list-products'
import { IconQrCode } from '@/shared/ui/icons/icon-qr-code'
import { useQrCodeScanner } from '../model/qr-code-scanner'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { Filters } from './filters'
import { Button } from '@/shared/ui/components/ui/button'

const ScannerFindProduct = lazy(() => import('./scanner-find-product'))

export function Catalog() {
  const products = useListProducts()
  const scanner = useQrCodeScanner()

  return (
    <div className="flex flex-col gap-4">
      {scanner.showScanner && (
        <Suspense fallback={<UiPageSpinner />}>
          <ScannerFindProduct
            close={scanner.closeScanner}
            successScan={scanner.handleSuccessScan}
          />
        </Suspense>
      )}
      <div className="flex justify-between">
        <UiHeading level={'1'}>Каталог товаров</UiHeading>
        <Button variant="outline" className="p-2" onClick={() => scanner.openScanner()}>
          <IconQrCode />
        </Button>
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
