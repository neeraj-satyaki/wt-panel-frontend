import { useRefusalApplication } from '@/entities/panel/queries'
import { MoveApplicationSaleDto } from '@/shared/api/generated'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UseMutationResult } from '@tanstack/react-query'

type Props = {
  actionProcessing: string
  moveAppSale: UseMutationResult<unknown, Error, MoveApplicationSaleDto, unknown>
  refuse: any
  actionId: string
  actionSubProcessng: string
  openCreateSaleModal: () => void
}

export function MoveButton({
  actionProcessing,
  moveAppSale,
  actionId,
  actionSubProcessng,
  refuse,
  openCreateSaleModal,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {actionProcessing === 'Обращение' && (
        <div className="flex flex-col gap-2">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Заявка',
                sub_processing: '0',
                type: 'Заявка',
                move_myself: true,
              })
            }
          >
            В работу
          </UiButton>
          <UiButton
            className="px-4 py-2"
            variant="danger"
            onClick={() => refuse.mutate({ id: actionId })}
          >
            Отказ
          </UiButton>
        </div>
      )}
      {actionProcessing === 'Заявка' && (
        <div className="flex flex-col gap-2">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Сборка',
                sub_processing: '1',
                type: 'Заявка',
                move_myself: false,
              })
            }
          >
            Отправить на сборку
          </UiButton>
          <UiButton
            className="px-4 py-2"
            variant="primary"
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Сборка',
                sub_processing: '2',
                type: 'Заявка',
                move_myself: true,
              })
            }
          >
            Собрать самому
          </UiButton>
          <UiButton
            className="px-4 py-2"
            variant="danger"
            onClick={() => refuse.mutate({ id: actionId })}
          >
            Отказ
          </UiButton>
        </div>
      )}

      {actionProcessing === 'Сборка' && (
        <div className="flex flex-col gap-2">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            disabled={actionSubProcessng != 'Готов'}
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Сборка',
                sub_processing: '1',
                type: 'Заявка',
                move_myself: false,
              })
            }
          >
            Пересобрать
          </UiButton>
          <UiButton
            className="px-4 py-2"
            variant="primary"
            onClick={() => openCreateSaleModal()}
            disabled={actionSubProcessng != 'Готов'}
          >
            Создать продажу
          </UiButton>
          <UiButton
            className="px-4 py-2"
            variant="danger"
            onClick={() => refuse.mutate({ id: actionId })}
          >
            Отказ
          </UiButton>
        </div>
      )}
      {actionProcessing === 'Продажа' && (
        <div className="flex flex-col gap-2">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            disabled={actionSubProcessng != 'Готов'}
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Упаковка',
                sub_processing: '1',
                type: 'Продажа',
                move_myself: false,
              })
            }
          >
            Отправить на упаковку
          </UiButton>
          <UiButton
            className="px-4 py-2"
            variant="primary"
            disabled={actionSubProcessng != 'Готов'}
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Упаковка',
                sub_processing: '0',
                type: 'Продажа',
                move_myself: false,
              })
            }
          >
            Отдать клиенту
          </UiButton>
        </div>
      )}

      {actionProcessing === 'Упаковка' && (
        <div className="flex flex-col gap-2">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            disabled={actionSubProcessng != 'Готов'}
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Отправка в тк',
                sub_processing: '1',
                type: 'Продажа',
                move_myself: false,
              })
            }
          >
            Отправить в тк
          </UiButton>
          <UiButton
            className="px-4 py-2"
            variant="primary"
            disabled={actionSubProcessng != 'Готов'}
            onClick={() =>
              moveAppSale.mutate({
                id: actionId,
                processing: 'Заказ получен',
                sub_processing: '0',
                type: 'Продажа',
                move_myself: false,
              })
            }
          >
            Отдать клиенту
          </UiButton>
        </div>
      )}
    </div>
  )
}
