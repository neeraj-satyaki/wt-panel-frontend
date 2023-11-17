import { OnlyClient } from '@/shared/lib/only-client'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useCurrentCategory } from '../model/use-categories'
import { useLocalStorage } from '../model/use-learning'
import { CategoriesPanel } from './categories-panel'
import { LearnModal } from './learn-modal'
import { NavigationPanel } from './navigation-panel'
import { SearchPanel } from './search-panel'
import { Table } from './table'

export function Panel() {
  const { client } = OnlyClient()
  const {
    changeCategory,
    currentCategory,
    data,
    isLoading,
    isError,
    nextPage,
    prevPage,
    currentPage,
    q,
    setQ,
  } = useCurrentCategory()

  const { learnStatus, getLocal, endLearn } = useLocalStorage()

  if (!client) return
  if (!getLocal) return
  if (learnStatus === 'true') return <LearnModal endLearn={endLearn} />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="430:hidden">
          <UiHeading level={'5'}>Панель работы</UiHeading>
        </div>
        <div className="hidden 430:block">
          <UiHeading level={'4'}>Панель работы</UiHeading>
        </div>
      </div>
      <div className="flex flex-col gap-3 744:gap-[16px]">
        <NavigationPanel />
        <CategoriesPanel
          changeCategory={changeCategory}
          currentCategory={currentCategory}
        />
        {currentCategory === 'Все' && <SearchPanel q={q} setQ={setQ} />}
        <Table
          data={data}
          isLoading={isLoading}
          isError={isError}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}
