import { ProductInfo } from './product-info/product-info'
import { SimilarProductsList } from './similar-products-list/similar-products-list'

export const ProductWidget = ({ id }: { id: string }) => {
  return (
    <div className="flex flex-col gap-10">
      <ProductInfo id={id} />
      <SimilarProductsList id={id} />
    </div>
  )
}
