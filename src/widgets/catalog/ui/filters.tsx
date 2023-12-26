import { Button } from '@/shared/ui/components/ui/button'
import { useListProductsState } from '../model/store'
import { useGetTypesProducts } from '@/entities/products/api'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function Filters() {
  const { currentCategory, setCurrentCategory } = useListProductsState()
  const types = useGetTypesProducts()
  const router = useRouter()

  useEffect(() => {
    const { category } = router.query
    if (category) {
      setCurrentCategory(Number(category))
    }
  }, [router.query, setCurrentCategory])

  if (types.isLoading)
    return (
      <div className="flex gap-2">
        <div className="bg-gray-200 animate-pulse w-16 h-10 rounded-lg"></div>
        <div className="bg-gray-200 animate-pulse w-16 h-10 rounded-lg"></div>
        <div className="bg-gray-200 animate-pulse w-16 h-10 rounded-lg"></div>
      </div>
    )
  if (types.isError) return <div>Что то пошло не так</div>
  if (!types.data) return <div>Нет данных</div>

  const handleCurrentCategory = (id: number) => {
    router.push(`?category=${id}`)
    setCurrentCategory(id)
  }

  return (
    <div className="flex flex-col gap-2 text-[12px]">
      <div className="flex gap-2 overflow-auto">
        {types.data?.map((item, i) => (
          <Button
            key={i}
            variant={currentCategory === item.id ? 'default' : 'outline'}
            className=" py-6 font-semibold 1024:text-sm 1024:py-4"
            onClick={() => handleCurrentCategory(item.id)}
          >
            {item.title} ({item.count})
          </Button>
        ))}
      </div>
    </div>
  )
}
