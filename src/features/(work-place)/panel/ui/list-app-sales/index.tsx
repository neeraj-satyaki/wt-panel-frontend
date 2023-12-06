import React from 'react'
import { highlightQuery } from '@/shared/lib/lib-highlight-text'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { DataDto, SessionInfoDto } from '@/shared/api/generated'
import { getColorProcessing } from '../../model/use-table'
import { UnderStatusModal } from '../table/under-status-modal'
import { UiListAppSales } from '@/shared/ui/layouts/ui-list-products-app-sales'
import clsx from 'clsx'

type Props = {
  appSales: DataDto[]
  searchQuery: string
  session: SessionInfoDto | null
  openActionModal: (id: string, processing: string, subProcessing: string) => void
}

export default function ListAppSales({
  appSales,
  searchQuery,
  openActionModal,
  session,
}: Props) {
  return (
    <UiListAppSales>
      {appSales.map((item, i) => {
        const isApplicationOrSale = ['Обращение', 'Заявка', 'Сборка'].includes(
          item.processing,
        )

        return (
          <Link
            href={`${isApplicationOrSale ? routes.APPLICATION : routes.SALE}/${item.id}`}
            className="bg-white rounded-lg p-4 flex flex-col gap-2 items-start justify-between border border-gray-300"
            key={i}
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

            {session?.roles.some((role) =>
              ['Администратор', 'Менеджер'].includes(role.title),
            ) && (
              <>
                {['Обращение', 'Заявка', 'Сборка', 'Продажа', 'Упаковка'].includes(
                  item.processing,
                ) ? (
                  <button
                    onClick={(e) => [
                      openActionModal(item.id, item.processing, item.sub_processing),
                      e.preventDefault(),
                    ]}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Действие
                  </button>
                ) : null}
              </>
            )}
          </Link>
        )
      })}
    </UiListAppSales>
  )
}
