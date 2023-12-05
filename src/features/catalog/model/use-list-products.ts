import { useGetProducts } from '@/entities/products'
import { useDebouncedValue } from '@/shared/lib/lib-react-std'
import { useListProductsState } from './store'

export function useListProducts() {
  const listProductsState = useListProductsState()
  const count = 70

  const debouncedQ = useDebouncedValue(listProductsState.q, 800)

  const listProducts = useGetProducts(debouncedQ, count, listProductsState.page)

  return {
    isLoading: listProducts.isLoading,
    isError: listProducts.isError,
    data: listProducts.data,
    setQ: listProductsState.setQ,
    q: listProductsState.q,
    prevPage: listProductsState.prevPage,
    nextPage: listProductsState.nextPage,
    currentPage: listProductsState.page,
  }
}
