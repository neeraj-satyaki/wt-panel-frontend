import { useGetSale } from '@/entities/sale/queries'
import { Item } from './item'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SkeletonSale } from './skeleton-sale'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { UiButton } from '@/shared/ui/components/ui-button'
import { useMoveSale } from '../model/use-move-sale'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useAddTrackNumberA } from '../model/use-add-track-number'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import clsx from 'clsx'

const ScannerAddTrackNumber = lazy(() => import('./scanner-add-track-number'))

export const Sale = ({ id }: { id: string }) => {
  const sale = useGetSale(id)
  const move = useMoveSale()
  const addTrackNumber = useAddTrackNumberA()

  if (sale.isLoading) return <SkeletonSale />
  if (sale.isError) return <div>Ошибка</div>
  if (!sale.data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-10">
      {addTrackNumber.addTrackNumberModal && (
        <Suspense fallback={<UiPageSpinner />}>
          <ScannerAddTrackNumber
            saleId={id}
            close={addTrackNumber.close}
            successScan={addTrackNumber.successScan}
            isPending={addTrackNumber.isPending}
            isError={addTrackNumber.isError}
            isSuccess={addTrackNumber.isSuccess}
          />
        </Suspense>
      )}
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
        <div className="flex gap-2">
          <span className="font-semibold">Статус: </span>
          {move.isLoading || sale.isFetching ? (
            <div className="rounded-lg w-24 h-5 bg-gray-200 animate-pulse"></div>
          ) : (
            sale.data.info.processing
          )}
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Подстатус: </span>
          {move.isLoading || sale.isFetching ? (
            <div className="rounded-lg w-24 h-5 bg-gray-200 animate-pulse"></div>
          ) : (
            <span
              className={clsx('font-semibold', {
                'bg-green-400':
                  sale.data.info.sub_processing === 'Готов' ||
                  sale.data.info.sub_processing === 'Вручен',
              })}
            >
              {sale.data.info.sub_processing}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Ответсвенный: </span>
          {move.isLoading || sale.isFetching ? (
            <div className="rounded-lg w-24 h-5 bg-gray-200 animate-pulse"></div>
          ) : (
            sale.data.info.responsible
          )}
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
                  disabled={move.isLoading || sale.isFetching}
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
                  {move.isLoading || sale.isFetching ? <UiSpinner /> : 'Взять в работу'}
                </UiButton>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <UiButton
                    disabled={move.isLoading || sale.isFetching}
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
                    {move.isLoading || sale.isFetching ? (
                      <UiSpinner />
                    ) : (
                      'Отменить взятие в работу'
                    )}
                  </UiButton>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    sale.data.data.every((obj) => obj.state != 'Да')
                  }
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
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Закончить действие'
                  )}
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
                  disabled={move.isLoading || sale.isFetching}
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
                  {move.isLoading || sale.isFetching ? <UiSpinner /> : 'Взять в работу'}
                </UiButton>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <UiButton
                    disabled={move.isLoading || sale.isFetching}
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
                    {move.isLoading || sale.isFetching ? (
                      <UiSpinner />
                    ) : (
                      'Отменить взятие в работу'
                    )}
                  </UiButton>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={move.isLoading || sale.isFetching}
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
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Закончить действие'
                  )}
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
                  disabled={move.isLoading || sale.isFetching}
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
                  {move.isLoading || sale.isFetching ? <UiSpinner /> : 'Взять в работу'}
                </UiButton>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <UiButton
                    disabled={move.isLoading || sale.isFetching}
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
                    {move.isLoading || sale.isFetching ? (
                      <UiSpinner />
                    ) : (
                      'Отменить взятие в работу'
                    )}
                  </UiButton>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    sale.data.info.recorded_track_number
                  }
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() => addTrackNumber.open()}
                >
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Отправить трек номер'
                  )}
                </UiButton>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    !sale.data.info.recorded_track_number
                  }
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() => [
                    move.handleSubmit({
                      id: id,
                      processing: 'Отправлено клиенту',
                      sub_processing: '0',
                      type: 'Продажа',
                      move_myself: false,
                    }),
                  ]}
                >
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Закончить действие'
                  )}
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
            return (
              <Item
                data={item}
                key={i}
                subProcessing={sale.data.info.sub_processing}
                processing={sale.data.info.processing}
                saleId={sale.data.info.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
