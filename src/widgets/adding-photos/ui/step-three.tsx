import { ListImages } from '@/features/(product)/media'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { addingPhotosStore } from '../model/store'
import { ProductDto } from '@/shared/api/generated'
import { UseQueryResult } from '@tanstack/react-query'
import { Button } from '@/shared/ui/components/ui/button'

export function StepThree({ product }: { product: UseQueryResult<ProductDto, Error> }) {
  const { handleStep } = addingPhotosStore()

  return (
    <div className="flex flex-col items-start gap-2 ">
      <div>3 этап: Выбрать главное фото</div>
      <div className="flex gap-2">
        {product.isFetching ? (
          <UiSpinner />
        ) : (
          <div>
            {product.data && (
              <ListImages
                photos={product.data.photos}
                productId={product.data.indcode}
                isFetching={product.isFetching}
              />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between w-full">
        <Button onClick={() => handleStep(2)}>Назад</Button>
        <Button
          onClick={() => handleStep(4)}
          disabled={!product.data?.photos.length || product.isFetching}
        >
          Далее
        </Button>
      </div>
    </div>
  )
}
