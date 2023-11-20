import { ProductDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { highlightQuery } from '@/shared/lib/highlight-text'
import Link from 'next/link'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'

export const UiCardProduct = ({ product, q }: { product: ProductDto; q: string }) => {
  return (
    <Link href={routes.PRODUCT + '/' + product.indcode} className="col-span-2 flex flex-col gap-2 desktop:col-span-1">
      <Image
        src={product.photos[0] || ImageNotFound}
        alt={product.name}
        width={1280}
        height={920}
        className="w-full h-44 1024:h-52 rounded-lg bg-gray-200"
      />
      <div>
        <div className="text-md font-semibold text-gray-800">{highlightQuery(product.name, q)}</div>
        <div>{product.cost} Р</div>
      </div>
    </Link>
  )
}
