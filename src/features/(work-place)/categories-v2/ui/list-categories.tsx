import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Button } from '@/shared/ui/components/ui/button'
import { useGetCategoriesByAppOrSales, useAppOrSaleStore } from '@/entities/panel-v2'

export function ListCategories() {
  const router = useRouter()
  const { isLoading, isError, data } = useGetCategoriesByAppOrSales()
  const { changeCategory, currentCategory } = useAppOrSaleStore()

  function handleChangeCategory(title: string, type: string) {
    changeCategory(title, type)
    router.push({
      pathname: router.pathname,
      query: { category: title, type: type },
    })
  }

  if (isLoading) return <>Загрузка...</>
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Данных нет</div>
  return (
    <div className="flex flex-wrap gap-[6px] w-full">
      {data.map((category, i) => {
        return (
          <Button
            onClick={() => handleChangeCategory(category.title, category.type)}
            key={i}
            className={clsx('', {
              'bg-[#ACC8FA]': category.title != currentCategory,
            })}
            variant="primary"
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
