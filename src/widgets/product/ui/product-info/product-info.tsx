import { useSliderProduct } from '../../model/use-slider-product'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { useGetProduct } from '@/entities/products/queries'
import { SkeletonProductInfo } from './skeleton-product-info'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useDeleteImageA } from '../../model/use-delete-images'
import { useUploadImages } from '../../model/use-upload-images'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/components/ui/dialog'
import { Button } from '@/shared/ui/components/ui/button'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'

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
      <Dialog open={deleteImageHook.resultModal}>
        <DialogContent className="max-w-[460px] w-full">
          <DialogHeader>
            <DialogTitle>
              {deleteImageHook.isSuccess
                ? 'Успех'
                : deleteImageHook.isError
                ? 'Ошибка'
                : ''}
            </DialogTitle>
            <DialogDescription>
              {deleteImageHook.isSuccess
                ? 'Фотография успешно удалена'
                : deleteImageHook.isError
                ? 'Ошибка при удалении фотографии'
                : ''}
            </DialogDescription>
          </DialogHeader>
          {deleteImageHook.isSuccess ? (
            <AnimateSuccess />
          ) : deleteImageHook.isError ? (
            <AnimateError />
          ) : (
            ''
          )}
          <DialogFooter>
            <Button
              onClick={() => deleteImageHook.setResultModal(false)}
              variant={'secondary'}
            >
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={uploadImages.resultModal}>
        <DialogContent className="max-w-[460px] w-full">
          <DialogHeader>
            <DialogTitle>
              {uploadImages.isSuccess ? 'Успех' : deleteImageHook.isError ? 'Ошибка' : ''}
            </DialogTitle>
            <DialogDescription>
              {uploadImages.isSuccess
                ? 'Фотография успешно добавлена'
                : deleteImageHook.isError
                ? 'Ошибка при добавлении фотографии'
                : ''}
            </DialogDescription>
          </DialogHeader>
          {deleteImageHook.isSuccess ? (
            <AnimateSuccess />
          ) : deleteImageHook.isError ? (
            <AnimateError />
          ) : (
            ''
          )}
          <DialogFooter>
            <Button onClick={() => uploadImages.closeResultModal()} variant={'secondary'}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
