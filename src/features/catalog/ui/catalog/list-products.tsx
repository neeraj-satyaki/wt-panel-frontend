import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { SkeletonListProducts } from './skeleton-list-products'
import { ProductDto } from '@/shared/api/generated'

export function ListProducts({ products, q }: { products: any; q: string }) {
  if (products.isLoading) return <SkeletonListProducts />
  if (products.isError) return <div>Произошла ошибка</div>

  return (
    <div>
      <UiHeading level={'5'}>Найдено ({products.data.info.count})</UiHeading>
      <UiListProductsLayout>
        {products.data.data.map((product: ProductDto, i: number) => {
          return <UiCardProduct product={product} key={i} q={q} />
        })}
      </UiListProductsLayout>
    </div>
  )
}
