import { Roboto_Flex } from 'next/font/google'
import React from 'react'
import { headings } from '../config'
import { highlightQuery } from '@/shared/lib/lib-highlight-text'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { DataDto, MoveApplicationSaleDto, SessionInfoDto } from '@/shared/api/generated'
import { getColorProcessing } from '../../model/use-table'
import { UnderStatusModal } from './under-status-modal'
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
import { MoveButton } from '../action/move-button'
import { UseMutationResult } from '@tanstack/react-query'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'

const roboto_flex = Roboto_Flex({ subsets: ['latin'], weight: '300' })

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
export default function Table({
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
    <table className={`${roboto_flex.className} w-full`}>
      <thead className="bg-gray-200">
        <tr>
          {headings.map((heading, i) => (
            <th className={`py-2 text-sm font-semibold border border-white`} key={i}>
              {heading.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {appSales.map((item, i) => {
          const isApplicationOrSale = ['Обращение', 'Заявка', 'Сборка'].includes(
            item.processing,
          )
          return (
            <tr className="text-sm text-center border hover:bg-gray-100" key={i}>
              <td className="py-2 border">
                <Link
                  href={`${isApplicationOrSale ? routes.APPLICATION : routes.SALE}/${
                    item.id
                  }`}
                >
                  {highlightQuery(item.id, searchQuery)}
                </Link>
              </td>
              <td className="border">{highlightQuery(item.client, searchQuery)}</td>
              <td className="border">
                {item.responsible.id ? (
                  <Link
                    href={
                      session?.id === item.responsible.id
                        ? routes.PERSONAL_AREA
                        : routes.USER_PROFILE + '/' + item.responsible.id
                    }
                  >
                    <span>{highlightQuery(item.responsible.name, searchQuery)} </span>
                    <span>{highlightQuery(item.responsible.phone, searchQuery)}</span>
                  </Link>
                ) : (
                  <div>
                    <span>{highlightQuery(item.responsible.name, searchQuery)} </span>
                    <span>{highlightQuery(item.responsible.phone, searchQuery)}</span>
                  </div>
                )}
              </td>
              <td className={`${getColorProcessing(item.processing)} border`}>
                <span>{item.processing} </span>
                <span className="border-b-[1px] border-black">{item.tk}</span>
              </td>
              <td
                className={clsx('', {
                  'bg-green-500 px-4 py-2 ':
                    item.sub_processing === 'Готов' || item.sub_processing === 'Вручен',
                })}
              >
                <UnderStatusModal
                  subProcessing={item.sub_processing}
                  processing={item.processing}
                />
              </td>
              <td className="border">
                {item.porter.id ? (
                  <Link
                    href={
                      session?.id === item.porter.id
                        ? routes.PERSONAL_AREA
                        : routes.USER_PROFILE + '/' + item.porter.id
                    }
                  >
                    <span>{highlightQuery(item.porter.name, searchQuery)} </span>
                    <span>{highlightQuery(item.porter.phone, searchQuery)}</span>
                  </Link>
                ) : (
                  <div>
                    {highlightQuery(item.porter.name, searchQuery)}
                    {highlightQuery(item.porter.phone, searchQuery)}
                  </div>
                )}
              </td>
              <td className="border">
                {session?.roles.some((role) =>
                  ['Администратор', 'Менеджер'].includes(role.title),
                ) && (
                  <>
                    {['Обращение', 'Заявка', 'Сборка', 'Продажа', 'Упаковка'].includes(
                      item.processing,
                    ) ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              openActionModal(
                                item.id,
                                item.processing,
                                item.sub_processing,
                              )
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
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
