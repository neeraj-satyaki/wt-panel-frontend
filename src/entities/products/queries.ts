import {
  productsControllerGetProduct,
  productsControllerGetProducts,
  productsControllerGetSimilarProducts,
} from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const productsKey = 'products'
const productKey = 'product'
const similarProductsKey = 'similar-products'

export function useGetProducts(q: string, page: string, count: string) {
  return useQuery({
    queryKey: [`${productsKey}-${q.toLowerCase()}`],
    queryFn: () => productsControllerGetProducts({ q, page, count }),
    retry: 0,
    staleTime: 5 * 60 * 1000,
  })
}
export function useGetProduct(id: string) {
  return useQuery({
    queryKey: [`${productKey}-${id}`],
    queryFn: () => productsControllerGetProduct(id),
    retry: 0,
    staleTime: 5 * 60 * 1000,
  })
}
export function useGetSimilarProducts(q: string, page: string, count: string) {
  return useQuery({
    queryKey: [similarProductsKey, q, page],
    queryFn: () => productsControllerGetSimilarProducts({ q, page, count }),
    retry: 0,
    staleTime: 5 * 60 * 1000,
  })
}
