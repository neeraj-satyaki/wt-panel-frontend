import { Category } from '@/shared/api/generated'
import { UiButton } from '@/shared/ui/components/ui-button'
import clsx from 'clsx'
import { CategoriesSkeletonLoader } from './categories-skeleton-loader'

type Props = {
  isLoading: boolean
  isError: boolean
  changeCategory: (title: string, type: string) => void
  data: Category[]
  currentCategory: string
}

export function CategoriesPanel({
  isLoading,
  isError,
  changeCategory,
  data,
  currentCategory,
}: Props) {
  console.log(isLoading)

  if (isLoading) return <CategoriesSkeletonLoader />
  if (isError) return <div>Something broke</div>
  if (!data) return <div>Not data</div>
  return (
    <div className="flex gap-[6px] w-full overflow-auto pb-2 1280:pb-0">
      {data.map((category, i) => {
        return (
          <UiButton
            onClick={() => changeCategory(category.title, category.type)}
            key={i}
            className={clsx('whitespace-nowrap text-sm px-3 py-2', {
              'bg-[#ACC8FA]': category.title != currentCategory,
            })}
            variant="primary"
          >
            <div>{category.title}</div>
            <div>({category.count})</div>
          </UiButton>
        )
      })}
    </div>
  )
}
