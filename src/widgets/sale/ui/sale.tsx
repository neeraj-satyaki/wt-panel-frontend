import { useGetSale } from '@/entities/sale/queries'
import { Item } from './item'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiError } from '@/shared/ui/components/ui-error'
import { SkeletonSale } from './skeleton-sale'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { UiButton } from '@/shared/ui/components/ui-button'
import { useMoveSale } from '../model/use-move-sale'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

export const Sale = ({ id }: { id: string }) => {
  const sale = useGetSale(id)
  const move = useMoveSale()

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
            <Link href={routes.APPLICATION + '/' + sale.data.info.application.id}>
              {sale.data.info.application.id}
            </Link>
          </div>
          <span className="font-semibold">от: </span>
          <div>{sale.data.info.application.date}</div>
        </div>
        <div>
          <span className="font-semibold">Клиент: </span>
          {sale.data.info.client}
        </div>
        <div>
          <span className="font-semibold">Статус: </span>
          {sale.data.info.processing}
        </div>
        <div>
          <span className="font-semibold">Подстатус: </span>
          {move.isLoading ? <span>Loading</span> : sale.data.info.sub_processing}
        </div>
        <div>
          <span className="font-semibold">Ответсвенный: </span>
          {move.isLoading ? <span>Loading</span> : sale.data.info.responsible}
        </div>
        <div>
          <span className="font-semibold">Сумма: </span>
          {sale.data.info.sum} Р
        </div>
      </div>
      <div className="flex gap-2">
        {sale.data.info.processing === 'Продажа' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '2',
                      type: 'Продажа',
                      move_myself: true,
                    })
                  }
                >
                  {move.isLoading ? <UiSpinner /> : 'Взять в работу'}
                </UiButton>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <UiButton
                    disabled={move.isLoading}
                    variant={'primary'}
                    className="px-4 py-2"
                    onClick={() =>
                      move.handleSubmit({
                        id: id,
                        processing: sale.data.info.processing,
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                      })
                    }
                  >
                    {move.isLoading ? <UiSpinner /> : 'Отменить взятие в работу'}
                  </UiButton>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '3',
                      type: 'Продажа',
                      move_myself: false,
                    })
                  }
                >
                  {move.isLoading ? <UiSpinner /> : 'Закончить действие'}
                </UiButton>
              </div>
            )}
          </>
        )}
        {sale.data.info.processing === 'Упаковка' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '2',
                      type: 'Продажа',
                      move_myself: true,
                    })
                  }
                >
                  {move.isLoading ? <UiSpinner /> : 'Взять в работу'}
                </UiButton>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <UiButton
                    disabled={move.isLoading}
                    variant={'primary'}
                    className="px-4 py-2"
                    onClick={() =>
                      move.handleSubmit({
                        id: id,
                        processing: sale.data.info.processing,
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                      })
                    }
                  >
                    {move.isLoading ? <UiSpinner /> : 'Отменить взятие в работу'}
                  </UiButton>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '3',
                      type: 'Продажа',
                      move_myself: false,
                    })
                  }
                >
                  {move.isLoading ? <UiSpinner /> : 'Закончить действие'}
                </UiButton>
              </div>
            )}
          </>
        )}
        {sale.data.info.processing === 'Отправка в тк' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '2',
                      type: 'Продажа',
                      move_myself: true,
                    })
                  }
                >
                  {move.isLoading ? <UiSpinner /> : 'Взять в работу'}
                </UiButton>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <UiButton
                    disabled={move.isLoading}
                    variant={'primary'}
                    className="px-4 py-2"
                    onClick={() =>
                      move.handleSubmit({
                        id: id,
                        processing: sale.data.info.processing,
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                      })
                    }
                  >
                    {move.isLoading ? <UiSpinner /> : 'Отменить взятие в работу'}
                  </UiButton>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() => [
                    move.handleSubmit({
                      id: id,
                      processing: 'Отправлено клиенту',
                      sub_processing: '3',
                      type: 'Продажа',
                      move_myself: false,
                    }),
                  ]}
                >
                  {move.isLoading ? <UiSpinner /> : 'Закончить действие'}
                </UiButton>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <UiHeading level={'4'}>Товары</UiHeading>
        <div className="grid grid-cols-6 gap-4">
          {sale.data.data.map((item, i) => {
            return <Item data={item} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}
