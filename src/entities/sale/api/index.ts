import {
  salesControllerAddTrackNumber,
  salesControllerCreateSale,
  salesControllerGetSale,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { routes } from '@/shared/constants/routing'
import { toast } from '@/shared/ui/components/ui/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const saleKey = 'sale'

export function useGetSale(id: string) {
  return useQuery({
    queryKey: [saleKey, id],
    queryFn: () => salesControllerGetSale(id),
    staleTime: 5 * 60 * 1000,
  })
}
export function useAddTrackNumber() {
  const router = useRouter()

  return useMutation({
    mutationFn: salesControllerAddTrackNumber,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [saleKey],
      })
      router.push(routes.RESULT + `?type=success&text=Трек номер успешно добавлен`)
    },
    onError: () => {
      router.push(routes.RESULT + `?type=error&text=Ошибка при добавлении трек номера`)
    },
  })
}

export function useCreateSaleMutation() {
  const router = useRouter()

  return useMutation({
    mutationFn: salesControllerCreateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
      queryClient.invalidateQueries({
        queryKey: ['applications-or-sales'],
      }),
        router.push(routes.RESULT + `?type=success&text=Продажа успешно создана`)
    },
    onError: () => {
      router.push(routes.RESULT + `?type=error&text=Ошибка при создании продажи`)
    },
  })
}
