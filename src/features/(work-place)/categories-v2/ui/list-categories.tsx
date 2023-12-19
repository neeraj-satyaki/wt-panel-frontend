import { useAppOrSaleStore, useGetCategoriesByAppOrSales } from '@/entities/panel-v2'
import { Button } from '@/shared/ui/components/ui/button'
import { useRouter } from 'next/router'

export function ListCategories() {
  const router = useRouter()
  const { isLoading, isError, data } = useGetCategoriesByAppOrSales()
  const { changeCategory, currentCategory, setPage } = useAppOrSaleStore()

  function handleChangeCategory(title: string, type: string) {
    changeCategory(title, type)
    setPage(1)
    router.push({
      pathname: router.pathname,
      query: { category: title, type: type },
    })
  }

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Данных нет</div>
  return (
    <div className="flex flex-wrap gap-[6px] w-full">
      {data.map((category, i) => {
        return (
          <Button
            onClick={() => handleChangeCategory(category.title, category.type)}
            key={i}
            variant={category.title === currentCategory ? 'default' : 'secondary'}
            className="flex-1 744:flex-none"
          >
            <div>
              {category.title} ({category.count})
            </div>
          </Button>
        )
      })}
    </div>
  )
}
