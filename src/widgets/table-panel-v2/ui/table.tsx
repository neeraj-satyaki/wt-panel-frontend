import { useAppOrSaleStore, useGetAppOrSales } from '@/entities/panel-v2'
import { TablePanel } from '@/entities/panel-v2/ui/table'
import { TableCell, TableHead, TableRow } from '@/shared/ui/components/ui/table'

export function TableWidgetV2() {
  const { currentCategory, type, page, q } = useAppOrSaleStore()

  const appOrSale = useGetAppOrSales(currentCategory, type, page.toString(), '10', q)
  if (appOrSale.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <TablePanel
      title={'Список всех заявок и продаж'}
      header={
        <>
          <TableHead className="w-[140px]">№ заявки/продажи</TableHead>
          <TableHead>Клиент</TableHead>
          <TableHead>Менеджер</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Подстатус</TableHead>
          <TableHead>Исполнитель</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </>
      }
      content={
        <>
          {appOrSale.data?.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.client}</TableCell>
              <TableCell>{item.responsible.name}</TableCell>
              <TableCell>{item.processing}</TableCell>
              <TableCell>{item.sub_processing}</TableCell>
              <TableCell>{item.porter.name}</TableCell>
              <TableCell className="text-right">Действия</TableCell>
            </TableRow>
          ))}
        </>
      }
      footer={undefined}
    />
  )
}
