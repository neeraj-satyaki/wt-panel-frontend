import { Roboto_Flex } from 'next/font/google'
import { headings } from '../config'
import { Tr } from './tr'
import { ApplicationSaleDto } from '@/shared/api/generated'
import { Pagination } from './pagination'
import { TableSkeleton } from './table-skeleton'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '300',
})

type TableProps = {
  data: ApplicationSaleDto | undefined
  isLoading: boolean
  isError: boolean
  nextPage: Function
  prevPage: Function
  currentPage: number
  q: string
}

export const Table = (props: TableProps) => {
  if (props.isLoading) return <TableSkeleton />
  if (!props.data) return <div>Нет данных</div>
  if (props.isError) return <div>Произошла ошибка</div>

  return (
    <div className="w-full text-sm flex flex-col gap-4">
      <table className={`w-full ${roboto.className}`}>
        <thead>
          <tr className="bg-[#E1E1E1]">
            {headings.map((heading, i) => (
              <th className={`border border-[#A9AABC] py-2`} key={i}>
                {heading.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.data.map((item, i) => {
            return <Tr item={item} key={i} q={props.q} />
          })}
        </tbody>
      </table>
      {props.data.info.pages > 1 && (
        <Pagination
          currentPage={props.currentPage}
          data={props.data}
          nextPage={props.nextPage}
          prevPage={props.prevPage}
        />
      )}
    </div>
  )
}
