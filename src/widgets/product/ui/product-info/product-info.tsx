import { useSliderProduct } from '../../model/use-slider-product'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { useGetProduct } from '@/entities/products/queries'
import { SkeletonProductInfo } from './skeleton-product-info'
import { UploadForm } from '../upload-photos-form/form'
import { DeleteBtn } from '../delete-photos-btn/delete-btn'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'

const SliderImagesOfProduct = lazy(() => import('./slider-images-of-product'))

export const ProductInfo = ({ id }: { id: string }) => {
  const { isShow, open, close, sliderRef } = useSliderProduct()

  const { isLoading, data, isError } = useGetProduct(id)
  if (isLoading) return <SkeletonProductInfo />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Нет данных</div>

  return (
    <div className="flex gap-2">
      <div
        className={`w-80 h-64 rounded-lg ${
          data.photos.length > 0 ? `cursor-pointer` : ''
        } overflow-hidden`}
        onClick={
          data.photos.length > 0 ? () => open() : () => console.log('Фотографий нет')
        }
      >
        <Image
          src={data.photos[0] || ImageNotFound}
          alt={data.name}
          width={960}
          height={480}
          quality={75}
          priority={true}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
          <UploadForm productId={data.indcode} />
          <DeleteBtn photos={data.photos} productId={data.indcode} />
        </div>
      </div>
      {isShow && data.photos.length > 0 && (
        <Suspense fallback={<UiPageSpinner />}>
          <SliderImagesOfProduct
            sliderRef={sliderRef}
            close={close}
            photos={data.photos}
          />
        </Suspense>
      )}
    </div>
  )
}
