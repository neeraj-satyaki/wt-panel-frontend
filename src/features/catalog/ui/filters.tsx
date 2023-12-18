import { Button } from '@/shared/ui/components/ui/button'
import { useListProductsState } from '../model/store'
import { useGetTypesProducts } from '@/entities/products/api'
type Props = {}
export function Filters({}: Props) {
  const { currentCategory, setCurrentCategory } = useListProductsState()
  const types = useGetTypesProducts()

  if (types.isLoading) {
    return (
      <div className="flex gap-2">
        <div className="bg-gray-200 animate-pulse w-16 h-10 rounded-lg"></div>
        <div className="bg-gray-200 animate-pulse w-16 h-10 rounded-lg"></div>
        <div className="bg-gray-200 animate-pulse w-16 h-10 rounded-lg"></div>
      </div>
    )
  }
  if (types.isError) {
    return <div>Что то пошло не так</div>
  }
  if (!types.data) {
    return <div>Нет данных</div>
  }

  return (
    <div className="flex flex-col gap-2 text-[12px]">
      <div className="flex gap-2 overflow-auto">
        {types.data?.map((item, i) => (
          <Button
            key={i}
            variant={currentCategory === item.id ? 'primary' : 'outline'}
            className="px-4 py-2 whitespace-nowrap"
            onClick={() => setCurrentCategory(item.id)}
          >
            {item.title}({item.count})
          </Button>
        ))}
      </div>
      {/* <div className="flex gap-2 overflow-auto">
        <Button variant="primary" className="px-4 py-2 whitespace-nowrap">
          Двигатели (45)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Кабины (30)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Кронштейны (145)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Колёса (633)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Фары (274)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Баки (273)
        </Button>
      </div> */}
    </div>
  )
}
