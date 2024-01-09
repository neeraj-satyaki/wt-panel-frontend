import { useAppOrSaleStore, useGetAppOrSales } from '@/entities/panel-v2'
import { ItemRow } from '@/entities/panel-v2/ui/table-row'
import LibPagination from '@/shared/lib/lib-pagination'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/components/ui/table'
import { FeatureSet } from './feature-set'

export function TablePanel() {
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
    <div className="space-y-2">
      {appOrSale.isFetching && <div>Обновление...</div>}
      <Table className="border">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="border-r border-gray-300 w-[180px] text-center">
              № заявки/продажи
            </TableHead>
            <TableHead className="border-r border-gray-300 text-center">Клиент</TableHead>
            <TableHead className="border-r border-gray-300 text-center">
              Менеджер
            </TableHead>
            <TableHead className="border-r border-gray-300 text-center">Статус</TableHead>
            <TableHead className="border-r border-gray-300 text-center">
              Подстатус
            </TableHead>
            <TableHead className="border-r border-gray-300 text-center">
              Исполнитель
            </TableHead>
            <TableHead className="w-[120px] text-center">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appOrSale.data.data.map((item) => (
            <ItemRow
              item={item}
              key={item.id}
              feauture={<FeatureSet item={item} key={item.id} />}
            />
          ))}
        </TableBody>
      </Table>
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
