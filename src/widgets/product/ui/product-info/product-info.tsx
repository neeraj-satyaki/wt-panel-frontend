import { useSliderProduct } from '../../model/use-slider-product'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { useGetProduct } from '@/entities/products/queries'
import { SkeletonProductInfo } from './skeleton-product-info'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useDeleteImageA } from '../../model/use-delete-images'
import { UiResultModal } from '@/shared/ui/components/ui-result-modal'
import { useUploadImages } from '../../model/use-upload-images'

const SliderImagesOfProduct = lazy(
  () => import('@/entities/products/ui/slider-images-of-product'),
)
const Media = lazy(() => import('../media'))

export const ProductInfo = ({ id }: { id: string }) => {
  const { isShow, open, close } = useSliderProduct()
  const deleteImageHook = useDeleteImageA()
  const uploadImages = useUploadImages(id)

  const { isLoading, data, isError, isFetching } = useGetProduct(id)
  if (isLoading) return <SkeletonProductInfo />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Нет данных</div>

  return (
    <div className="flex flex-col gap-2 744:flex-row">
      {deleteImageHook.resultModal && (
        <>
          {deleteImageHook.isSuccess ? (
            <UiResultModal
              close={() => deleteImageHook.setResultModal(false)}
              type={true}
              text={'Фотография успешно удалена'}
            />
          ) : null}
          {deleteImageHook.isError ? (
            <UiResultModal
              close={() => deleteImageHook.setResultModal(false)}
              type={false}
              text={'Ошибка при удалении фотографии'}
            />
          ) : null}
        </>
      )}
      {uploadImages.resultModal && (
        <>
          {uploadImages.isSuccess ? (
            <UiResultModal
              close={() => uploadImages.closeResultModal()}
              type={true}
              text={'Фотография успешно добавлена'}
            />
          ) : null}
          {uploadImages.isError ? (
            <UiResultModal
              close={() => uploadImages.closeResultModal()}
              type={false}
              text={'Ошибка при добавлении фотографии'}
            />
          ) : null}
        </>
      )}
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
            <UiSpinner />
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
        </div>
        <Suspense fallback={<UiPageSpinner />}>
          <Media
            photos={data.photos}
            productId={data.indcode}
            isFetching={isFetching}
            deleteImageHook={deleteImageHook}
            uploadImages={uploadImages}
          />
        </Suspense>
      </div>
      {isShow && data.photos.length > 0 && (
        <Suspense fallback={<UiPageSpinner />}>
          <SliderImagesOfProduct close={close} photos={data.photos} />
        </Suspense>
      )}
    </div>
  )
}
