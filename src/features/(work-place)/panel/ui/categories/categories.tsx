import { Category } from '@/shared/api/generated'
import { UiButton } from '@/shared/ui/components/ui-button'
import clsx from 'clsx'
import { CategoriesSkeletonLoader } from './categories-skeleton-loader'
import { useRouter } from 'next/router'

type Props = {
  isLoading: boolean
  isError: boolean
  changeCategory: (title: string, type: string) => void
  data: Category[]
  currentCategory: string
}

export function Categories({
  isLoading,
  isError,
  changeCategory,
  data,
  currentCategory,
}: Props) {
  const router = useRouter()

  function handleChangeCategory(title: string, type: string) {
    changeCategory(title, type)
    router.push({
      pathname: router.pathname,
      query: { category: title, type: type },
    })
  }

  if (isLoading) return <CategoriesSkeletonLoader />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Данных нет</div>
  return (
    <div className="flex flex-wrap gap-[6px] w-full pb-2 1280:pb-0">
      {data.map((category, i) => {
        return (
          <UiButton
            onClick={() => handleChangeCategory(category.title, category.type)}
            key={i}
            className={clsx(
              'whitespace-nowrap text-lg px-4 py-2 744:text-base 1280:text-sm',
              {
                'bg-[#ACC8FA]': category.title != currentCategory,
              },
            )}
            variant="primary"
          >
            <div>
              {category.title} ({category.count})
            </div>
          </UiButton>
        )
      })}
    </div>
  )
}
