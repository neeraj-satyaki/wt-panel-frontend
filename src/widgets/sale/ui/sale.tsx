import { useGetSale } from '@/entities/sale/queries'
import { Item } from './item'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiError } from '@/shared/ui/components/ui-error'
import { SkeletonSale } from './skeleton-sale'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'

export const Sale = ({ id }: { id: string }) => {
  const sale = useGetSale(id)

  if (sale.isLoading) return <SkeletonSale />
  if (!sale.data) return <UiError />
  if (sale.isError) return <UiError />

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <div>
          <span className="font-semibold text-xl">Продажа </span>
          {sale.data.info.id} от {sale.data.info.date}
        </div>
        <div className="flex gap-2">
          <div>
            <span className="font-semibold">Заявка: </span>
            <Link href={routes.APPLICATION + '/' + sale.data.info.application.id}>{sale.data.info.application.id}</Link>
          </div>
          <span className="font-semibold">от: </span>
          <div>{sale.data.info.application.date || 'Не указано'}</div>
        </div>
        <div>
          <span className="font-semibold">Клиент: </span>
          {sale.data.info.client || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">Статус: </span>
          {sale.data.info.processing || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">store keeper: </span>
          {sale.data.info.store_keeper || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">Ответсвенный: </span>
          {sale.data.info.responsible || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">Сумма: </span>
          {sale.data.info.sum || 'Не указано'} Р
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <UiHeading level={'4'}>Товары</UiHeading>
        <div className="grid grid-cols-6 gap-4">
          {sale.data.data.map((item) => {
            return <Item data={item} />
          })}
        </div>
      </div>
    </div>
  )
}
