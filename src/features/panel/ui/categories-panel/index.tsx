import { UiButton } from '@/shared/ui/components/ui-button'
import clsx from 'clsx'
import { useGetCategories } from '@/entities/panel/queries'

export const CategoriesPanel = ({
  currentCategory,
  changeCategory,
}: {
  currentCategory: string
  changeCategory: Function
}) => {
  const categories = useGetCategories()

  if (categories.isLoading) {
    return (
      <div className="flex gap-2">
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }
  if (!categories.data) {
    return
  }
  if (categories.isError) {
    return <div>Произошла ошибка</div>
  }

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
