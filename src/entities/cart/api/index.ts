import { cartControllerGetcart } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const cartKey = 'cart'

export function useGetCart(id: string, page: number, count: number) {
  return useQuery({
    queryKey: [cartKey, id, page, count],
    queryFn: () =>
      cartControllerGetcart({ id, page: page.toString(), count: count.toString() }),
    staleTime: 5 * 60 * 1000,
  })
}
