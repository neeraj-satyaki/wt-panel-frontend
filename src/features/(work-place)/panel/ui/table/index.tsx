import { Roboto_Flex } from 'next/font/google'
import React from 'react'
import { headings } from '../config'
import { highlightQuery } from '@/shared/lib/lib-highlight-text'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { DataDto, SessionInfoDto } from '@/shared/api/generated'
import { getColorProcessing } from '../../model/use-table'
import { UnderStatusModal } from './under-status-modal'
import clsx from 'clsx'

const roboto_flex = Roboto_Flex({ subsets: ['latin'], weight: '300' })

type Props = {
  appSales: DataDto[]
  searchQuery: string
  session: SessionInfoDto | null
  openActionModal: (id: string, processing: string, subProcessing: string) => void
}
export default function Table({
  appSales,
  searchQuery,
  openActionModal,
  session,
}: Props) {
  const serarchPanelVariants = {
    hidden: {
      y: -200,
    },
    visible: {
      y: 0,
    },
  }
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
                      <button
                        onClick={() =>
                          openActionModal(item.id, item.processing, item.sub_processing)
                        }
                      >
                        Действие
                      </button>
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
