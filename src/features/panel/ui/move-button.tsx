import { MoveApplicationSaleDto } from '@/shared/api/generated'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UseMutationResult } from '@tanstack/react-query'

type Props = {
  actionProcessing: string
  moveAppSale: UseMutationResult<unknown, Error, MoveApplicationSaleDto, unknown>
  actionId: string
  actionSubProcessng: string
  openCreateSaleModal: () => void
}

export function MoveButton({
  actionProcessing,
  moveAppSale,
  actionId,
  actionSubProcessng,
  openCreateSaleModal,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {actionProcessing === 'Обращение' && (
        <UiButton
          className="px-4 py-2"
          variant="primary"
          onClick={() =>
            moveAppSale.mutate({
              id: actionId,
              processing: 'Заявка',
              sub_processing: '1',
              type: 'Заявка',
              move_myself: false,
            })
          }
        >
          В работу
        </UiButton>
      )}
      {actionProcessing === 'Заявка' && (
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
      )}
      {actionProcessing === 'Заявка' && (
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
      )}
      {actionProcessing === 'Сборка' && (
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
      )}
      {actionProcessing === 'Сборка' && (
        <UiButton
          className="px-4 py-2"
          variant="primary"
          onClick={() => openCreateSaleModal()}
          disabled={actionSubProcessng != 'Готов'}
        >
          Создать продажу
        </UiButton>
      )}
      {actionProcessing === 'Продажа' && (
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
      )}
      {actionProcessing === 'Продажа' && (
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
          Отдать клиенту
        </UiButton>
      )}
      {actionProcessing === 'Упаковка' && (
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
      )}
      {actionProcessing === 'Упаковка' && (
        <UiButton
          className="px-4 py-2"
          variant="primary"
          disabled={actionSubProcessng != 'Готов'}
          onClick={() =>
            moveAppSale.mutate({
              id: actionId,
              processing: 'Заказ получен',
              sub_processing: '1',
              type: 'Продажа',
              move_myself: false,
            })
          }
        >
          Отдать клиенту
        </UiButton>
      )}
    </div>
  )
}
