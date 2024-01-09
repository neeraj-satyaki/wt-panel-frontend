import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { useListProductsState } from '../model/store'
import { UseQueryResult } from '@tanstack/react-query'
import { ProductsResponse } from '@/shared/api/generated'
import LibPagination from '@/shared/lib/lib-pagination'

export function ListProducts({
  products,
}: {
  products: UseQueryResult<ProductsResponse, Error>
}) {
  const { q, page, setPage } = useListProductsState()

  if (products.isLoading) return <div>Загрузка...</div>
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
          <LibPagination
            currentPage={page}
            totalPages={products.data.info.pages}
            nextPage={() => setPage(page + 1)}
            prevPage={() => setPage(page - 1)}
          />
        )}
      </div>
    </>
  )
}
