import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { useListProductsState } from '../model/store'
import { UseQueryResult } from '@tanstack/react-query'
import { ProductsResponse } from '@/shared/api/generated'
import LibPagination from '@/shared/lib/lib-pagination'
import { ProductCard } from '@/entities/products/ui/product-card'

export function ListProducts({
  products,
}: {
  products: UseQueryResult<ProductsResponse, Error>
}) {
  const { q, page, setPage } = useListProductsState()

  if (products.isLoading || products.isRefetching) return <div>Загрузка...</div>
  if (products.isError) return <div>Ошибка</div>
  if (!products.data) return

  const content = products.data.data.map((product, i) => (
    <ProductCard
      key={i}
      name={product.name}
      article={product.article}
      indcode={product.indcode}
      place={product.place}
      cost={product.cost}
      photos={product.photos}
    />
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
