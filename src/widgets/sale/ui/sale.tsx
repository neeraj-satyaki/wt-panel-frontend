import { useGetSale } from '@/entities/sale/api'
import { useSessionQuery } from '@/entities/session'
import { routes } from '@/shared/constants/routing'
import { encodeDecodeText } from '@/shared/lib/lib-endode-decode-text'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAddTrackNumberA } from '../model/use-add-track-number'
import { useMoveSale } from '../model/use-move-sale'
import { Item } from './item'
import { SkeletonSale } from './skeleton-sale'
import { useState } from 'react'
import { userRoles } from '@/shared/constants/user-roles'

export const SaleWidget = ({ id }: { id: string }) => {
  const router = useRouter()
  const sale = useGetSale(id)
  const move = useMoveSale()
  const addTrackNumber = useAddTrackNumberA()
  const session = useSessionQuery()
  const [showModalAddTrackNumber, setShowModalAddTrackNumber] = useState(false)
  function handleAddTrackNumber(decodedText: string) {
    setShowModalAddTrackNumber(false)
    addTrackNumber.successScan(decodedText, id)
  }

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
          <div className="font-semibold">Ответсвенный: </div>
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
      <div className="flex gap-2 flex-col 1024:flex-row">
        {session.data?.roles.some(
          (role) => role.title === userRoles.ADMIN || role.title === userRoles.MANAGER,
        ) && (
          <>
            <Button
              variant="primary"
              className="block 1024:hidden"
              onClick={() => copyUrlForClientOnMobile()}
            >
              Поделится с клиентом
            </Button>
            <Button
              variant="primary"
              className="hidden 1024:block"
              onClick={() => goToAppSaleForCLientPage()}
            >
              Страница для клиента
            </Button>
          </>
        )}
        {sale.data.info.processing === 'Продажа' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching ? 'Загрузка...' : 'Взять в работу'}
                </Button>
              </>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching
                    ? 'Загрузка'
                    : 'Отменить взятие в работу'}
                </Button>
              </>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <>
                <Button
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    sale.data.data.every((obj) => obj.state != 'Да')
                  }
                  variant="primary"
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
                  {move.isLoading || sale.isFetching ? 'Загрузка...' : 'Закончить'}
                </Button>
              </>
            )}
          </>
        )}
        {sale.data.info.processing === 'Упаковка' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching ? 'Загрузка...' : 'Взять в работу'}
                </Button>
              </>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching
                    ? 'Загрузка...'
                    : 'Отменить взятие в работу'}
                </Button>
              </>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching
                    ? 'Загрузка...'
                    : 'Закончить действие'}
                </Button>
              </>
            )}
          </>
        )}
        {sale.data.info.processing === 'Отправка в тк' && (
          <>
            {sale.data.info.sub_processing === 'Ожидание' && (
              <div className="flex gap-2">
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching
                    ? 'Загрузка...'
                    : 'Вернуть на упаковку'}
                </Button>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching ? 'Загрузка...' : 'Взять в работу'}
                </Button>
              </div>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <>
                <Button
                  disabled={move.isLoading || sale.isFetching}
                  variant="primary"
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
                  {move.isLoading || sale.isFetching
                    ? 'Загрузка...'
                    : 'Отменить взятие в работу'}
                </Button>
              </>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <Dialog
                open={showModalAddTrackNumber}
                onOpenChange={setShowModalAddTrackNumber}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setShowModalAddTrackNumber(true)}
                    variant="primary"
                    disabled={
                      move.isLoading ||
                      sale.isFetching ||
                      sale.data.info.recorded_track_number
                    }
                  >
                    Отправить трек номер
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[800px] w-full">
                  <DialogHeader>
                    <DialogTitle>Отсканируйте накладную</DialogTitle>
                  </DialogHeader>
                  {move.isLoading || sale.isFetching ? (
                    'Загрузка...'
                  ) : (
                    <div className="w-full">
                      <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={(decodedText: string) =>
                          handleAddTrackNumber(decodedText)
                        }
                      />
                    </div>
                  )}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Закрыть
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {sale.data.info.sub_processing === 'Выполняется' && (
              <>
                <Button
                  disabled={
                    move.isLoading ||
                    sale.isFetching ||
                    !sale.data.info.recorded_track_number
                  }
                  variant="primary"
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
                  {move.isLoading || sale.isFetching
                    ? 'Загрузка...'
                    : 'Закончить действие'}
                </Button>
              </>
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
