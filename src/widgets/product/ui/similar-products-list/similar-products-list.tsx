import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiError } from '@/shared/ui/components/ui-error'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { useGetSimilarProductsA } from '../../model/use-product'
import { UiButton } from '@/shared/ui/components/ui-button'
import { SkeletonSimilarProducts } from './skeleton-similar-products-list'

export const SimilarProductsList = ({ id }: { id: string }) => {
  const similarProducts = useGetSimilarProductsA(id)

  if (similarProducts.isLoading) return <SkeletonSimilarProducts />
  if (!similarProducts.data) return <div>Нет данных</div>
  if (similarProducts.isError) return <UiError />

  return (
    <div className="flex flex-col gap-2">
      <UiHeading level={'5'}>Похожие товары ({similarProducts.data.info.count})</UiHeading>
      <div className="flex flex-col gap-4">
        <UiListProductsLayout>
          {similarProducts.data.data.map((item, i) => {
            return <UiCardProduct key={i} product={item} />
          })}
        </UiListProductsLayout>
        <div className="flex flex-col justify-center items-center gap-2">
          <div>
            {similarProducts.page}/{similarProducts.data.info.pages}
          </div>
          <div className="flex gap-2">
            <UiButton
              variant="primary"
              className="px-4 py-2"
              onClick={similarProducts.prev}
              disabled={similarProducts.page === 1}
            >
              prev
            </UiButton>
            <UiButton
              variant="primary"
              className="px-4 py-2"
              onClick={similarProducts.next}
              disabled={similarProducts.page === similarProducts.data.info.pages}
            >
              next
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  )
}
