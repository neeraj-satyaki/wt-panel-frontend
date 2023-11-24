import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import { SubStatus } from './sub-status'
import { DataDto } from '@/shared/api/generated'
import clsx from 'clsx'
import { highlightQuery } from '@/shared/lib/lib-highlight-text'

type Props = {
  item: DataDto
  q: string
  openModalActions: (processing: string, itemId: string, subProcessing: string) => void
}

export function Tr({ item, q, openModalActions }: Props) {
  const isApplicationOrSale = ['Обращение', 'Заявка', 'Сборка'].includes(item.processing)

  const isProcessingActive =
    ['Заказ получен', 'Отправлено клиенту', 'Отправка в тк'].indexOf(item.processing) ===
    -1

  return (
    <tr className="hover:bg-gray-100 transition-all relative border border-[#A9AABC] text-[12px] 1512:text-sm text-center">
      <td className="border border-[#A9AABC]  py-2">
        <Link
          href={`${isApplicationOrSale ? routes.APPLICATION : routes.SALE}/${item.id}`}
        >
          {highlightQuery(item.id, q)}
        </Link>
      </td>
      <td className="border border-[#A9AABC] ">{highlightQuery(item.client, q)}</td>
      <td className="border border-[#A9AABC]">
        <Link href={routes.USER_PROFILE + '/' + item.responsible.id}>
          <span>
            {highlightQuery(item.responsible.name, q)}
            {highlightQuery(item.responsible.phone, q)}
          </span>
        </Link>
      </td>

      <td className={`border border-[#A9AABC] ${getProcessingClass(item.processing)}`}>
        {item.processing}
      </td>
      <td
        className={clsx('relative', {
          'bg-yellow-300': item.sub_processing === 'Ожидание',
          'bg-orange-300': item.sub_processing === 'Выполняется',
          'bg-green-500': item.sub_processing === 'Готов',
        })}
      >
        {item.sub_processing && <SubStatus subStatus={item.sub_processing} />}
      </td>
      <td className="border border-[#A9AABC]">
        <Link href={routes.USER_PROFILE + '/' + item.porter.id}>
          <span>
            {highlightQuery(item.porter.name, q)}
            {highlightQuery(item.porter.phone, q)}
          </span>
        </Link>
      </td>
      <td className="border border-[#A9AABC]">
        {isProcessingActive && (
          <button
            onClick={() =>
              openModalActions(item.processing, item.id, item.sub_processing)
            }
          >
            Действие
          </button>
        )}
      </td>
    </tr>
  )
}

function getProcessingClass(processing: string): string {
  const colors: { [key: string]: string } = {
    Заявка: 'bg-blue-400',
    Обращение: 'bg-[#FFFB93]',
    Сборка: 'bg-[#70F45A]',
    Продажа: 'bg-[#FB7FEF]',
    Упаковка: 'bg-[#C67700]',
    'Отправка в тк': 'bg-[#8A63FA]',
    'Отправлено клиенту': 'bg-[#60E2FF]',
    'Заказ получен': 'bg-[#55FFE0]',
  }
  return colors[processing] || 'bg-white'
}
