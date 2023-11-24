import { UiButton } from '@/shared/ui/components/ui-button'
import clsx from 'clsx'
import { useGetCategories } from '@/entities/panel/queries'
import { SkeletonCategories } from './skeleton-categories'
import { UiError } from '@/shared/ui/components/ui-error'

export const CategoriesPanel = ({
  currentCategory,
  changeCategory,
}: {
  currentCategory: string
  changeCategory: Function
}) => {
  const categories = useGetCategories()

  if (categories.isLoading) return <SkeletonCategories />
  if (!categories.data) return <div>Данные не загружены</div>
  if (categories.isError) return <UiError />

  return (
    <div className="flex gap-[6px] w-full overflow-auto pb-2 1280:pb-0">
      {categories.data.map((category, i) => {
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
