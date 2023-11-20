import { useGetProducts } from '@/entities/products'
import { useDebauncedValue } from '@/shared/lib/react-std'
import { useState } from 'react'

export function useListProducts() {
  const [q, setQ] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const count = 30

  const debouncedQ = useDebauncedValue(q, 800)

  const listProducts = useGetProducts(debouncedQ, page.toString(), count.toString())

  function nextPage() {
    setPage(page + 1)
  }

  function prevPage() {
    setPage(page - 1)
  }

  return {
    data: listProducts?.data,
    isLoading: listProducts?.isLoading,
    isError: listProducts?.isError,
    nextPage,
    prevPage,
    currentPage: page,
    setQ,
    q,
  }
}
