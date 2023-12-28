import { ProductDto } from '@/shared/api/generated'
import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { Button } from '@/shared/ui/components/ui/button'
import { useSimilarProductsForChangeStore } from '../model/store'

type Props = { data: ProductDto[] }

export function ListSimilarProducts({ data }: Props) {
  const { selectedProduct, setSelectProduct, q } = useSimilarProductsForChangeStore()

  return (
    <div className="grid grid-cols-1 gap-4 744:grid-cols-2 1024:grid-cols-3 1280:grid-cols-4 1512:grid-cols-6">
      {data.map((item, i) => (
        <div className="flex flex-col gap-2 items-center" key={i}>
          <UiCardProduct product={item} q={q} />
          <div>
            <Button
              variant={selectedProduct === item.indcode ? 'success' : 'primary'}
              onClick={() => setSelectProduct(item.indcode)}
            >
              {selectedProduct === item.indcode ? 'Выбран' : 'Выбрать'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
