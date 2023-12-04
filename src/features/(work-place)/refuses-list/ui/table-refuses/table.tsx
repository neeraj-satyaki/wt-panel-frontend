import { Roboto_Flex } from 'next/font/google'
import { Tr } from './tr'
import { TableSkeletonLoader } from './table-skeleton-loader'
import { ApplicationSaleDto, SessionInfoDto } from '@/shared/api/generated'
import LibPagination from '@/shared/lib/lib-pagination'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '300',
})

type Props = {
  isLoading: boolean
  isError: boolean
  currentPage: number
  prevPage: Function
  nextPage: Function
  data: ApplicationSaleDto | undefined
  session: SessionInfoDto | undefined
}

export const TableRefuses = ({
  isLoading,
  isError,
  currentPage,
  prevPage,
  nextPage,
  data,
  session,
}: Props) => {
  interface HeadingInterface {
    title: string
  }
  const headings: HeadingInterface[] = [
    { title: '№ заявки/продажи' },
    { title: 'Клиент' },
    { title: 'Менеджер' },
  ]

  if (isLoading) return <TableSkeletonLoader />
  if (isError) return <div>Ошибка</div>
  if (!data) return <div>Ничего не найдено</div>

  const content = data.data.map((item, i) => <Tr item={item} key={i} session={session} />)

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
        <tbody>{content}</tbody>
      </table>
      <LibPagination
        currentPage={currentPage}
        totalPages={data.info.pages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  )
}
