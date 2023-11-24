import { Item } from './item'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiError } from '@/shared/ui/components/ui-error'
import { SkeletonApplication } from './skeleton-application'
import { useGetApplication } from '@/entities/application'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { useMoveApplication } from '../model/use-move-application'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

export const Application = ({ id }: { id: string }) => {
  const application = useGetApplication(id)
  const move = useMoveApplication()

  if (application.isLoading) return <SkeletonApplication />
  if (!application.data) return <UiError />
  if (application.isError) return <UiError />

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
            {application.data.info.responsible}
          </div>
          <div>
            <span className="font-semibold">Сумма: </span>
            {application.data.info.sum} Р
          </div>
          <div>
            <span className="font-semibold">Подстатус: </span>
            {move.isLoading ? <span>Loading</span> : application.data.info.sub_processing}
          </div>
          <div>
            <span className="font-semibold">Исполнитель: </span>
            {application.data.info.porter || 'Отсутствует'}
          </div>
        </div>
        <div className="flex gap-2">
          {application.data.info.processing === 'Сборка' &&
            application.data.info.sub_processing === 'Ожидание' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
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
                  {move.isLoading ? <UiSpinner /> : 'Взять в работу'}
                </UiButton>
              </div>
            )}
          {application.data.info.processing === 'Сборка' &&
            application.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
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
                  {move.isLoading ? <UiSpinner /> : 'Отменить взятие в работу'}
                </UiButton>
              </div>
            )}
          {application.data.info.processing === 'Сборка' &&
            application.data.info.sub_processing === 'Выполняется' && (
              <div>
                <UiButton
                  disabled={move.isLoading}
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
                  {move.isLoading ? <UiSpinner /> : 'Закончить сборку'}
                </UiButton>
              </div>
            )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <UiHeading level={'4'}>Товары</UiHeading>
        <UiListProductsLayout>
          {application.data.data.map((item, i) => {
            return <Item data={item} key={i} />
          })}
        </UiListProductsLayout>
      </div>
    </div>
  )
}
