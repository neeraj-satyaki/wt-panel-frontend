import { useAppOrSaleStore, useGetAppOrSales } from '@/entities/panel-v2'
import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import { FeatureSet } from './feature-set'
import LibPagination from '@/shared/lib/lib-pagination'

export function ListPanel() {
  const { currentCategory, type, page, q, setPage, count } = useAppOrSaleStore()

  const appOrSale = useGetAppOrSales(
    currentCategory,
    type,
    page.toString(),
    count.toString(),
    q,
  )

  if (appOrSale.isLoading) return <div>Загрузка...</div>
  if (appOrSale.isError) return <div>Ошибка при загрузке данных</div>
  if (!appOrSale.data || !appOrSale.data.data.length) return <div>Нет данных</div>
  return (
    <div className="space-y-6">
      {appOrSale.isFetching && <div>Обновление...</div>}
      <div className="grid grid-cols-1 gap-2 744:grid-cols-2 1024:grid-cols-3 1280:grid-cols-4 1512:grid-cols-6">
        {appOrSale.data.data.map((item, i) => {
          return (
            <div
              className="border p-4 shadow rounded-lg flex flex-col justify-between bg-white"
              key={i}
            >
              <Link
                href={
                  item.processing.includes('Обращение') ||
                  item.processing.includes('Заявка') ||
                  item.processing.includes('Сборка')
                    ? routes.APPLICATION + '/' + item.id
                    : routes.SALE + '/' + item.id
                }
                className="flex flex-col gap-2"
              >
                <div className="pb-2">
                  <span className="font-semibold text-2xl">№ {item.id}</span>
                </div>
                <div className="text-xl">
                  <span className="font-semibold">Клиент: </span>
                  {item.client}
                </div>
                <div className="text-xl">
                  <span className="font-semibold">Ответственный: </span>
                  {item.responsible.name} {item.responsible.phone}
                </div>
                <div className="text-xl">
                  <span className="font-semibold">Статус: </span> {item.processing}
                </div>
                <div className="flex items-center gap-2 text-xl">
                  <span className="font-semibold">Подстатус: </span>
                  <div
                    className={
                      item.sub_processing === 'Готов'
                        ? 'bg-green-400 px-4 py-2 rounded-lg'
                        : ''
                    }
                  >
                    {item.sub_processing}
                  </div>
                </div>
                <div className="text-xl">
                  <span className="font-semibold">Исполнитель: </span>
                  {item.porter.name} {item.porter.phone}
                </div>
              </Link>
              <div className="self-end">
                <FeatureSet item={item} key={item.id} />
              </div>
            </div>
          )
        })}
      </div>
      {appOrSale.data.info.pages > 1 && (
        <LibPagination
          currentPage={page}
          totalPages={appOrSale.data.info.pages}
          nextPage={() => setPage(page + 1)}
          prevPage={() => setPage(page - 1)}
        />
      )}
    </div>
  )
}
