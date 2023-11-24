import { salesControllerGetSale } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const saleKey = 'sale'

export function useGetSale(id: string) {
  return useQuery({
    queryKey: [saleKey, id],
    queryFn: () => salesControllerGetSale(id),
    staleTime: 5 * 60 * 1000,
  })
}
