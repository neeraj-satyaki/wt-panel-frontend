import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHeader,
  TableRow,
} from '@/shared/ui/components/ui/table'
import { ReactNode } from 'react'

type Props = {
  title: string
  header: ReactNode
  content: ReactNode
  footer: ReactNode
}
export function TablePanel({ title, header, content, footer }: Props) {
  return (
    <Table>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>{header}</TableRow>
      </TableHeader>
      <TableBody>{content}</TableBody>
      <TableFooter>
        <TableRow>{footer}</TableRow>
      </TableFooter>
    </Table>
  )
}
