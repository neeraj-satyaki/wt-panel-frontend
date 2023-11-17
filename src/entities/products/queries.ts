import { productsControllerGetProducts } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const productsKey = 'products'

export function useGetProducts(q: string, page: string, count: string) {
  return useQuery({
    queryKey: [`${productsKey}-${q.toLowerCase()}`],
    queryFn: () => productsControllerGetProducts({ q, page, count }),
    retry: 0,
    staleTime: 5 * 60 * 1000,
  })
}
