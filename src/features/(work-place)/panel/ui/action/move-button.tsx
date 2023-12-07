import { MoveApplicationSaleDto } from '@/shared/api/generated'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { UseMutationResult } from '@tanstack/react-query'
import { useState } from 'react'

type Props = {
  actionProcessing: string
  moveAppSale: UseMutationResult<unknown, Error, MoveApplicationSaleDto, unknown>
  refuse: any
  actionId: string
  actionSubProcessng: string
  openCreateSaleModal: () => void
  openAddTkModal: (id: string) => void
}

export function MoveButton({
  actionProcessing,
  moveAppSale,
  actionId,
  actionSubProcessng,
  refuse,
  openCreateSaleModal,
  openAddTkModal,
}: Props) {
  const [commentForCollector, setCommentForCollector] = useState('')
  const [commentForRefusal, setCOmmentForRefusal] = useState('')
  return (
    <div className="flex flex-col gap-2">
      {actionProcessing === 'Обращение' && (
        <div className="flex flex-col gap-2 1024:items-start">
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
                comment_for_collector: '',
              })
            }
          >
            В работу
          </UiButton>
          <div className="flex gap-2 w-full">
            <UiTextField
              inputProps={{
                placeholder: 'Причина отказа',
                value: commentForRefusal,
                onChange: (e) => setCOmmentForRefusal(e.target.value),
              }}
              className="w-full"
            />
            <UiButton
              disabled={!commentForRefusal}
              className="px-4 py-2"
              variant="danger"
              onClick={() => refuse.mutate({ id: actionId, reason: commentForRefusal })}
            >
              Отказ
            </UiButton>
          </div>
        </div>
      )}
      {actionProcessing === 'Заявка' && (
        <div className="flex flex-col gap-2 1024:items-start">
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
                comment_for_collector: '',
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
                comment_for_collector: '',
              })
            }
          >
            Собрать самому
          </UiButton>
          <div className="flex gap-2 w-full">
            <UiTextField
              label="Причина отказа"
              inputProps={{
                value: commentForRefusal,
                onChange: (e) => setCOmmentForRefusal(e.target.value),
              }}
              className="w-full"
            />
            <UiButton
              disabled={!commentForRefusal}
              className="px-4 py-2"
              variant="danger"
              onClick={() => refuse.mutate({ id: actionId, reason: commentForRefusal })}
            >
              Отказ
            </UiButton>
          </div>
        </div>
      )}

      {actionProcessing === 'Сборка' && (
        <div className="flex flex-col gap-2 1024:items-start">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            onClick={() => openCreateSaleModal()}
            disabled={actionSubProcessng != 'Готов'}
          >
            Создать продажу
          </UiButton>
          <div className="flex gap-2 w-full">
            <UiTextField
              inputProps={{
                value: commentForCollector,
                onChange: (e) => setCommentForCollector(e.target.value),
                placeholder: 'Комментарий сборщику',
              }}
              className="w-full"
            />
            <UiButton
              className="px-4 py-2"
              variant="primary"
              disabled={actionSubProcessng != 'Готов' || !commentForCollector}
              onClick={() =>
                moveAppSale.mutate({
                  id: actionId,
                  processing: 'Сборка',
                  sub_processing: '1',
                  type: 'Заявка',
                  move_myself: false,
                  comment_for_collector: commentForCollector,
                })
              }
            >
              Пересобрать
            </UiButton>
          </div>

          <div className="flex gap-2 w-full">
            <UiTextField
              inputProps={{
                placeholder: 'Причина отказа',
                value: commentForRefusal,
                onChange: (e) => setCOmmentForRefusal(e.target.value),
              }}
              className="w-full"
            />
            <UiButton
              disabled={!commentForRefusal}
              className="px-4 py-2"
              variant="danger"
              onClick={() => refuse.mutate({ id: actionId, reason: commentForRefusal })}
            >
              Отказ
            </UiButton>
          </div>
        </div>
      )}
      {actionProcessing === 'Продажа' && (
        <div className="flex flex-col gap-2 1024:items-start">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            onClick={() => openAddTkModal(actionId)}
          >
            Информация о тк
          </UiButton>
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
                comment_for_collector: '',
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
                comment_for_collector: '',
              })
            }
          >
            Отдать клиенту
          </UiButton>
        </div>
      )}

      {actionProcessing === 'Упаковка' && (
        <div className="flex flex-col gap-2 1024:items-start">
          <UiButton
            className="px-4 py-2"
            variant="primary"
            onClick={() => openAddTkModal(actionId)}
          >
            Информация о тк
          </UiButton>
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
                comment_for_collector: '',
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
                comment_for_collector: '',
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
