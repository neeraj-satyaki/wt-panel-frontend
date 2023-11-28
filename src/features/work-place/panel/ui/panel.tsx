import { LibPagination } from '@/shared/lib/lib-pagination'
import { FormCreateSale } from './form-create-sale'
import { Categories } from './categories/categories'
import { SearchPanel } from './search/search-panel'
import { useAppSales, useMoveAppSaleA } from '../model/use-app-sales'
import { ActionModal } from './action/action-modal'
import { TableSkeletonLoader } from './table/table-skeleton-loader'
import { Table } from './table/table'
import { useSessionQuery } from '@/entities/session'

export function Panel() {
  const { search, categories, appSales } = useAppSales()
  const {
    actionCreateSaleModal,
    actionModal,
    setActionCreateSaleModal,
    setActionModal,
    actionId,
    moveAppSale,
    actionProcessing,
    actionSubProcessng,
    openActionModal,
    openCreateSaleModal,
  } = useMoveAppSaleA()
  const session = useSessionQuery()
  return (
    <div className="flex flex-col gap-6">
      {actionCreateSaleModal && (
        <FormCreateSale close={() => setActionCreateSaleModal(false)} id={actionId} />
      )}
      {actionModal && (
        <ActionModal
          actionProcessing={actionProcessing}
          moveAppSale={moveAppSale}
          actionId={actionId}
          actionSubProcessng={actionSubProcessng}
          openCreateSaleModal={openCreateSaleModal}
          setActionModal={setActionModal}
        />
      )}
      <div className="flex flex-col gap-3 744:gap-[16px]">
        <Categories
          isLoading={categories.isLoading}
          isError={categories.isError}
          changeCategory={categories.changeCategory}
          data={categories.data || []}
          currentCategory={categories.currentCategory}
        />
        {categories.currentCategory === 'Все' && (
          <SearchPanel q={search.q} setQ={(text) => search.setQ(text)} />
        )}
        {appSales.isLoading ? <TableSkeletonLoader /> : ''}
        {appSales.isError ? <div>Something broke</div> : ''}
        {appSales.data && (
          <Table
            appSales={appSales.data.data}
            searchQuery={search.q}
            openActionModal={openActionModal}
            session={session.data ? session.data : null}
          />
        )}
        {appSales.data && appSales.data.info.pages > 1 ? (
          <LibPagination
            currentPage={appSales.page}
            totalPages={appSales.data.info.pages}
            nextPage={() => appSales.setPage(appSales.page + 1)}
            prevPage={() => appSales.setPage(appSales.page - 1)}
          />
        ) : null}
      </div>
    </div>
  )
}
