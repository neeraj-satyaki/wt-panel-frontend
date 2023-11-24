import { useGetRefuses } from '@/entities/panel/queries'
import { useState } from 'react'

export function useGetRefusesA() {
  const [page, setPage] = useState<number>(1)
  const count = 20

  const refuses = useGetRefuses(page, count)

  function prevPage() {
    setPage(page - 1)
  }
  function nextPage() {
    setPage(page + 1)
  }

  return {
    isLoading: refuses.isLoading,
    isError: refuses.isError,
    data: refuses.data,
    setPage,
    currentPage: page,
    prevPage,
    nextPage,
  }
}
