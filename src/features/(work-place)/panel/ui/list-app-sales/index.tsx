import React from 'react'
import { highlightQuery } from '@/shared/lib/lib-highlight-text'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { DataDto, MoveApplicationSaleDto, SessionInfoDto } from '@/shared/api/generated'
import { getColorProcessing } from '../../model/use-table'
import { UnderStatusModal } from '../table/under-status-modal'
import { UiListAppSales } from '@/shared/ui/layouts/ui-list-products-app-sales'
import clsx from 'clsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { Button } from '@/shared/ui/components/ui/button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import AnimateError from '@/shared/ui/animations/error'
import { MoveButton } from '../action/move-button'
import { UseMutationResult } from '@tanstack/react-query'
import AnimateSuccess from '@/shared/ui/animations/success'

type Props = {
  appSales: DataDto[]
  searchQuery: string
  session: SessionInfoDto | null
  openActionModal: (id: string, processing: string, subProcessing: string) => void
  actionProcessing: string
  moveAppSale: UseMutationResult<unknown, Error, MoveApplicationSaleDto, unknown>
  refuse: any
  actionId: string
  actionSubProcessng: string
  openCreateSaleModal: () => void
  setActionModal: (state: boolean) => void
  openAddTkModal: (id: string) => void
}

export default function ListAppSales({
  appSales,
  searchQuery,
  openActionModal,
  session,
  moveAppSale,
  openCreateSaleModal,
  actionId,
  actionProcessing,
  actionSubProcessng,
  openAddTkModal,
  refuse,
}: Props) {
  return (
    <UiListAppSales>
      {appSales.map((item, i) => {
        const isApplicationOrSale = ['Обращение', 'Заявка', 'Сборка'].includes(
          item.processing,
        )

        return (
          <div
            key={i}
            className="bg-white rounded-lg p-4 flex flex-col gap-2 items-start justify-between border border-gray-300"
          >
            <Link
              href={`${isApplicationOrSale ? routes.APPLICATION : routes.SALE}/${
                item.id
              }`}
            >
              <div className="text-lg font-semibold">
                {highlightQuery(item.id, searchQuery)}
              </div>
              <div className="text-gray-600">
                <span>Клиент: </span>
                <span>{highlightQuery(item.client, searchQuery)}</span>
              </div>
              <div className="text-gray-600">
                <span>Менеджер: </span>
                <span>{highlightQuery(item.responsible.name, searchQuery)} </span>
                <span>{highlightQuery(item.responsible.phone, searchQuery)}</span>
              </div>
              <div className="text-gray-600">
                <span>Исполнитель: </span>
                <span>{highlightQuery(item.porter.name, searchQuery)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <div
                  className={`${getColorProcessing(
                    item.processing,
                  )} py-2 px-4 rounded font-semibold inline-block`}
                >
                  <span>{item.processing} </span>
                  <span className="border-b-[1px] border-black">{item.tk}</span>
                </div>
                <div
                  className={clsx('', {
                    'bg-green-500 px-4 py-2 rounded-lg':
                      item.sub_processing === 'Готов' || item.sub_processing === 'Вручен',
                  })}
                >
                  <UnderStatusModal
                    processing={item.processing}
                    subProcessing={item.sub_processing}
                  />
                </div>
              </div>
            </Link>

            {session?.roles.some((role) =>
              ['Администратор', 'Менеджер'].includes(role.title),
            ) && (
              <>
                {['Обращение', 'Заявка', 'Сборка', 'Продажа', 'Упаковка'].includes(
                  item.processing,
                ) ? (
                  <Dialog onOpenChange={() => [refuse.reset(), moveAppSale.reset()]}>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          openActionModal(item.id, item.processing, item.sub_processing)
                        }
                      >
                        Действие
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] w-full">
                      <DialogHeader>
                        <DialogTitle>Действие</DialogTitle>
                      </DialogHeader>
                      {moveAppSale.isPending || refuse.isPending ? (
                        <UiSpinner className="w-full my-20" />
                      ) : null}
                      {moveAppSale.isError || refuse.isError ? (
                        <div className="flex flex-col gap-2 items-center">
                          <AnimateError />
                          <div>Произошла ошибка</div>
                        </div>
                      ) : null}
                      {moveAppSale.isSuccess || refuse.isSuccess ? (
                        <div className="flex flex-col gap-2 items-center">
                          <AnimateSuccess />
                          <div>Успешно</div>
                        </div>
                      ) : null}
                      {!moveAppSale.isPending &&
                        !moveAppSale.isError &&
                        !moveAppSale.isSuccess &&
                        (!refuse.isPending && !refuse.isError && !refuse.isSuccess ? (
                          <MoveButton
                            refuse={refuse}
                            actionProcessing={actionProcessing}
                            moveAppSale={moveAppSale}
                            actionId={actionId}
                            actionSubProcessng={actionSubProcessng}
                            openCreateSaleModal={openCreateSaleModal}
                            openAddTkModal={openAddTkModal}
                          />
                        ) : null)}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Закрыть
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : null}
              </>
            )}
          </div>
        )
      })}
    </UiListAppSales>
  )
}
