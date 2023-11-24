import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SearchPanel } from './search-panel'
import { ListProducts } from './list-products'
import { useListProducts } from '../model/use-list-products'
import { UiButton } from '@/shared/ui/components/ui-button'
import { IconQrCode } from '@/shared/ui/icons/icon-qr-code'
import { useQrCodeScanner } from '../model/qr-code-scanner'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'

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
      <>
        <div className="430:hidden flex justify-between">
          <UiHeading level={'5'}>Каталог товаров</UiHeading>
        </div>
        <div className="hidden 430:flex justify-between">
          <UiHeading level={'4'}>Каталог товаров</UiHeading>
          <UiButton
            variant="outlined"
            className="p-2"
            onClick={() => scanner.openScanner()}
          >
            <IconQrCode />
          </UiButton>
        </div>
      </>

      <SearchPanel q={products.q} setQ={products.setQ} />
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
