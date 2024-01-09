import { useSliderProduct } from '../../model/use-slider-product'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { useGetProduct } from '@/entities/products/api'
import { SkeletonProductInfo } from './skeleton-product-info'
import { Media } from '@/features/(product)/media'
import SliderImagesOfProduct from '@/entities/products/ui/slider-photos-of-product'

export const ProductInfo = ({ id }: { id: string }) => {
  const { isShow, open, close } = useSliderProduct()

  const { isLoading, data, isError, isFetching } = useGetProduct(id)
  if (isLoading) return <SkeletonProductInfo />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Нет данных</div>

  return (
    <div className="flex flex-col gap-2 744:flex-row">
      <div
        className={`w-full h-64 rounded-lg 430:w-80 ${
          data.photos.length > 0 ? `cursor-pointer` : ''
        } overflow-hidden`}
        onClick={
          data.photos.length > 0 ? () => open() : () => console.log('Фотографий нет')
        }
      >
        {isFetching ? (
          <div className="flex justify-center items-center h-full bg-gray-200">
            Загрузка...
          </div>
        ) : (
          <Image
            src={data.photos[0] || ImageNotFound}
            alt={data.name}
            width={960}
            height={480}
            quality={75}
            priority={true}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="text-xl font-semibold">{data.name}</div>
          <div>
            <span>Комментарий: </span>
            {data.comment || 'Отсутствует'}
          </div>
          <div>
            <span>Цена: </span>
            {data.cost} Р
          </div>
          <div>
            <span>Индивидуальный номер: </span>
            {data.indcode}
          </div>
          <div>
            <span>Склад: </span>
            {data.sklad}
          </div>
          <div>
            <span>Поддон: </span>
            {data.poddon}
          </div>
          <div>
            <span>Место: </span>
            {data.place}
          </div>
        </div>
        <Media photos={data.photos} productId={data.indcode} isFetching={isFetching} />
      </div>
      {isShow && data.photos.length > 0 && (
        <SliderImagesOfProduct close={close} photos={data.photos} />
      )}
    </div>
  )
}
