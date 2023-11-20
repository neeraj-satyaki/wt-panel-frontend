import { useGetSimilarProducts } from '@/entities/products/queries'
import { useState } from 'react'

export function useGetSimilarProductsA(id: string) {
  const [page, setPage] = useState<number>(1)
  const count = 30
  const similarProducts = useGetSimilarProducts(id, page.toString(), count.toString())

  function next() {
    setPage(page + 1)
  }
  function prev() {
    setPage(page - 1)
  }

  return {
    isLoading: similarProducts.isLoading,
    isError: similarProducts.isError,
    data: similarProducts.data,
    next,
    page,
    prev,
  }
}
