import { MoveApplicationSaleDto } from '@/shared/api/generated'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
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
          <Button
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
          </Button>
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Причина отказа"
              value={commentForRefusal}
              onChange={(e) => setCOmmentForRefusal(e.target.value)}
              className="w-full"
            />
            <Button
              disabled={!commentForRefusal}
              variant="destructive"
              onClick={() => refuse.mutate({ id: actionId, reason: commentForRefusal })}
            >
              Отказ
            </Button>
          </div>
        </div>
      )}
      {actionProcessing === 'Заявка' && (
        <div className="flex flex-col gap-2 1024:items-start">
          <Button
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
          </Button>
          <Button
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
          </Button>
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Причина отказа"
              value={commentForRefusal}
              onChange={(e) => setCOmmentForRefusal(e.target.value)}
              className="w-full"
            />
            <Button
              disabled={!commentForRefusal}
              variant="destructive"
              onClick={() => refuse.mutate({ id: actionId, reason: commentForRefusal })}
            >
              Отказ
            </Button>
          </div>
        </div>
      )}

      {actionProcessing === 'Сборка' && (
        <div className="flex flex-col gap-2 1024:items-start">
          <Button
            variant="primary"
            onClick={() => openCreateSaleModal()}
            disabled={actionSubProcessng != 'Готов'}
          >
            Создать продажу
          </Button>
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Комментарий сборщику"
              value={commentForCollector}
              onChange={(e) => setCommentForCollector(e.target.value)}
              className="w-full"
            />
            <Button
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
            </Button>
          </div>

          <div className="flex gap-2 w-full">
            <Input
              placeholder="Причина отказа"
              value={commentForRefusal}
              onChange={(e) => setCOmmentForRefusal(e.target.value)}
              className="w-full"
            />
            <Button
              disabled={!commentForRefusal}
              variant="destructive"
              onClick={() => refuse.mutate({ id: actionId, reason: commentForRefusal })}
            >
              Отказ
            </Button>
          </div>
        </div>
      )}
      {actionProcessing === 'Продажа' && (
        <div className="flex flex-col gap-2 1024:items-start">
          <Button variant="primary" onClick={() => openAddTkModal(actionId)}>
            Информация о тк
          </Button>
          <Button
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
          </Button>
          <Button
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
          </Button>
        </div>
      )}

      {actionProcessing === 'Упаковка' && (
        <div className="flex flex-col gap-2 1024:items-start">
          <Button variant="primary" onClick={() => openAddTkModal(actionId)}>
            Информация о тк
          </Button>
          <Button
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
          </Button>
          <Button
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
          </Button>
        </div>
      )}
    </div>
  )
}
