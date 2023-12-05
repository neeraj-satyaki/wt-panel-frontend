import { useGetApplication } from '@/entities/application'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import clsx from 'clsx'
import { useMoveApplication } from '../model/use-move-application'
import { Item } from './item'
import { SkeletonApplication } from './skeleton-application'

export const Application = ({ id }: { id: string }) => {
  const application = useGetApplication(id)
  const move = useMoveApplication()

  if (application.isLoading) return <SkeletonApplication />
  if (application.isError) return <div>Ошибка</div>
  if (!application.data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div>
            <span className="font-semibold text-xl">
              Заявка {application.data.info.id} от {application.data.info.date}
            </span>
          </div>
          <div>
            <span className="font-semibold">Клиент: </span>
            {application.data.info.client}
          </div>
          <div>
            <span className="font-semibold">Статус: </span>
            {application.data.info.processing}
          </div>
          <div>
            <span className="font-semibold">Ответсвенный: </span>
            {move.isLoading || application.isFetching ? (
              <span>Loading</span>
            ) : (
              application.data.info.responsible
            )}
          </div>
          <div>
            <span className="font-semibold">Сумма: </span>
            {application.data.info.sum} Р
          </div>
          <div>
            <span className={clsx('font-semibold')}>Подстатус: </span>
            {move.isLoading || application.isFetching ? (
              <span>Loading</span>
            ) : (
              <span
                className={clsx('', {
                  'bg-green-400 py-2 px-4 rounded-lg font-semibold':
                    application.data.info.sub_processing === 'Готов',
                })}
              >
                {application.data.info.sub_processing}
              </span>
            )}
          </div>
          <div>
            <span className="font-semibold">Исполнитель: </span>
            {move.isLoading || application.isFetching ? (
              <span>Loading</span>
            ) : (
              application.data.info.porter || 'Отсутствует'
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {application.data.info.processing === 'Сборка' &&
            application.data.info.sub_processing === 'Ожидание' && (
              <div>
                <UiButton
                  disabled={move.isLoading || application.isFetching}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: application.data.info.processing,
                      sub_processing: '2',
                      type: 'Заявка',
                      move_myself: true,
                    })
                  }
                >
                  {move.isLoading || application.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Взять в работу'
                  )}
                </UiButton>
              </div>
            )}
          {application.data.info.processing === 'Сборка' &&
            application.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={move.isLoading || application.isFetching}
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: application.data.info.processing,
                      sub_processing: '1',
                      type: 'Заявка',
                      move_myself: false,
                    })
                  }
                >
                  {move.isLoading || application.isFetching ? (
                    <UiSpinner />
                  ) : (
                    'Вернуть в работу'
                  )}
                </UiButton>
              </div>
            )}
          {application.data.info.processing === 'Сборка' &&
            application.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={
                    move.isLoading ||
                    application.isFetching ||
                    application.data.data.some((obj) => obj.photos.length < 1)
                  }
                  variant={'primary'}
                  className="px-4 py-2"
                  onClick={() =>
                    move.handleSubmit({
                      id: id,
                      processing: application.data.info.processing,
                      sub_processing: '3',
                      type: 'Заявка',
                      move_myself: true,
                    })
                  }
                >
                  {move.isLoading || application.isFetching ? <UiSpinner /> : 'Закончить'}
                </UiButton>
              </div>
            )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <UiHeading level={'4'}>Товары</UiHeading>
        <UiListProductsLayout>
          {/* {application.data.data.map((item, i) => {
            return (
              <Item
                data={item}
                key={i}
                subProcessing={application.data.info.sub_processing}
                appId={application.data.info.id}
              />
            )
          })} */}
        </UiListProductsLayout>
      </div>
    </div>
  )
}
