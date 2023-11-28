import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import { DataDto } from '@/shared/api/generated'
import {} from '@/shared/lib/lib-highlight-text'

type TrProps = {
  item: DataDto
}

export const Tr = ({ item }: TrProps) => {
  return (
    <tr className="hover:bg-gray-100 transition-all relative border border-[#A9AABC] text-[12px] 1512:text-sm">
      <td className="border border-[#A9AABC] px-4 py-2 text-center">
        {item.processing === 'Обращение' ||
        item.processing === 'Заявка' ||
        item.processing === 'Сборка' ? (
          <Link href={routes.APPLICATION + '/' + item.id}>{item.id}</Link>
        ) : (
          <Link href={routes.SALE + '/' + item.id}>{item.id}</Link>
        )}
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
    </tr>
  )
}
