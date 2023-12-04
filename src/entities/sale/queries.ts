import {
  salesControllerAddTrackNumber,
  salesControllerCreateSale,
  salesControllerGetSale,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { useMutation, useQuery } from '@tanstack/react-query'

const saleKey = 'sale'

export function useGetSale(id: string) {
  return useQuery({
    queryKey: [saleKey, id],
    queryFn: () => salesControllerGetSale(id),
    staleTime: 5 * 60 * 1000,
  })
}
export function useAddTrackNumber() {
  return useMutation({
    mutationFn: salesControllerAddTrackNumber,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [saleKey],
      })
    },
  })
}

export function useCreateSaleMutation() {
  return useMutation({
    mutationFn: salesControllerCreateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
      queryClient.invalidateQueries({
        queryKey: ['applications-or-sales'],
      })
    },
  })
}
