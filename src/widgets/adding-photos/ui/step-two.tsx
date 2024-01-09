import { UploadForm } from '@/features/(product)/media'
import { addingPhotosStore } from '../model/store'
import { UseQueryResult } from '@tanstack/react-query'
import { ProductDto } from '@/shared/api/generated'
import { Button } from '@/shared/ui/components/ui/button'

export function StepTwo({ product }: { product: UseQueryResult<ProductDto, Error> }) {
  const { handleStep } = addingPhotosStore()

  return (
    <div className="flex flex-col items-start gap-2 ">
      <div>2 этап: Загрузить фото</div>
      {product.data && (
        <>
          <div>Деталь: {product.data.indcode}</div>
          <div className="flex flex-col w-full">
            <UploadForm id={product.data.indcode} />
          </div>
        </>
      )}
      <div className="flex justify-between w-full">
        <Button onClick={() => handleStep(1)} variant="primary">
          Назад
        </Button>
        <Button
          onClick={() => handleStep(3)}
          disabled={!product.data?.photos.length || product.isFetching}
        >
          {product.isFetching ? 'Загрузка...' : 'Далее'}
        </Button>
      </div>
    </div>
  )
}
