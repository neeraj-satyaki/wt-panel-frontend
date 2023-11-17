import { ProductDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import Link from 'next/link'

export const UiCardProduct = ({ product }: { product: ProductDto }) => {
  return (
    <Link
      href={routes.PRODUCT + '/' + product.indcode}
      className="col-span-2 flex flex-col gap-2 desktop:col-span-1"
    >
      <div className="w-full h-44 1024:h-52 rounded-lg bg-gray-200"></div>
      <div>
        <div className="text-lg font-semibold text-gray-800">
          {product.name}
        </div>
        <div>{product.cost} Р</div>
      </div>
    </Link>
  )
}
