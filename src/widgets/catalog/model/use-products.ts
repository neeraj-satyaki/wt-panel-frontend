import { useGetProducts } from '@/entities/products'
import { useListProductsState } from './store'

export function useProducts() {
  const { q, count, page, currentCategory } = useListProductsState()
  const products = useGetProducts(q, count, page, currentCategory)

  return products
}
