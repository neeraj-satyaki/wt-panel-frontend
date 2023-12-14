import { ProductDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { highlightText } from '@/shared/lib/lib-highlight-text'
import Link from 'next/link'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'

export const UiCardProduct = ({ product, q }: { product: ProductDto; q?: string }) => {
  return (
    <Link
      href={routes.PRODUCT + '/' + product.indcode}
      className="flex flex-col gap-2 desktop:col-span-1"
    >
      <Image
        src={product.photos[0] || ImageNotFound}
        alt={product.name}
        width={600}
        height={360}
        quality={75}
        priority={true}
        className="w-full h-44 1024:h-44 rounded-lg bg-gray-200 object-cover"
      />
      <div>
        <div className="text-[16px] font-semibold text-gray-800 break-words">
          {highlightText(product.name, q)}
        </div>
        <div className="text-[14px] font-medium text-gray-600 break-words">
          {highlightText(product.indcode, q)}
        </div>
        <div className="text-[14px] font-medium text-gray-600 break-words">
          {product.cost} Р
        </div>
      </div>
    </Link>
  )
}
