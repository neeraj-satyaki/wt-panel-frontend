import { Roboto_Flex } from 'next/font/google'
import { headings } from '../config'
import { highlightText } from '@/shared/lib/lib-highlight-text'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { DataDto, SessionInfoDto } from '@/shared/api/generated'
import { getColorProcessing } from '../../model/use-table'
import { UnderStatusModal } from './under-status-modal'
import { MoveButton } from '../action/move-button'

const roboto_flex = Roboto_Flex({ subsets: ['latin'], weight: '300' })

type Props = {
  appSales: DataDto[]
  searchQuery: string
  session: SessionInfoDto | null
}

export default function Table({ appSales, searchQuery, session }: Props) {
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
                  {highlightText(item.id, searchQuery)}
                </Link>
              </td>
              <td className="border">{item.client}</td>
              <td className="border">
                {item.responsible.id ? (
                  <Link
                    href={
                      session?.id === item.responsible.id
                        ? routes.PERSONAL_AREA
                        : routes.USER_PROFILE + '/' + item.responsible.id
                    }
                  >
                    <span>{item.responsible.name} </span>
                    <span>{item.responsible.phone}</span>
                  </Link>
                ) : (
                  <div>
                    <span>{item.responsible.name} </span>
                    <span>{item.responsible.phone}</span>
                  </div>
                )}
              </td>
              <td className={`${getColorProcessing(item.processing)} border`}>
                <span>{item.processing} </span>
                <span className="border-b-[1px] border-black">{item.tk}</span>
              </td>
              <td>
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
                    <span>{item.porter.name} </span>
                    <span>{item.porter.phone}</span>
                  </Link>
                ) : (
                  <div>
                    {item.porter.name}
                    {item.porter.phone}
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
                      <MoveButton item={item} />
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
