import { useGetSimilarProducts } from '@/entities/products/queries'
import { useState } from 'react'

export function useGetSimilarProductsA(id: string) {
  const [page, setPage] = useState<number>(1)
  const count = 14
  const similarProducts = useGetSimilarProducts(id, page, count)

  function prevPage() {
    setPage(page - 1)
  }
  function nextPage() {
    setPage(page + 1)
  }

  return {
    isLoading: similarProducts.isLoading,
    isError: similarProducts.isError,
    data: similarProducts.data,
    currentPage: page,
    prevPage,
    nextPage,
  }
}
