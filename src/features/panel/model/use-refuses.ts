import { useGetCancels } from '@/entities/panel/queries'
import { useState } from 'react'

export function useGetRefuses() {
  const [page, setPage] = useState<number>(1)
  const count = 30

  const listApplicationsSales = useGetCancels(page.toString(), count.toString())

  function nextPage() {
    setPage(page + 1)
  }
  function prevPage() {
    setPage(page - 1)
  }

  return {
    data: listApplicationsSales.data,
    isLoading: listApplicationsSales.isLoading,
    isError: listApplicationsSales.isError,
    nextPage,
    prevPage,
    currentPage: page,
  }
}
