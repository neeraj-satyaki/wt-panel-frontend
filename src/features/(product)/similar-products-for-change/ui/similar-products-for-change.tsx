import LibPagination from '@/shared/lib/lib-pagination'
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
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useSimilarProductsForChangeStore } from '../model/store'
import { useGetSimilarProducts } from '@/entities/products/api'
import { Search } from './search'
import { ListSimilarProducts } from './list-similar-products'
import { BtnChange } from './btn-change'
import { useState } from 'react'
import { ScannerChangeProduct } from './scanner-change-product'

type Props = {
  code: string
  appId: string
  pose: number
}

export function SimilarProductsForChange({ code, appId, pose }: Props) {
  const { page, setPage, count, selectedProduct, q } = useSimilarProductsForChangeStore()
  const similarProducts = useGetSimilarProducts(code, page, count, q)
  const [isShow, setIsShow] = useState(false)

  return (
    <Dialog open={isShow} onOpenChange={setIsShow}>
      <DialogTrigger asChild>
        <Button variant="primary" onClick={() => setIsShow(true)}>
          Заменить
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Выберите деталь для замены</DialogTitle>
        </DialogHeader>
        {similarProducts.isLoading ? (
          <UiSpinner className="my-40 w-full" />
        ) : (
          <>
            {similarProducts.data && (
              <div className="space-y-4">
                <Search code={code} />
                <ScannerChangeProduct appId={appId} pose={pose} setIsShow={setIsShow} />
                {similarProducts.isFetching && <div>Поиск детали...</div>}
                {similarProducts.isError && !similarProducts.isFetching && (
                  <div>Ошибка при поиске</div>
                )}
                <ListSimilarProducts data={similarProducts.data.data} />
                <LibPagination
                  currentPage={page}
                  totalPages={similarProducts.data.info.pages}
                  nextPage={() => setPage(page + 1)}
                  prevPage={() => setPage(page - 1)}
                />
              </div>
            )}
          </>
        )}
        {selectedProduct.length > 0 && (
          <BtnChange appId={appId} pose={pose} setIsShow={setIsShow} />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="primary">
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
