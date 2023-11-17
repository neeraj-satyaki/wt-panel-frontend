import { useGetApplicationsOrSales } from '@/entities/panel/queries'
import { useDebauncedValue } from '@/shared/lib/react-std'
import { useEffect, useState } from 'react'

export function useCurrentCategory() {
  const [q, setQ] = useState<string>('')
  const [currentCategory, setCurrentCateogory] = useState<string>('Все')
  const [type, setType] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const count = 10

  function changeCategory(category: string, type: string) {
    setCurrentCateogory(category)
    setType(type)
  }

  const debouncedQ = useDebauncedValue(q, 400) // использование debounce для значения q

  const listApplicationsSales = useGetApplicationsOrSales(
    currentCategory,
    type,
    page.toString(),
    count.toString(),
    debouncedQ,
  )

  function nextPage() {
    setPage(page + 1)
  }
  function prevPage() {
    setPage(page - 1)
  }

  useEffect(() => {
    setPage(1)
  }, [currentCategory])

  return {
    currentCategory,
    changeCategory,
    data: listApplicationsSales.data,
    isLoading: listApplicationsSales.isLoading,
    isError: listApplicationsSales.isError,
    nextPage,
    prevPage,
    currentPage: page,
    setQ,
    q,
  }
}
