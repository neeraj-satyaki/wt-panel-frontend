import { useGetProducts } from '@/entities/products'
import { useListProductsState } from './store'
import { useEffect, useState } from 'react'

export function useListProducts() {
  const [qWas, setQWas] = useState(false)
  const listProductsState = useListProductsState()
  const count = 105

  const listProducts = useGetProducts(
    listProductsState.q,
    count,
    listProductsState.page,
    listProductsState.currentCategory,
  )

  function handleSearch() {
    listProducts.refetch()
  }
  function changeQuery(text: string) {
    listProductsState.setQ(text)
    setQWas(true)
  }

  useEffect(() => {
    if (listProductsState.q.length === 0 && qWas) {
      handleSearch()
    }
  }, [listProductsState.q])
  return {
    isLoading: listProducts.isFetching,
    isError: listProducts.isError,
    data: listProducts.data,
    setQ: changeQuery,
    q: listProductsState.q,
    prevPage: listProductsState.prevPage,
    nextPage: listProductsState.nextPage,
    currentPage: listProductsState.page,
    handleSearch,
  }
}
