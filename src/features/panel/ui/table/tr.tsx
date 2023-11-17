import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Modal } from './modal'
import { SubStatus } from './sub-status'
import { DataDto } from '@/shared/api/generated'
import clsx from 'clsx'

export const Tr = ({ item }: { item: DataDto }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [modalRef])

  return (
    <tr className="hover:bg-gray-100 transition-all relative border border-[#A9AABC] text-[12px] 1512:text-sm">
      <td className="border border-[#A9AABC] px-4 py-2 text-center">
        <Link href={routes.APP_SALE + '/' + item.id}> {item.id}</Link>
      </td>
      <td className="border border-[#A9AABC] px-4 py-2 ">{item.client}</td>
      <td className="border border-[#A9AABC] px-4 py-2">
        <Link
          href={routes.USER_PROFILE + '/' + item.responsible.id}
          className="flex gap-2"
        >
          <span>{item.responsible.name}</span>
          <span>{item.responsible.phone}</span>
        </Link>
      </td>

      <td
        className={`border border-[#A9AABC] px-4 py-2 font-medium ${
          item.processing === 'Заявка' ? 'bg-blue-400' : ''
        }
        ${item.processing === 'Обращение' ? 'bg-[#FFFB93]' : ''}
        ${item.processing === 'Заявка' ? 'bg-[#FFA6A6]' : ''}
        ${item.processing === 'Сборка' ? 'bg-[#70F45A]' : ''}
        ${item.processing === 'Продажа' ? 'bg-[#FB7FEF]' : ''}
        ${item.processing === 'Упаковка' ? 'bg-[#C67700]' : ''}
        ${item.processing === 'Отправка в тк' ? 'bg-[#8A63FA] ' : ''}
        ${item.processing === 'Отправлено клиенту' ? 'bg-[#60E2FF] ' : ''}
        ${item.processing === 'Заказ получен' ? ' bg bg-[#55FFE0] ' : ''}
        `}
      >
        {item.processing}
      </td>
      <td
        className={clsx('font-medium text-center px-2 1512:px-0', {
          'bg-yellow-300': item.sub_processing === 'Ожидание',
          'bg-orange-300': item.sub_processing === 'Выполняется',
          'bg-green-600': item.sub_processing === 'Готов',
        })}
      >
        {item.sub_processing && <SubStatus subStatus={item.sub_processing} />}
      </td>
      <td className="border border-[#A9AABC] px-4 py-2">
        <Link
          href={routes.USER_PROFILE + '/' + item.porter.id}
          className="flex gap-2"
        >
          <span>{item.porter.name}</span>
          <span>{item.porter.phone}</span>
        </Link>
      </td>
      <td className="border border-[#A9AABC] text-center">
        {item.processing != 'Заказ получен' &&
          item.processing != 'Отправлено клиенту' &&
          item.processing != 'Отправка в тк' && <Modal item={item} />}
      </td>
    </tr>
  )
}
