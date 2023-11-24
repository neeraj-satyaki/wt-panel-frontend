import { useGetProducts } from '@/entities/products'
import { useDebauncedValue } from '@/shared/lib/lib-react-std'
import { useState } from 'react'

export function useListProducts() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const count = 100

  const debouncedQ = useDebauncedValue(q, 800)

  const listProducts = useGetProducts(debouncedQ, count, page)

  function prevPage() {
    setPage(page - 1)
  }
  function nextPage() {
    setPage(page + 1)
  }

  return {
    isLoading: listProducts.isLoading,
    isError: listProducts.isError,
    data: listProducts.data,
    setQ,
    q,
    prevPage,
    nextPage,
    currentPage: page,
  }
}
