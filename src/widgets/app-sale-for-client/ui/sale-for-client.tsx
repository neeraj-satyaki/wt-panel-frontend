import { useGetSale } from '@/entities/sale'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import React, { useState } from 'react'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import SliderImagesOfProduct from '@/entities/products/ui/slider-photos-of-product'

type Props = {
  id: string
}

export const SaleForClientWidget = ({ id }: Props) => {
  const saleForClient = useGetSale(id)

  const [showSliderImages, setShowSliderImages] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  if (saleForClient.isLoading) return <UiPageSpinner />
  if (saleForClient.isError) return <div>Ошибка</div>
  if (!saleForClient.data) return <div>Данные не получены</div>

  function openSlider(photos: string[]) {
    setPhotos(photos)
    setShowSliderImages(true)
  }

  return (
    <div className="flex flex-col gap-4">
      {showSliderImages && (
        <SliderImagesOfProduct close={() => setShowSliderImages(false)} photos={photos} />
      )}
      <div className="flex gap-2 flex-col">
        <UiHeading level="1">
          Товары для клиента ({saleForClient.data.info.client})
        </UiHeading>
        <UiListProductsLayout>
          {saleForClient.data.data.map((product, i) => {
            return (
              <div
                className={`flex flex-col gap-2 ${
                  photos.length > 0 ? 'cursor-pointer' : ''
                }`}
                key={i}
                onClick={
                  photos.length > 0 ? () => openSlider(product.photos) : () => null
                }
              >
                <div className="flex flex-col gap-2">
                  <Image
                    src={product.photos?.length ? product.photos[0] : ImageNotFound}
                    alt={product.name || ''}
                    width={600}
                    height={400}
                    className="object-cover w-full h-40 rounded-lg"
                  />
                  <div>
                    <div className="font-semibold">{product.name || 'Не указано'}</div>
                    <div>Артикул: {product.article || 'Не указано'}</div>
                    <div>Цена: {product.cost || 'Не указано'} Р</div>
                  </div>
                </div>
              </div>
            )
          })}
        </UiListProductsLayout>
      </div>
    </div>
  )
}
