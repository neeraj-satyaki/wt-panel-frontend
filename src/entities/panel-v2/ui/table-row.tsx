import { DataDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { TableCell, TableRow } from '@/shared/ui/components/ui/table'
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  item: DataDto
  feauture?: ReactNode
}

export function ItemRow({ item, feauture }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium text-center py-1 border-r">
        <Link
          href={
            item.processing.includes('Обращение') ||
            item.processing.includes('Заявка') ||
            item.processing.includes('Сборка')
              ? routes.APPLICATION + '/' + item.id
              : routes.SALE + '/' + item.id
          }
        >
          {item.id}
        </Link>
      </TableCell>
      <TableCell className="text-center py-1 border-r">{item.client}</TableCell>
      <TableCell className="text-center py-1 border-r">{item.responsible.name}</TableCell>
      <TableCell className="text-center py-1 border-r">{item.processing}</TableCell>
      <TableCell
        className={`text-center py-1 border-r ${
          item.sub_processing === 'Готов' ? 'bg-green-400' : ''
        }`}
      >
        {item.sub_processing}
      </TableCell>
      <TableCell className="text-center py-1 border-r">{item.porter.name}</TableCell>
      <TableCell className="text-center py-1">{feauture}</TableCell>
    </TableRow>
  )
}
