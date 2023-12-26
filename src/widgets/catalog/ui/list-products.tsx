import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { Suspense, lazy } from 'react'
import { useListProductsState } from '../model/store'
import { UseQueryResult } from '@tanstack/react-query'
import { ProductsResponse } from '@/shared/api/generated'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

const LibPagination = lazy(() => import('@/shared/lib/lib-pagination'))

export function ListProducts({
  products,
}: {
  products: UseQueryResult<ProductsResponse, Error>
}) {
  const { q, page, setPage } = useListProductsState()

  if (products.isLoading) return <UiSpinner />
  if (products.isError) return <div>Ошибка</div>
  if (!products.data) return <div>Ничего не найдено</div>

  const content = products.data.data.map((product: any, i: number) => (
    <UiCardProduct product={product} q={q} key={i} />
  ))

  return (
    <>
      {products.isFetching && <div>Поиск...</div>}
      <div className="flex flex-col gap-8">
        <UiListProductsLayout>{content}</UiListProductsLayout>
        {products.data.info.pages > 1 && (
          <Suspense fallback={<UiSpinner />}>
            <LibPagination
              currentPage={page}
              totalPages={products.data.info.pages}
              nextPage={() => setPage(page + 1)}
              prevPage={() => setPage(page - 1)}
            />
          </Suspense>
        )}
      </div>
    </>
  )
}
