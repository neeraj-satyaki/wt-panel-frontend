import { useGetLostProducts } from '@/entities/products'
import { ProductCard } from '@/entities/products/ui/product-card'
import LibPagination from '@/shared/lib/lib-pagination'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useState } from 'react'

export function ListLostProductsWidget() {
  const [count] = useState(14)
  const [page, setPage] = useState(1)
  const lostProducts = useGetLostProducts(page, count)

  if (lostProducts.isLoading) return <div>Загрузка...</div>
  if (lostProducts.isError) return <div>Ошибка</div>
  if (!lostProducts.data) return <div>Нет данных</div>

  return (
    <div>
      <UiHeading level={'2'}>
        Потерянные детали ({lostProducts.data.info.count})
      </UiHeading>
      <div className="space-y-10">
        <div className="grid grid-cols-2 1024:grid-cols-7 gap-4">
          {lostProducts.data.data.map((item, i) => {
            return (
              <ProductCard
                key={i}
                name={item.name}
                article={item.article}
                indcode={item.indcode}
                place={item.place}
                cost={item.cost}
                photos={item.photos}
              />
            )
          })}
        </div>
        <LibPagination
          currentPage={page}
          totalPages={lostProducts.data.info.pages}
          nextPage={() => setPage(page + 1)}
          prevPage={() => setPage(page - 1)}
        />
      </div>
    </div>
  )
}
