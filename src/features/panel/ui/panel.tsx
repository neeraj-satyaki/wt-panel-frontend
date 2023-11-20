import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useTable } from '../model/use-table'
import { useLearning } from '../model/use-learning'
import { CategoriesPanel } from './categories-panel'
import { LearnModal } from './learn-modal'
import { NavigationPanel } from './navigation-panel'
import { SearchPanel } from './search-panel'
import { Table } from './table'

export function Panel() {
  const table = useTable()
  const learning = useLearning()

  if (!learning.getLocal) return
  if (learning.learnStatus === 'true') return <LearnModal endLearn={learning.endLearn} />

  return (
    <div className="flex flex-col gap-6">
      <>
        <div className="430:hidden">
          <UiHeading level={'5'}>Панель работы</UiHeading>
        </div>
        <div className="hidden 430:block">
          <UiHeading level={'4'}>Панель работы</UiHeading>
        </div>
      </>
      <div className="flex flex-col gap-3 744:gap-[16px]">
        <NavigationPanel />
        <CategoriesPanel changeCategory={table.changeCategory} currentCategory={table.currentCategory} />
        {table.currentCategory === 'Все' && <SearchPanel q={table.q} setQ={table.setQ} />}
        <Table
          data={table.data}
          isLoading={table.isLoading}
          isError={table.isError}
          nextPage={table.nextPage}
          prevPage={table.prevPage}
          currentPage={table.currentPage}
          q={table.q}
        />
      </div>
    </div>
  )
}
