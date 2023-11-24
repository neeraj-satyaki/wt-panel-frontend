import { useTable } from '../model/use-table'
import { CategoriesPanel } from './categories-panel/categories'
import { Table } from './table-panel/table'
import { SearchPanel } from './search'

export function Panel() {
  const {
    data,
    isLoading,
    isError,
    nextPage,
    prevPage,
    currentPage,
    q,
    currentCategory,
    setQ,
    changeCategory,
  } = useTable()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 744:gap-[16px]">
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
          q={q}
        />
      </div>
    </div>
  )
}
