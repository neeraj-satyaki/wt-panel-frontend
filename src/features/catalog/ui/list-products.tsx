import { UiError } from '@/shared/ui/components/ui-error'
import { SkeletonListProducts } from './skeleton-list-products'
import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { ProductsResponse } from '@/shared/api/generated'
import { LibPagination } from '@/shared/lib/lib-pagination'

type Props = {
  isLoading: boolean
  isError: boolean
  data: ProductsResponse | undefined
  q: string
  currentPage: number
  nextPage: Function
  prevPage: Function
}

export function ListProducts({
  isLoading,
  data,
  isError,
  q,
  currentPage,
  prevPage,
  nextPage,
}: Props) {
  if (isLoading) return <SkeletonListProducts />
  if (isError) return <UiError />
  if (!data) return <div>Ничего не найдено</div>

  const content = data.data.map((product: any, i: number) => (
    <UiCardProduct product={product} q={q} key={i} />
  ))

  return (
    <div>
      <UiHeading level={'5'}>Найдено: {data.info.count}</UiHeading>
      <div className="flex flex-col gap-8">
        <UiListProductsLayout>{content}</UiListProductsLayout>
        <LibPagination
          currentPage={currentPage}
          totalPages={data.info.pages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  )
}
