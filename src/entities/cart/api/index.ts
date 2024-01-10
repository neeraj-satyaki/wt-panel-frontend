import {
  cartControllerGetcart,
  productsControllerMoveProduct,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { routes } from '@/shared/constants/routing'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const cartKey = 'cart'

export function useGetCart(id: string, page: number, count: number) {
  return useQuery({
    queryKey: [cartKey, id, page, count],
    queryFn: () =>
      cartControllerGetcart({ id, page: page.toString(), count: count.toString() }),
    staleTime: 5 * 60 * 1000,
  })
}

export function useAddProductToCart(productId: string) {
  const router = useRouter()
  return useMutation({
    mutationFn: productsControllerMoveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cartKey],
      })
      router.push(
        routes.RESULT +
          `?type=success&text=Продукт ${productId} успешно добавлен в корзину`,
      )
    },
    onError: () => {
      router.push(
        routes.RESULT +
          `?type=error&text=Ошибка при добавлении продукта ${productId} в корзину`,
      )
    },
  })
}
