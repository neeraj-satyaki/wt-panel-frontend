import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import { Modal } from './modal'
import { SubStatus } from './sub-status'
import { DataDto } from '@/shared/api/generated'
import clsx from 'clsx'
import { highlightQuery } from '@/shared/lib/highlight-text'

type TrProps = {
  item: DataDto
  q: string
}

export const Tr = (props: TrProps) => {
  return (
    <tr className="hover:bg-gray-100 transition-all relative border border-[#A9AABC] text-[12px] 1512:text-sm">
      <td className="border border-[#A9AABC] px-4 py-2 text-center">
        <Link href={routes.APP_SALE + '/' + props.item.id}>{highlightQuery(props.item.id, props.q)}</Link>
      </td>
      <td className="border border-[#A9AABC] px-4 py-2 ">{highlightQuery(props.item.client, props.q)}</td>
      <td className="border border-[#A9AABC] px-4 py-2">
        <Link href={routes.USER_PROFILE + '/' + props.item.responsible.id} className="flex gap-2">
          <span>{highlightQuery(props.item.responsible.name, props.q)}</span>
          <span>{highlightQuery(props.item.responsible.phone, props.q)}</span>
        </Link>
      </td>

      <td
        className={`border border-[#A9AABC] px-4 py-2 font-medium ${
          props.item.processing === 'Заявка' ? 'bg-blue-400' : ''
        }
        ${props.item.processing === 'Обращение' ? 'bg-[#FFFB93]' : ''}
        ${props.item.processing === 'Заявка' ? 'bg-[#FFA6A6]' : ''}
        ${props.item.processing === 'Сборка' ? 'bg-[#70F45A]' : ''}
        ${props.item.processing === 'Продажа' ? 'bg-[#FB7FEF]' : ''}
        ${props.item.processing === 'Упаковка' ? 'bg-[#C67700]' : ''}
        ${props.item.processing === 'Отправка в тк' ? 'bg-[#8A63FA] ' : ''}
        ${props.item.processing === 'Отправлено клиенту' ? 'bg-[#60E2FF] ' : ''}
        ${props.item.processing === 'Заказ получен' ? ' bg bg-[#55FFE0] ' : ''}
        `}
      >
        {props.item.processing}
      </td>
      <td
        className={clsx('font-medium text-center px-2 1512:px-0', {
          'bg-yellow-300': props.item.sub_processing === 'Ожидание',
          'bg-orange-300': props.item.sub_processing === 'Выполняется',
          'bg-green-600': props.item.sub_processing === 'Готов',
        })}
      >
        {props.item.sub_processing && <SubStatus subStatus={props.item.sub_processing} />}
      </td>
      <td className="border border-[#A9AABC] px-4 py-2">
        <Link href={routes.USER_PROFILE + '/' + props.item.porter.id} className="flex gap-2">
          <span>{highlightQuery(props.item.porter.name, props.q)}</span>
          <span>{highlightQuery(props.item.porter.phone, props.q)}</span>
        </Link>
      </td>
      <td className="border border-[#A9AABC] text-center">
        {props.item.processing != 'Заказ получен' &&
          props.item.processing != 'Отправлено клиенту' &&
          props.item.processing != 'Отправка в тк' &&
          props.item.processing && <Modal item={props.item} />}
      </td>
    </tr>
  )
}
