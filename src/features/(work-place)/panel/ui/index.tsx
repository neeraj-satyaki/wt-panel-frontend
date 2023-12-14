import { Categories } from './categories/categories'
import { SearchPanel } from './search/search-panel'
import { useAppSales } from '../model/use-app-sales'
import { TableSkeletonLoader } from './table/table-skeleton-loader'
import { useSessionQuery } from '@/entities/session'
import { ListAppSalesSkeleton } from './list-app-sales/list-app-sales-skeleton'
import { Suspense, lazy } from 'react'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'

const LibPagination = lazy(() => import('@/shared/lib/lib-pagination'))
const Table = lazy(() => import('./table'))
const ListAppSales = lazy(() => import('./list-app-sales'))

export function Panel() {
  const { search, categories, appSales } = useAppSales()
  const session = useSessionQuery()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Categories
            isLoading={categories.isLoading}
            isError={categories.isError}
            changeCategory={categories.changeCategory}
            data={categories.data || []}
            currentCategory={categories.currentCategory}
          />
          <div>
            <Button
              disabled={appSales.isFetching}
              variant={'primary'}
              onClick={() => search.refetchAppSales()}
            >
              {appSales.isFetching ? <UiSpinner /> : 'Обновить'}
            </Button>
          </div>
          {categories.currentCategory === 'Все' && (
            <SearchPanel
              isFetching={appSales.isFetching}
              q={search.q}
              setQ={(text) => search.setQ(text)}
              handleSearch={search.refetchAppSales}
            />
          )}
          {appSales.isFetching ? (
            <>
              <div className="block 1280:hidden">
                <ListAppSalesSkeleton />
              </div>
              <div className="hidden 1280:block">
                <TableSkeletonLoader />
              </div>
            </>
          ) : null}
          {appSales.isError ? <div>Ошибка</div> : ''}
          {appSales.data && !appSales.isFetching && (
            <div className="w-full">
              <div className="block 1280:hidden w-full">
                <Suspense fallback={<ListAppSalesSkeleton />}>
                  <ListAppSales
                    appSales={appSales.data.data}
                    searchQuery={search.q}
                    session={session.data ? session.data : null}
                  />
                </Suspense>
              </div>
              <div className="hidden 1280:block w-full">
                <Suspense fallback={<TableSkeletonLoader />}>
                  <Table
                    appSales={appSales.data.data}
                    searchQuery={search.q}
                    session={session.data ? session.data : null}
                  />
                </Suspense>
              </div>
            </div>
          )}
        </div>
        {appSales.data && appSales.data.info.pages > 1 ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LibPagination
              currentPage={appSales.page}
              totalPages={appSales.data.info.pages}
              nextPage={() => appSales.setPage(appSales.page + 1)}
              prevPage={() => appSales.setPage(appSales.page - 1)}
            />
          </Suspense>
        ) : null}
      </div>
    </div>
  )
}
