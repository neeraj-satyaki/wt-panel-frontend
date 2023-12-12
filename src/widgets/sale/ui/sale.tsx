import { useGetSale } from '@/entities/sale/queries'
import { Item } from './item'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SkeletonSale } from './skeleton-sale'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { useMoveSale } from '../model/use-move-sale'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useAddTrackNumberA } from '../model/use-add-track-number'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import clsx from 'clsx'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { useSessionQuery } from '@/entities/session'
import { encodeDecodeText } from '@/shared/lib/lib-endode-decode-text'
import { useRouter } from 'next/router'
import { Button } from '@/shared/ui/components/ui/button'

const ScannerAddTrackNumber = lazy(() => import('./scanner-add-track-number'))

export const Sale = ({ id }: { id: string }) => {
  const router = useRouter()
  const sale = useGetSale(id)
  const move = useMoveSale()
  const addTrackNumber = useAddTrackNumberA()
  const session = useSessionQuery()

  if (sale.isLoading) return <SkeletonSale />
  if (sale.isError) return <div>Ошибка</div>
  if (!sale.data) return <div>Данные не получены</div>

  function copyUrlForClientOnMobile() {
    if (sale.data) {
      try {
        navigator.share({
          text: 'Добрый день, вот ваш заказ!: ',
          url: `${window.location.origin}${routes.APP_SALE_FOR_CLIENT}/${encodeDecodeText(
            sale?.data?.info?.id,
            'encode',
            'text-for-code',
          )}?type=sale`,
        })
        console.log('Успешно!')
      } catch (error) {}
    }
  }
  function goToAppSaleForCLientPage() {
    if (sale.data) {
      router.push(
        `${window.location.origin}${routes.APP_SALE_FOR_CLIENT}/${encodeDecodeText(
          sale.data?.info.id,
          'encode',
          'text-for-code',
        )}?type=sale`,
      )
    }
  }

  return (
    <div className="flex flex-col gap-2">
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
      <div className="flex flex-col">
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
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Подстатус: </span>
          {move.isLoading || sale.isFetching ? (
            <div className="rounded-lg w-24 h-5 bg-gray-200 animate-pulse"></div>
          ) : (
            <span
              className={clsx('', {
                'bg-green-400 py-2 px-4 rounded-lg':
                  sale.data.info.sub_processing === 'Готов' ||
                  sale.data.info.sub_processing === 'Вручен',
              })}
            >
              {sale.data.info.sub_processing}
            </span>
          )}
        </div>
        <div className="flex flex-wrap">
          <div className="font-semibold">Ответсвенный:</div>
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
        {session.data?.roles.some(
          (role) => role.title === 'Администратор' || role.title === 'Менеджер',
        ) && (
          <div>
            <Button variant={'primary'} onClick={() => copyUrlForClientOnMobile()}>
              Отправить клиенту
            </Button>
            <Button variant={'primary'} onClick={() => goToAppSaleForCLientPage()}>
              Страница для клиента
            </Button>
          </div>
        )}
        {sale.data.info.processing === 'Продажа' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <div>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant={'primary'}
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '2',
                      type: 'Продажа',
                      move_myself: true,
                      comment_for_collector: '',
                    })
                  }
                >
                  {move.isLoading || sale.isFetching ? <UiSpinner /> : 'Взять в работу'}
                </Button>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <Button
                    disabled={move.isLoading || sale.isFetching}
                    variant={'primary'}
                    onClick={() =>
                      move.handleSubmit({
                        id: id,
                        processing: sale.data.info.processing,
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    {move.isLoading || sale.isFetching ? (
                      <UiSpinner />
                    ) : (
                      'Отменить взятие в работу'
                    )}
                  </Button>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <Button
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    sale.data.data.every((obj) => obj.state != 'Да')
                  }
                  variant={'primary'}
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '3',
                      type: 'Продажа',
                      move_myself: false,
                      comment_for_collector: '',
                    })
                  }
                >
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Закончить действие'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
        {sale.data.info.processing === 'Упаковка' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <div>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant={'primary'}
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '2',
                      type: 'Продажа',
                      move_myself: true,
                      comment_for_collector: '',
                    })
                  }
                >
                  {move.isLoading || sale.isFetching ? <UiSpinner /> : 'Взять в работу'}
                </Button>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <Button
                    disabled={move.isLoading || sale.isFetching}
                    variant={'primary'}
                    onClick={() =>
                      move.handleSubmit({
                        id: id,
                        processing: sale.data.info.processing,
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    {move.isLoading || sale.isFetching ? (
                      <UiSpinner />
                    ) : (
                      'Отменить взятие в работу'
                    )}
                  </Button>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant={'primary'}
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '3',
                      type: 'Продажа',
                      move_myself: false,
                      comment_for_collector: '',
                    })
                  }
                >
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Закончить действие'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
        {sale.data.info.processing === 'Отправка в тк' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <div className="flex gap-2">
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant={'primary'}
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: 'Упаковка',
                      sub_processing: '3',
                      type: 'Продажа',
                      move_myself: true,
                      comment_for_collector: '',
                    })
                  }
                >
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Вернуть на упаковку'
                  )}
                </Button>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant={'primary'}
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: sale.data.info.processing,
                      sub_processing: '2',
                      type: 'Продажа',
                      move_myself: true,
                      comment_for_collector: '',
                    })
                  }
                >
                  {move.isLoading || sale.isFetching ? <UiSpinner /> : 'Взять в работу'}
                </Button>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <div>
                  <Button
                    disabled={move.isLoading || sale.isFetching}
                    variant={'primary'}
                    onClick={() =>
                      move.handleSubmit({
                        id: id,
                        processing: sale.data.info.processing,
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    {move.isLoading || sale.isFetching ? (
                      <UiSpinner />
                    ) : (
                      'Отменить взятие в работу'
                    )}
                  </Button>
                </div>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <Button
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    sale.data.info.recorded_track_number
                  }
                  variant={'primary'}
                  onClick={() => addTrackNumber.open()}
                >
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Отправить трек номер'
                  )}
                </Button>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <div>
                <Button
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    !sale.data.info.recorded_track_number
                  }
                  variant={'primary'}
                  onClick={() => [
                    move.handleSubmit({
                      id: id,
                      processing: 'Отправлено клиенту',
                      sub_processing: '0',
                      type: 'Продажа',
                      move_myself: false,
                      comment_for_collector: '',
                    }),
                  ]}
                >
                  {move.isLoading || sale.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Закончить действие'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <UiHeading level={'4'}>Товары</UiHeading>
        <UiListProductsLayout>
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
        </UiListProductsLayout>
      </div>
    </div>
  )
}
