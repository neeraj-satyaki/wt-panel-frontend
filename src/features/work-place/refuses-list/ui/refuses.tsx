import { useSessionQuery } from '@/entities/session'
import { useGetRefusesA } from '../model/use-refuses'
import { TableRefuses } from './table-refuses/table'

export function RefusesList() {
  const { isLoading, isError, data, currentPage, prevPage, nextPage } = useGetRefusesA()
  const session = useSessionQuery()
  return (
    <div className="flex flex-col gap-6">
      <TableRefuses
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        data={data}
        session={session?.data}
      />
    </div>
  )
}
