import { ProductInfo } from './product-info'
import { SimilarProductsList } from './similar-products-list'

export const Product = ({ id }: { id: string | string[] }) => {
  return (
    <div className="flex flex-col gap-10">
      <ProductInfo id={id} />
      <SimilarProductsList id={id} />
    </div>
  )
}
