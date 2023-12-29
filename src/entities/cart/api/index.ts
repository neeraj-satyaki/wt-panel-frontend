import {
  cartControllerGetcart,
  productsControllerMoveProduct,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { toast } from '@/shared/ui/components/ui/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

const cartKey = 'cart'

export function useGetCart(id: string, page: number, count: number) {
  return useQuery({
    queryKey: [cartKey, id, page, count],
    queryFn: () =>
      cartControllerGetcart({ id, page: page.toString(), count: count.toString() }),
    staleTime: 5 * 60 * 1000,
  })
}

export function useAddProductToCart() {
  return useMutation({
    mutationFn: productsControllerMoveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cartKey],
      })
      toast({
        title: 'Товар успешно добавлен в корзину',
        variant: 'success',
      })
    },
    onError: () => {
      toast({
        title: 'Ошибка при добавлении',
        variant: 'destructive',
      })
    },
  })
}
