import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { useGetSimilarProductsA } from '../../model/use-product'
import { Suspense, lazy } from 'react'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

const LibPagination = lazy(() => import('@/shared/lib/lib-pagination'))

export const SimilarProductsList = ({ id }: { id: string }) => {
  const { data, isError, isLoading, currentPage, nextPage, prevPage } =
    useGetSimilarProductsA(id)

  if (isLoading) return <UiSpinner />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Похожих товаров не найдено</div>

  const content = data.data.map((product: any, i: number) => (
    <UiCardProduct key={i} product={product} />
  ))

  return (
    <div className="flex flex-col gap-2">
      <UiHeading level={'4'}>Похожие товары {data.info.count}</UiHeading>
      <div className="flex flex-col gap-4">
        <UiListProductsLayout>{content}</UiListProductsLayout>

        <Suspense fallback={<UiSpinner />}>
          <LibPagination
            currentPage={currentPage}
            totalPages={data.info.pages}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </Suspense>
      </div>
    </div>
  )
}
