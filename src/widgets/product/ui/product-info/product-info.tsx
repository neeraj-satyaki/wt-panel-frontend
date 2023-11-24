import { useSliderProduct } from '../../model/use-slider-product'
import { SliderImagesOfProduct } from './slider-images-of-product'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { useGetProduct } from '@/entities/products/queries'
import { UiError } from '@/shared/ui/components/ui-error'
import { SkeletonProductInfo } from './skeleton-product-info'

export const ProductInfo = ({ id }: { id: string }) => {
  const { isShow, open, close, sliderRef } = useSliderProduct()

  const { isLoading, data, isError } = useGetProduct(id)
  if (isLoading) return <SkeletonProductInfo />
  if (isError) return <UiError />
  if (!data) return <div>Нет данных</div>

  return (
    <div className="flex gap-2">
      <div
        className={`w-80 h-64 rounded-lg ${
          data.photos.length > 0 ? `cursor-pointer` : ''
        } overflow-hidden`}
        onClick={() => open()}
      >
        <Image
          src={data.photos[0] || ImageNotFound}
          alt={data.name}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="text-xl font-semibold">{data.name}</div>
        <div>
          <span className="font-semibold">Комментарий: </span>
          {data.comment || 'Отсутствует'}
        </div>
        <div>
          <span className="font-semibold">Цена: </span>
          {data.cost} Р
        </div>
        <div>
          <span className="font-semibold">Индивидуальный номер: </span>
          {data.indcode}
        </div>
        <div>
          <span className="font-semibold">Склад: </span>
          {data.sklad}
        </div>
      </div>

      {isShow && data.photos.length > 0 && (
        <SliderImagesOfProduct sliderRef={sliderRef} close={close} photos={data.photos} />
      )}
    </div>
  )
}
