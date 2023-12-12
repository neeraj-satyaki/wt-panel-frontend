import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SearchPanel } from './search-panel'
import { ListProducts } from './list-products/list-products'
import { useListProducts } from '../model/use-list-products'
import { useQrCodeScanner } from '../model/qr-code-scanner'
import { Filters } from './filters'
import { Button } from '@/shared/ui/components/ui/button'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'

export function Catalog() {
  const products = useListProducts()
  const scanner = useQrCodeScanner()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <UiHeading level={'1'}>Каталог товаров</UiHeading>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Поиск детали по qr коду</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>Отсканируйте деталь</DialogTitle>
            </DialogHeader>
            <Html5QrcodePlugin
              onSuccessScan={(decodeText: string) =>
                scanner.handleSuccessScan(decodeText)
              }
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Закрыть
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
