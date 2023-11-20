import { useSliderProduct } from '../../model/use-slider-product'
import { SliderImagesOfProduct } from './slider-images-of-product'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { useGetProduct } from '@/entities/products/queries'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiError } from '@/shared/ui/components/ui-error'
import { SkeletonProductInfo } from './skeleton-product-info'

export const ProductInfo = ({ id }: { id: string }) => {
  const { isShow, open, close, sliderRef } = useSliderProduct()

  const product = useGetProduct(id)
  if (product.isLoading) return <SkeletonProductInfo />
  if (!product.data) return <div>Нет данных</div>
  if (product.isError) return <UiError />

  return (
    <div className="flex gap-2">
      <div
        className={`w-92 h-64 rounded-lg ${product.data.photos.length > 0 ? `cursor-pointer` : ''} overflow-hidden`}
        onClick={() => open()}
      >
        <Image
          src={product.data.photos[0] || ImageNotFound}
          alt={''}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="text-xl font-semibold">{product.data.name}</div>
        <div>
          <span className="font-semibold">Комментарий: </span>
          {product.data.comment || 'Отсутствует'}
        </div>
        <div>
          <span className="font-semibold">Цена: </span>
          {product.data.cost} Р
        </div>
        <div>
          <span className="font-semibold">Индивидуальный номер: </span>
          {product.data.indcode}
        </div>
        <div>
          <span className="font-semibold">Склад: </span>
          {product.data.sklad}
        </div>
      </div>

      {isShow && product.data.photos.length > 0 && (
        <SliderImagesOfProduct sliderRef={sliderRef} close={close} photos={product.data.photos} />
      )}
    </div>
  )
}
